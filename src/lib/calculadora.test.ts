import { describe, expect, it } from 'vitest';
import { calcularDias, COMUNIDADES } from './calculadora';

/**
 * Referencia legal: art. 30.2 de la Ley 39/2015 (LPACAP).
 * Sábados, domingos y festivos quedan fuera del cómputo de días hábiles,
 * de ahí que en esta calculadora hábiles y laborables coincidan.
 */
describe('calcularDias', () => {
  it('cuenta una semana laboral completa sin festivos', () => {
    const r = calcularDias('2027-02-01', '2027-02-05'); // lunes a viernes, febrero sin festivos
    expect(r.totalDiasCalendario).toBe(5);
    expect(r.diasLaborables).toBe(5);
    expect(r.diasHabiles).toBe(5);
    expect(r.finesDeSemana).toBe(0);
    expect(r.festivosEnRango).toHaveLength(0);
  });

  it('incluye las dos fechas del rango', () => {
    expect(calcularDias('2027-02-01', '2027-02-01').diasLaborables).toBe(1);
  });

  it('excluye sábado y domingo del cómputo', () => {
    const r = calcularDias('2027-01-08', '2027-01-11'); // viernes a lunes
    expect(r.totalDiasCalendario).toBe(4);
    expect(r.diasLaborables).toBe(2);
    expect(r.finesDeSemana).toBe(2);
  });

  it('descuenta los festivos entre semana', () => {
    const r = calcularDias('2027-12-06', '2027-12-08'); // Constitución, martes, Inmaculada
    expect(r.totalDiasCalendario).toBe(3);
    expect(r.diasLaborables).toBe(1);
    expect(r.festivosEnRango.map((f) => f.fecha)).toEqual(['2027-12-06', '2027-12-08']);
  });

  it('registra el festivo que cae en sábado sin descontarlo dos veces', () => {
    const r = calcularDias('2027-05-01', '2027-05-01'); // Fiesta del Trabajo, sábado
    expect(r.finesDeSemana).toBe(1);
    expect(r.diasLaborables).toBe(0);
    expect(r.festivosEnRango).toHaveLength(1);
    expect(r.festivosEnRango[0].fecha).toBe('2027-05-01');
  });

  it('aplica los festivos autonómicos además de los nacionales', () => {
    const sinComunidad = calcularDias('2027-03-29', '2027-03-29'); // Lunes de Pascua
    const cataluna = calcularDias('2027-03-29', '2027-03-29', 'cataluna');
    expect(sinComunidad.diasLaborables).toBe(1);
    expect(cataluna.diasLaborables).toBe(0);
    expect(cataluna.festivosEnRango[0].nombre).toContain('Pascua');
  });

  it('ignora una comunidad desconocida en lugar de romperse', () => {
    const r = calcularDias('2027-02-01', '2027-02-05', 'comunidad-inexistente');
    expect(r.diasLaborables).toBe(5);
  });

  it('lanza error si la fecha de inicio es posterior a la de fin', () => {
    expect(() => calcularDias('2027-02-01', '2027-01-01')).toThrow(/anterior o igual/);
  });

  it('mantiene las invariantes en un año completo', () => {
    const r = calcularDias('2027-01-01', '2027-12-31');
    expect(r.totalDiasCalendario).toBe(365);
    // Hábiles y laborables son lo mismo por definición legal (art. 30.2 LPACAP)
    expect(r.diasHabiles).toBe(r.diasLaborables);
    // Ningún día se cuenta dos veces ni se pierde
    const festivosEntreSemana = r.festivosEnRango.filter((f) => {
      const d = new Date(`${f.fecha}T00:00:00`);
      return d.getDay() !== 0 && d.getDay() !== 6;
    }).length;
    expect(r.diasLaborables + r.finesDeSemana + festivosEntreSemana).toBe(365);
  });
});

describe('COMUNIDADES', () => {
  it('expone un catálogo con id y nombre para el selector', () => {
    expect(COMUNIDADES.length).toBeGreaterThan(15);
    for (const c of COMUNIDADES) {
      expect(c.id).toMatch(/^[a-z_]+$/);
      expect(c.nombre.length).toBeGreaterThan(2);
    }
  });
});
