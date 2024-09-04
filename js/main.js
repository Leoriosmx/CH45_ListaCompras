let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal")
let precioTotal= document.getElementById("precioTotal")
// Es una bandera al ser true permite agregar los datos a la tabla
let isValid = true;
let contador = 0;
let precio = 0;
let costoTotal =0;
let totalEnProductos= 0;

let datos = new Array();

function validarCantidad() {
  if (txtNumber.value.length == 0) {
    return false;
  } //length==0
  if (isNaN(txtNumber.value)) {
    return false;
  } //isNaN--solo  numeros

  if (Number(txtNumber.value) <= 0) {
    return false;
  }

  return true;
} //validarCantidad() 

function getPrecio(){
  return Math.round((Math.random()*10000))/100;
} //getPrecio---crea un precio

btnAgregar.addEventListener("click", function (event) {
  event.preventDefault(); //dejar de hacer lo que hace por default

  txtNombre.style.border = "";
  txtNumber.style.border = "";
  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";
  isValid = true;
  // validar el nombre del producto
  if (txtNombre.value.length < 3) {
    txtNombre.style.border = "solid red medium";
    alertValidacionesTexto.innerHTML =
      "El <strong>Nombre</strong> no es correcto.</br>";
    alertValidaciones.style.display = "block";
    isValid = false;
    // return false;
  } //if length < 3

  // validar la cantidad
  if (!validarCantidad()) {
    txtNumber.style.border = "solid red medium";
    alertValidacionesTexto.innerHTML +=
      "El <strong>Cantidad</strong> no es correcta.</br>";
    alertValidaciones.style.display = "block";
    isValid = false;
  } //! validarCantidad
  //  termina btnAgregar.addEventListener

  if (isValid) {
    contador++;
    precio = getPrecio();
    let row = `<tr>
    <td>${contador}</td>
    <td>${txtNombre.value}</td>
    <td>${txtNumber.value}</td>
    <td>${precio}</td> 
    </tr> `;

  let elemento = {"contador":contador,
    "nombre": txtNombre.value,
    "cantidad": txtNumber.value,
    "precio": precio}; 

    datos.push(elemento);
    localStorage.setItem("datos", JSON.stringify(datos));

    cuerpoTabla.insertAdjacentHTML("beforeend", row);
    costoTotal += precio * Number(txtNumber.value);
    totalEnProductos += Number(txtNumber.value);
    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = "$" + costoTotal.toFixed(2);
    
    localStorage.setItem("contador", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal);



    txtNombre.value = "";
    txtNumber.value = "";
    txtNombre.focus();
  } //isValid
});// btnAgregar.addEventListener
btnClear.addEventListener("click", function(event){
  event.preventDefault();
  //Limpiar el valor de los campos
  txtNombre.value="";
  txtNumber.value="";
  //Limpiar localStoroge
  //localStorage.removeItem("contador")
  //localStorage.removeItem("costoTotal")
  //localStorage.removeItem("totalEnProductos")
  //Elimina todo el contenido del localStorege
  localStorage.clear();
  //Limpiar tabla
  cuerpoTabla.innerHTML="";
  //Reiniciar las variables,contador,costoTotal,totalEn Productos
  contador=0;
  costoTotal=0;
  totalEnProductos=0;
  //Asiganar las variables a los divs
  contadorProductos.innerText = contador;
  productosTotal.innerText=totalEnProductos; 
  precioTotal.innerText="$" + costoTotal.toFixed(2);
  //Ocultar alerta
  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";
  //Quitar bordes 
  txtNombre.style.border = "";
  txtNumber.style.border = "";
  //Manda el foco al campo nommbre
  txtNombre.focus();
});

txtNombre.addEventListener("blur", function (event) {
  //valida que  si tiene espacios se los quita y detecta el nuemro de letras e invalida sin son < 3
  // el elemento "blur" es cuando un campo pierde el foco, se sale del campo
  txtNombre.value = txtNombre.value.trim();
}); // termina  txtNombre.addEventListener

txtNumber.addEventListener("blur", function (event) {
  txtNumber.value = txtNumber.value.trim();
}); ///---------------------------

window.addEventListener("load", function(){
  if (this.localStorage.getItem("contador") != null){ //para saber si hay datos que cargar 
   contador = Number(localStorage.getItem("contador"));
   contador = Number(this.localStorage.getItem("contador"));
  } //!null
  if (this.localStorage.getItem("totalEnProductos") != null){
   totalEnProductos = Number(localStorage.getItem("totalEnProductos"));
   totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
  } //!null
  if (this.localStorage.getItem("costoTotal") != null){
   costoTotal = Number(localStorage.getItem("costoTotal"));
   costoTotal = Number(this.localStorage.getItem("costoTotal"));
  } //!null
  contadorProductos.innerText = contador;
  productosTotal.innerText=totalEnProductos; 
  precioTotal.innerText="$" + costoTotal.toFixed(2);
   
  if(this.localStorage.getItem("datos") != null){
    datos = JSON.parse(this.localStorage.getItem("datos"))
  } // != null
  datos.forEach (r => {
    let row =`<tr>
                <td>${r.contador}</td>
                <td>${r.nombre}</td>
                <td>${r.cantidad}</td>
                <td>${r.precio}</td>
              </tr>`; 
  cuerpoTabla.insertAdjacentHTML("beforeend", row);
  });

});//window load

