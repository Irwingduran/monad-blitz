// Datos del Sistema de Transporte Colectivo Metro de CDMX
// 12 lineas, 195 estaciones

export interface MetroLine {
  id: string
  name: string
  color: string
  terminals: [string, string]
  stations: string[]
}

export interface MetrobusLine {
  id: string
  name: string
  color: string
  terminals: [string, string]
  majorStops: string[]
}

export const metroLines: MetroLine[] = [
  {
    id: "1",
    name: "Linea 1",
    color: "#E90E8B",
    terminals: ["Observatorio", "Pantitlan"],
    stations: [
      "Observatorio", "Tacubaya", "Juanacatlan", "Chapultepec", "Sevilla",
      "Insurgentes", "Cuauhtemoc", "Balderas", "Salto del Agua", "Isabel la Catolica",
      "Pino Suarez", "Merced", "Candelaria", "San Lazaro", "Moctezuma",
      "Balbuena", "Boulevard Puerto Aereo", "Gomez Farias", "Zaragoza", "Pantitlan"
    ]
  },
  {
    id: "2",
    name: "Linea 2",
    color: "#0F5DA6",
    terminals: ["Cuatro Caminos", "Tasquena"],
    stations: [
      "Cuatro Caminos", "Panteones", "Tacuba", "Cuitlahuac", "Popotla",
      "Colegio Militar", "Normal", "San Cosme", "Revolucion", "Hidalgo",
      "Bellas Artes", "Allende", "Zocalo", "Pino Suarez", "San Antonio Abad",
      "Chabacano", "Viaducto", "Xola", "Villa de Cortes", "Nativitas",
      "Portales", "Ermita", "General Anaya", "Tasquena"
    ]
  },
  {
    id: "3",
    name: "Linea 3",
    color: "#AF9800",
    terminals: ["Indios Verdes", "Universidad"],
    stations: [
      "Indios Verdes", "Deportivo 18 de Marzo", "Potrero", "La Raza",
      "Tlatelolco", "Guerrero", "Hidalgo", "Juarez", "Balderas", "Ninos Heroes",
      "Hospital General", "Centro Medico", "Etiopia", "Eugenia", "Division del Norte",
      "Zapata", "Coyoacan", "Viveros", "Miguel Angel de Quevedo",
      "Copilco", "Universidad"
    ]
  },
  {
    id: "4",
    name: "Linea 4",
    color: "#6EC1E3",
    terminals: ["Martin Carrera", "Santa Anita"],
    stations: [
      "Martin Carrera", "Talisman", "Bondojito", "Consulado", "Canal del Norte",
      "Morelos", "Candelaria", "Fray Servando", "Jamaica", "Santa Anita"
    ]
  },
  {
    id: "5",
    name: "Linea 5",
    color: "#FFCD00",
    terminals: ["Politecnico", "Pantitlan"],
    stations: [
      "Politecnico", "Instituto del Petroleo", "Autobuses del Norte", "La Raza",
      "Misterios", "Valle Gomez", "Consulado", "Eduardo Molina", "Aragon",
      "Oceania", "Terminal Aerea", "Hangares", "Pantitlan"
    ]
  },
  {
    id: "6",
    name: "Linea 6",
    color: "#D82027",
    terminals: ["El Rosario", "Martin Carrera"],
    stations: [
      "El Rosario", "Tezozomoc", "Azcapotzalco", "Ferreria", "Norte 45",
      "Vallejo", "Instituto del Petroleo", "Lindavista", "Deportivo 18 de Marzo",
      "La Villa-Basilica", "Martin Carrera"
    ]
  },
  {
    id: "7",
    name: "Linea 7",
    color: "#F57F27",
    terminals: ["El Rosario", "Barranca del Muerto"],
    stations: [
      "El Rosario", "Aquiles Serdan", "Camarones", "Refineria", "Tacuba",
      "San Joaquin", "Polanco", "Auditorio", "Constituyentes", "Tacubaya",
      "San Pedro de los Pinos", "San Antonio", "Mixcoac", "Barranca del Muerto"
    ]
  },
  {
    id: "8",
    name: "Linea 8",
    color: "#078F4A",
    terminals: ["Garibaldi", "Constitucion de 1917"],
    stations: [
      "Garibaldi-Lagunilla", "Bellas Artes", "San Juan de Letran", "Salto del Agua",
      "Doctores", "Obrera", "Chabacano", "La Viga", "Santa Anita", "Coyuya",
      "Iztacalco", "Apatlaco", "Aculco", "Escuadron 201", "Atlalilco",
      "Iztapalapa", "Cerro de la Estrella", "UAM-I", "Constitucion de 1917"
    ]
  },
  {
    id: "9",
    name: "Linea 9",
    color: "#5C2A0A",
    terminals: ["Tacubaya", "Pantitlan"],
    stations: [
      "Tacubaya", "Patriotismo", "Chilpancingo", "Centro Medico", "Lazaro Cardenas",
      "Chabacano", "Jamaica", "Mixiuhca", "Velodromo", "Ciudad Deportiva",
      "Puebla", "Pantitlan"
    ]
  },
  {
    id: "A",
    name: "Linea A",
    color: "#8E24AA",
    terminals: ["Pantitlan", "La Paz"],
    stations: [
      "Pantitlan", "Agricola Oriental", "Canal de San Juan", "Tepalcates",
      "Guelatao", "Penon Viejo", "Acatitla", "Santa Marta", "Los Reyes", "La Paz"
    ]
  },
  {
    id: "B",
    name: "Linea B",
    color: "#9B9B32",
    terminals: ["Ciudad Azteca", "Buenavista"],
    stations: [
      "Buenavista", "Guerrero", "Garibaldi-Lagunilla", "Lagunilla", "Tepito",
      "Morelos", "San Lazaro", "Ricardo Flores Magon", "Romero Rubio",
      "Oceania", "Deportivo Oceania", "Bosque de Aragon", "Villa de Aragon",
      "Nezahualcoyotl", "Impulsora", "Rio de los Remedios", "Muzquiz",
      "Ecatepec", "Olimpica", "Plaza Aragon", "Ciudad Azteca"
    ]
  },
  {
    id: "12",
    name: "Linea 12",
    color: "#C4A000",
    terminals: ["Mixcoac", "Tlahuac"],
    stations: [
      "Mixcoac", "Insurgentes Sur", "Hospital 20 de Noviembre", "Zapata",
      "Parque de los Venados", "Eje Central", "Ermita", "Mexicaltzingo",
      "Atlalilco", "Culhuacan", "San Andres Tomatlan", "Lomas Estrella",
      "Calle 11", "Periferico Oriente", "Tezonco", "Olivos", "Nopalera",
      "Zapotitlan", "Tlaltenco", "Tlahuac"
    ]
  }
]

