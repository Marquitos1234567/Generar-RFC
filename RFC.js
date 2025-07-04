function normalizarRFC(rfc) {
    return rfc.trim().toUpperCase();
}

/**
 * Verifica si el RFC tiene el formato válido general
 */
function validarRFC(rfc) {
    rfc = normalizarRFC(rfc);
    const regex = /^([A-ZÑ&]{3,4})\d{6}([A-Z\d]{3})?$/;
    return regex.test(rfc);
}

/**
 * Determina si el RFC es de persona física (4 letras iniciales)
 */
function esPersonaFisica(rfc) {
    rfc = normalizarRFC(rfc);
    return /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/.test(rfc);
}

/**
 * Determina si el RFC es de persona moral (3 letras iniciales)
 */
function esPersonaMoral(rfc) {
    rfc = normalizarRFC(rfc);
    return /^[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}$/.test(rfc);
}

/**
 * Verifica si tiene homoclave (últimos 3 caracteres)
 */
function tieneHomoclave(rfc) {
    rfc = normalizarRFC(rfc);
    return rfc.length === 13 || rfc.length === 12;
}

/**
 * Extrae la fecha de nacimiento (si es persona física)
 * Devuelve en formato AAAA-MM-DD
 */
function extraerFechaNacimiento(rfc) {
    rfc = normalizarRFC(rfc);
    const base = rfc.length === 13 ? rfc.substring(4, 10) : rfc.substring(3, 9);
    const año = parseInt(base.substring(0, 2));
    const mes = base.substring(2, 4);
    const dia = base.substring(4, 6);
    const siglo = año >= 0 && año <= 24 ? '20' : '19';
    return `${siglo}${año.toString().padStart(2, '0')}-${mes}-${dia}`;
}

function generarRFC(nombre,apellidoP,apellidoM,fechaNacimiento) {
    // Normalizar entradas (quitar tildes, mayúsculas, etc.)
    const limpiar = (str) => str
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-ZÑ]/g, "");

    nombre = limpiar(nombre);
    apellidoP = limpiar(apellidoP);
    apellidoM = limpiar(apellidoM);

    // Eliminar "JOSE" y "MARIA" si son el primer nombre
    const nombresComunes = ['JOSE', 'MARIA'];
    const primerNombre = nombre.split(' ').find(n => !nombresComunes.includes(n)) || nombre;

    // 1. Primera letra + primera vocal interna del apellido paterno
    const primeraLetra = apellidoP.charAt(0) || 'X';
    const vocalInterna = (apellidoP.slice(1).match(/[AEIOU]/) || ['X'])[0];

    // 2. Primera letra del apellido materno
    const inicialM = apellidoM.charAt(0) || 'X';

    // 3. Primera letra del primer nombre
    const inicialNombre = primerNombre.charAt(0) || 'X';

    // 4. Fecha en formato YYMMDD
    const fecha = new Date(fechaNacimiento);
    const yy = String(fecha.getFullYear()).slice(-2);
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const dd = String(fecha.getDate()).padStart(2, '0');

    const rfcBase = primeraLetra + vocalInterna + inicialM + inicialNombre + yy + mm + dd;

    // 5. Simular homoclave (porque la oficial solo la asigna el SAT)
    const rfc = rfcBase + "XXX";
    document.getElementById("resultado").value = rfc;;
}

// Hacer la función disponible globalmente
window.generarRFC = generarRFC;
