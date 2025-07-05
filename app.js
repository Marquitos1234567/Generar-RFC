window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById("btnGenerar");

    btn.addEventListener("click", () => {
        const nombre = document.getElementById("nombre").value;
        const apellidoP = document.getElementById("apellidoP").value;
        const apellidoM = document.getElementById("apellidoM").value;
        const fecha = document.getElementById("fechaNacimiento").value;

        if (!nombre || !apellidoP || !apellidoM || !fecha) {
            alert("Por favor llena todos los campos");
            return;
        }

        const rfc = generarRFC(nombre, apellidoP, apellidoM, fecha);
        document.getElementById("resultado").value = rfc;
    });
});