export const metrobusLines: MetrobusLine[] = [
  {
    id: "1",
    name: "Linea 1",
    color: "#C41230",
    terminals: ["El Caminero", "Indios Verdes"],
    majorStops: ["El Caminero", "Perisur", "Ciudad Universitaria", "Insurgentes", "Reforma", "Buenavista", "Indios Verdes"]
  },
  {
    id: "2",
    name: "Linea 2",
    color: "#9D1BA0",
    terminals: ["Tacubaya", "Tepalcates"],
    majorStops: ["Tacubaya", "Chapultepec", "Hidalgo", "Revolucion", "Bellas Artes", "Eje 4 Sur", "Tepalcates"]
  },
  {
    id: "3",
    name: "Linea 3",
    color: "#378B3A",
    terminals: ["Tenayuca", "Etiopía"],
    majorStops: ["Tenayuca", "Deportivo 18 de Marzo", "La Raza", "Tlatelolco", "Buenavista", "Etiopia"]
  },
  {
    id: "4",
    name: "Linea 4",
    color: "#E98300",
    terminals: ["San Lazaro", "Buenavista"],
    majorStops: ["San Lazaro", "Centro Historico", "Buenavista"]
  },
  {
    id: "5",
    name: "Linea 5",
    color: "#1F4BA5",
    terminals: ["San Lazaro", "Rio de los Remedios"],
    majorStops: ["San Lazaro", "Deportivo Oceania", "Hangares T1", "Terminal 2 AICM", "Rio de los Remedios"]
  },
  {
    id: "6",
    name: "Linea 6",
    color: "#D9262B",
    terminals: ["El Rosario", "Villa de Aragon"],
    majorStops: ["El Rosario", "Politecnico", "Martin Carrera", "Villa de Aragon"]
  },
  {
    id: "7",
    name: "Linea 7",
    color: "#6B3A8C",
    terminals: ["Campo Marte", "Indios Verdes"],
    majorStops: ["Campo Marte", "Auditorio", "Polanco", "Buenavista", "Indios Verdes"]
  }
]

