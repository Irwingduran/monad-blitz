import hre from "hardhat";

async function main() {
  const connection = await hre.network.connect();
  const [deployer] = await connection.provider.request({
    method: "eth_accounts",
  });

  console.log("Deploying with:", deployer);

  // La dirección del agente que tendrá permisos para registrar pagos.
  // En producción, esta es la wallet del backend del agente OndaMonad.
  const agenteAddress = process.env.AGENTE_ADDRESS || deployer;

  const { ethers } = await import("ethers");
  const Reputacion = await hre.ethers.getContractFactory("Reputacion");
  const contrato = await Reputacion.deploy(agenteAddress);
  await contrato.waitForDeployment();

  const address = await contrato.getAddress();
  console.log("Reputacion desplegado en:", address);
  console.log("Agente autorizado:", agenteAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
