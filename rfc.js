function normalizarRFC(rfc) {
    return rfc.trim().toUpperCase();
}

function validarRFC(rfc) {
    rfc = normalizarRFC(rfc);
    const regex = /^([A-ZÑ&]{3,4})\d{6}([A-Z\d]{3})?$/;
    return regex.test(rfc);
}

function esPersonaFisica(rfc) {
    rfc = normalizarRFC(rfc);
    return /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/.test(rfc);
}

function esPersonaMoral(rfc) {
    rfc = normalizarRFC(rfc);
    return /^[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}$/.test(rfc);
}

function tieneHomoclave(rfc) {
    rfc = normalizarRFC(rfc);
    return rfc.length === 13 || rfc.length === 12;
}

function extraerFechaNacimiento(rfc) {
    rfc = normalizarRFC(rfc);
    const base = rfc.length === 13 ? rfc.substring(4, 10) : rfc.substring(3, 9);
    const año = parseInt(base.substring(0, 2));
    const mes = base.substring(2, 4);
    const dia = base.substring(4, 6);
    const siglo = año >= 0 && año <= 24 ? '20' : '19';
    return `${siglo}${año.toString().padStart(2, '0')}-${mes}-${dia}`;
}

function generarRFC(nombre, apellidoP, apellidoM, fechaNacimiento) {
    const limpiar = (str) => str
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-ZÑ]/g, "");

    nombre = limpiar(nombre);
    apellidoP = limpiar(apellidoP);
    apellidoM = limpiar(apellidoM);

    const nombresComunes = ['JOSE', 'MARIA'];
    const primerNombre = nombre.split(' ').find(n => !nombresComunes.includes(n)) || nombre;

    const primeraLetra = apellidoP.charAt(0) || 'X';
    const vocalInterna = (apellidoP.slice(1).match(/[AEIOU]/) || ['X'])[0];
    const inicialM = apellidoM.charAt(0) || 'X';
    const inicialNombre = primerNombre.charAt(0) || 'X';

    const fecha = new Date(fechaNacimiento);
    const yy = String(fecha.getFullYear()).slice(-2);
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const dd = String(fecha.getDate()).padStart(2, '0');

    const rfcBase = primeraLetra + vocalInterna + inicialM + inicialNombre + yy + mm + dd;

    return rfcBase + "XXX"; // Homoclave simulada
}