// Estaciones de transbordo (conexion entre lineas)
export const transferStations: Record<string, string[]> = {
  "Pantitlan": ["1", "5", "9", "A"],
  "Tacubaya": ["1", "7", "9"],
  "Pino Suarez": ["1", "2"],
  "Balderas": ["1", "3"],
  "Hidalgo": ["2", "3"],
  "Bellas Artes": ["2", "8"],
  "Chabacano": ["2", "8", "9"],
  "La Raza": ["3", "5"],
  "Guerrero": ["3", "B"],
  "Centro Medico": ["3", "9"],
  "Candelaria": ["1", "4"],
  "Jamaica": ["4", "9"],
  "Santa Anita": ["4", "8"],
  "Consulado": ["4", "5"],
  "Deportivo 18 de Marzo": ["3", "6"],
  "Instituto del Petroleo": ["5", "6"],
  "Martin Carrera": ["4", "6"],
  "El Rosario": ["6", "7"],
  "Tacuba": ["2", "7"],
  "Garibaldi-Lagunilla": ["8", "B"],
  "Morelos": ["4", "B"],
  "San Lazaro": ["1", "B"],
  "Oceania": ["5", "B"],
  "Salto del Agua": ["1", "8"],
  "Mixcoac": ["7", "12"],
  "Zapata": ["3", "12"],
  "Ermita": ["2", "12"],
  "Atlalilco": ["8", "12"]
}

// Horarios del Metro
export const metroSchedule = {
  weekdays: { open: "05:00", close: "00:00" },
  saturday: { open: "06:00", close: "00:00" },
  sunday: { open: "07:00", close: "00:00" }
}

// Tarifas
export const fares = {
  metro: 5,
  metrobus: 6,
  trolleybus: 4,
  rtp: 2
}

// Funcion para encontrar ruta entre dos estaciones
export function findRoute(origin: string, destination: string): {
  lines: string[]
  transfers: string[]
  estimatedTime: number
} | null {
  // Buscar en que lineas esta cada estacion
  const originLines: string[] = []
  const destLines: string[] = []
  
  for (const line of metroLines) {
    if (line.stations.some(s => s.toLowerCase().includes(origin.toLowerCase()))) {
      originLines.push(line.id)
    }
    if (line.stations.some(s => s.toLowerCase().includes(destination.toLowerCase()))) {
      destLines.push(line.id)
    }
  }
  
  if (originLines.length === 0 || destLines.length === 0) {
    return null
  }
  
  // Verificar si hay linea directa
  const directLine = originLines.find(l => destLines.includes(l))
  if (directLine) {
    const line = metroLines.find(l => l.id === directLine)!
    const originIdx = line.stations.findIndex(s => 
      s.toLowerCase().includes(origin.toLowerCase())
    )
    const destIdx = line.stations.findIndex(s => 
      s.toLowerCase().includes(destination.toLowerCase())
    )
    const stops = Math.abs(destIdx - originIdx)
    
    return {
      lines: [directLine],
      transfers: [],
      estimatedTime: stops * 2 + 5 // 2 min por estacion + 5 min caminata
    }
  }
  
  // Buscar transbordo
  for (const [station, lines] of Object.entries(transferStations)) {
    const originLine = originLines.find(l => lines.includes(l))
    const destLine = destLines.find(l => lines.includes(l))
    
    if (originLine && destLine && originLine !== destLine) {
      return {
        lines: [originLine, destLine],
        transfers: [station],
        estimatedTime: 35 // Estimado con transbordo
      }
    }
  }
  
  return null
}

// Obtener estatus del servicio (mock)
export function getServiceStatus(): Array<{
  lineId: string
  status: "normal" | "delayed" | "suspended"
  message?: string
}> {
  // En produccion esto vendria de una API real
  return metroLines.map(line => ({
    lineId: line.id,
    status: "normal" as const
  }))
}
