# Generar-RFC
Esta librería toma los nombres, apellido paterno, apellido materno y fecha de nacimiento para obtener el RFC al instante.

### _INSTALACIÓN_
Para poder utilizar debemos crear una carpeta llamada "js" en donde se encuentre nuestro archivo html, después decargar el archivo RFC.js y guardarlo dentro de la carpeta creada previamente, dentro del archivo html tendremos que colocar la siguiente línea: "<script src="js/RFC.js"></script>", esto puede ser dentro de las etiquetas "head" o "body"

### _USO_
### En html
```
<input type="text" id="Nombre" placeholder="Escribe tu nombre">  
<input type="text" id="ApellidoM" placeholder="Escribe tu apellido materno">  
<input type="text" id="ApellidoP" placeholder="Escribe tu apellido paterno">  
<input type="date" id="Fecha">  
<button onclick="generarRFC(  
            document.getElementById('Nombre').value,  
            document.getElementById('ApellidoP').value,  
            document.getElementById('ApellidoM').value,  
            document.getElementById('Fecha').value  
        )">Calcular RFC</button>
```

### En javaScrip
```
function generarRFC(nombre,apellidoP,apellidoM,fechaNacimiento) {  
    const limpiar = (str) => str  
      .toUpperCase()  
      .normalize("NFD")  
      .replace(/[\u0300-\u036f]/g, "")  
      .replace(/[^A-ZÑ]/g, "");  
    nombre = limpiar(nombre);  
    apellidoP = limpiar(apellidoP);  
    apellidoM = limpiar(apellidoM);  
    const primeraLetra = apellidoP.charAt(0) || 'X';  
    const vocalInterna = (apellidoP.slice(1).match(/[AEIOU]/) || ['X'])[0];  
    const inicialM = apellidoM.charAt(0) || 'X';  
    const inicialNombre = primerNombre.charAt(0) || 'X';  
    const fecha = new Date(fechaNacimiento);  
    const yy = String(fecha.getFullYear()).slice(-2);  
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');  
    const dd = String(fecha.getDate()).padStart(2, '0');  
    const rfcBase = primeraLetra + vocalInterna + inicialM + inicialNombre + yy + mm + dd;  
    const rfc = rfcBase + "XXX";  
    document.getElementById("resultado").value = rfc;;}
```
 ### Librería en acción:  
![Captura](https://github.com/user-attachments/assets/125e3148-a3b8-40a6-b1c4-c959ea4b77f9)

### Recomendaciones

```
Asegurarse de validar que los campos no estén vacíos antes de generar el RFC.

Esta libreria usa "XXX" como homoclave de ejemplo. Puedes complementarlo con un algoritmo oficial si se requiere mayor exactitud. para eso se nececita contar con datos oficiales del SAT
```



