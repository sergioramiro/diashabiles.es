/**
 * Identificación del titular (art. 10 LSSI y responsable del tratamiento).
 * Sustituir estos cuatro marcadores, y solo estos, antes de publicar:
 * [TITULAR] [NIF] [DOMICILIO] [EMAIL DE CONTACTO]
 */
export const titular = {
  nombre: '[TITULAR]',
  nif: '[NIF]',
  domicilio: '[DOMICILIO]',
  email: '[EMAIL DE CONTACTO]',
} as const;

export const sitio = {
  nombre: 'diashabiles.es',
  url: 'https://diashabiles.es',
  analitica: 'https://analytics.diashabiles.es',
} as const;

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function emailDeContactoEsValido(): boolean {
  return EMAIL_VALIDO.test(titular.email);
}
