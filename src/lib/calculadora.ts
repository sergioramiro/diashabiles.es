/**
 * Calculadora de días laborables / hábiles entre fechas
 * Incluye festivos nacionales + autonómicos
 */

import festivosData from '../data/festivos-2027.json';

export interface Festivo {
  fecha: string;
  nombre: string;
  nota?: string;
}

export interface ResultadoCalculo {
  fechaInicio: string;
  fechaFin: string;
  totalDiasCalendario: number;
  diasLaborables: number;
  diasHabiles: number;
  festivosEnRango: Festivo[];
  finesDeSemana: number;
}

/**
 * Convierte string YYYY-MM-DD a Date (sin offset de timezone)
 */
function parseFecha(str: string): Date {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/**
 * Normaliza una fecha a midnight local
 */
function normalizar(fecha: Date): Date {
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
}

/**
 * Obtiene todos los festivos para una comunidad (nacionales + autonómicos)
 */
function obtenerFestivos(comunidad?: string): Map<string, Festivo> {
  const mapa = new Map<string, Festivo>();

  for (const f of festivosData.nacionales) {
    mapa.set(f.fecha, f);
  }

  if (comunidad && festivosData.comunidades[comunidad]) {
    const comFestivos = festivosData.comunidades[comunidad].festivos;
    // Los festivos autonómicos pueden sobreescribir nacionales en la misma fecha
    for (const f of comFestivos) {
      mapa.set(f.fecha, f);
    }
  }

  return mapa;
}

/**
 * Calcula días laborables y hábiles entre dos fechas (ambas incluidas)
 *
 * - Laborable: lunes a viernes que no es festivo
 * - Hábil: laborable SÁBADO incluido (ámbito administrativo, Ley 39/2015)
 *   Días hábiles = laborables + sábados no festivos
 */
export function calcularDias(
  inicio: string,
  fin: string,
  comunidad?: string
): ResultadoCalculo {
  const fechaInicio = normalizar(parseFecha(inicio));
  const fechaFin = normalizar(parseFecha(fin));

  if (fechaInicio > fechaFin) {
    throw new Error('La fecha de inicio debe ser anterior o igual a la fecha fin');
  }

  const festivos = obtenerFestivos(comunidad);
  const festivosEnRango: Festivo[] = [];

  let diasLaborables = 0;
  let diasHabiles = 0;
  let finesDeSemana = 0;
  let totalDiasCalendario = 0;

  const cursor = new Date(fechaInicio);

  while (cursor <= fechaFin) {
    totalDiasCalendario++;
    const diaSemana = cursor.getDay(); // 0=dom, 6=sab
    const fechaStr = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`;
    const esFestivo = festivos.has(fechaStr);

    if (esFestivo) {
      const f = festivos.get(fechaStr)!;
      festivosEnRango.push(f);
    }

    if (diaSemana === 0 || diaSemana === 6) {
      finesDeSemana++;
      // Sábado no festivo = hábil en ámbito administrativo
      if (diaSemana === 6 && !esFestivo) {
        diasHabiles++;
      }
    } else {
      // Lunes a viernes
      if (!esFestivo) {
        diasLaborables++;
        diasHabiles++;
      }
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return {
    fechaInicio: inicio,
    fechaFin: fin,
    totalDiasCalendario,
    diasLaborables,
    diasHabiles,
    festivosEnRango,
    finesDeSemana,
  };
}

/**
 * Lista de comunidades disponibles
 */
export const COMUNIDADES = Object.entries(festivosData.comunidades).map(
  ([id, data]) => ({
    id,
    nombre: data.nombre,
  })
);

export const COMUNIDADES_PENDIENTES = festivosData._comunidades_pendientes || [];
