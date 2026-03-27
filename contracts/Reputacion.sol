// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title Reputacion
 * @notice Registro de trazabilidad y reputación on-chain para locatarios.
 *         Cada pago ejecutado por el agente queda registrado como un hecho
 *         verificable e inmutable. El score se calcula off-chain a partir
 *         de estos datos públicos.
 *
 *         Monad EVM-compatible — desplegable directamente.
 */
contract Reputacion {

    // ──────────────────────────────────────────────
    //  Tipos
    // ──────────────────────────────────────────────

    enum Categoria {
        Comida,       // 0
        Transporte,   // 1
        Evento,       // 2
        Hospedaje,    // 3
        Experiencia   // 4
    }

    struct PerfilLocatario {
        bool     activo;
        uint256  totalTransacciones;
        uint256  volumenTotal;        // en unidades MXNB (6 decimales)
        uint256  primeraTx;           // timestamp del primer pago
        uint256  ultimaTx;            // timestamp del último pago
        uint256  disputasAbiertas;
        uint256  disputasResueltas;
    }

    struct Transaccion {
        address  locatario;
        uint256  monto;               // MXNB (6 decimales)
        uint256  timestamp;
        Categoria categoria;
    }

    // ──────────────────────────────────────────────
    //  Estado
    // ──────────────────────────────────────────────

    address public owner;
    address public agente;             // dirección autorizada para registrar pagos

    mapping(address => PerfilLocatario) public perfiles;
    Transaccion[] public transacciones;

    // Índice: locatario → IDs de sus transacciones
    mapping(address => uint256[]) public txsPorLocatario;

    // ──────────────────────────────────────────────
    //  Eventos
    // ──────────────────────────────────────────────

    event LocatarioRegistrado(address indexed locatario, uint256 timestamp);
    event PagoRegistrado(
        uint256 indexed txId,
        address indexed locatario,
        uint256 monto,
        Categoria categoria,
        uint256 timestamp
    );
    event DisputaAbierta(address indexed locatario, uint256 timestamp);
    event DisputaResuelta(address indexed locatario, uint256 timestamp);
    event AgenteActualizado(address indexed anterior, address indexed nuevo);

    // ──────────────────────────────────────────────
    //  Modificadores
    // ──────────────────────────────────────────────

    modifier soloOwner() {
        require(msg.sender == owner, "Solo owner");
        _;
    }

    modifier soloAgente() {
        require(msg.sender == agente, "Solo agente autorizado");
        _;
    }

    modifier locatarioExiste(address _locatario) {
        require(perfiles[_locatario].activo, "Locatario no registrado");
        _;
    }

    // ──────────────────────────────────────────────
    //  Constructor
    // ──────────────────────────────────────────────

    constructor(address _agente) {
        require(_agente != address(0), "Agente no puede ser address(0)");
        owner = msg.sender;
        agente = _agente;
    }

    // ──────────────────────────────────────────────
    //  Administración
    // ──────────────────────────────────────────────

    function actualizarAgente(address _nuevoAgente) external soloOwner {
        require(_nuevoAgente != address(0), "Agente no puede ser address(0)");
        emit AgenteActualizado(agente, _nuevoAgente);
        agente = _nuevoAgente;
    }

    // ──────────────────────────────────────────────
    //  Registro de locatarios
    // ──────────────────────────────────────────────

    function registrarLocatario(address _locatario) external soloAgente {
        require(_locatario != address(0), "Direccion invalida");
        require(!perfiles[_locatario].activo, "Ya esta registrado");

        perfiles[_locatario].activo = true;
        emit LocatarioRegistrado(_locatario, block.timestamp);
    }

    // ──────────────────────────────────────────────
    //  Registro de pagos (core del sistema)
    // ──────────────────────────────────────────────

    /**
     * @notice Registra un pago completado al locatario.
     *         Se llama automáticamente cuando el agente ejecuta
     *         un swap USDC→MXNB y liquida al negocio.
     *
     * @param _locatario  Dirección del negocio receptor
     * @param _monto      Monto en MXNB (6 decimales)
     * @param _categoria  Tipo de servicio (Comida, Transporte, etc.)
     */
    function registrarPago(
        address _locatario,
        uint256 _monto,
        Categoria _categoria
    )
        external
        soloAgente
        locatarioExiste(_locatario)
    {
        require(_monto > 0, "Monto debe ser > 0");

        PerfilLocatario storage perfil = perfiles[_locatario];

        // Primera transacción → marcar antigüedad
        if (perfil.totalTransacciones == 0) {
            perfil.primeraTx = block.timestamp;
        }

        perfil.totalTransacciones += 1;
        perfil.volumenTotal += _monto;
        perfil.ultimaTx = block.timestamp;

        // Guardar transacción completa
        uint256 txId = transacciones.length;
        transacciones.push(Transaccion({
            locatario: _locatario,
            monto: _monto,
            timestamp: block.timestamp,
            categoria: _categoria
        }));

        txsPorLocatario[_locatario].push(txId);

        emit PagoRegistrado(txId, _locatario, _monto, _categoria, block.timestamp);
    }

    // ──────────────────────────────────────────────
    //  Disputas
    // ──────────────────────────────────────────────

    function abrirDisputa(address _locatario)
        external
        soloAgente
        locatarioExiste(_locatario)
    {
        perfiles[_locatario].disputasAbiertas += 1;
        emit DisputaAbierta(_locatario, block.timestamp);
    }

    function resolverDisputa(address _locatario)
        external
        soloAgente
        locatarioExiste(_locatario)
    {
        require(perfiles[_locatario].disputasAbiertas > 0, "Sin disputas abiertas");
        perfiles[_locatario].disputasAbiertas -= 1;
        perfiles[_locatario].disputasResueltas += 1;
        emit DisputaResuelta(_locatario, block.timestamp);
    }

    // ──────────────────────────────────────────────
    //  Consultas públicas (cualquiera puede auditar)
    // ──────────────────────────────────────────────

    function obtenerPerfil(address _locatario)
        external
        view
        returns (PerfilLocatario memory)
    {
        return perfiles[_locatario];
    }

    function totalTransaccionesGlobal() external view returns (uint256) {
        return transacciones.length;
    }

    function obtenerTxsLocatario(address _locatario)
        external
        view
        returns (uint256[] memory)
    {
        return txsPorLocatario[_locatario];
    }

    function obtenerTransaccion(uint256 _txId)
        external
        view
        returns (Transaccion memory)
    {
        require(_txId < transacciones.length, "Tx no existe");
        return transacciones[_txId];
    }
}
