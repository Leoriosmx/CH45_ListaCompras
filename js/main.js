let btnAgregar = document.getElementById("btnAgregar");
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
});

txtNombre.addEventListener("blur", function (event) {
  //valida que  si tiene espacios se los quita y detecta el nuemro de letras e invalida sin son < 3
  // el elemento "blur" es cuando un campo pierde el foco, se sale del campo
  txtNombre.value = txtNombre.value.trim();
}); // termina  txtNombre.addEventListener

txtNumber.addEventListener("blur", function (event) {
  txtNumber.value = txtNumber.value.trim();
}); ///---------------------------

window.addEventListener("load", fuction(){
  if (this.localStorage.getItem("contador") !=null){
    contador = Number(this. localStorage.getItem("contador"))
  }// null
  if (this.localStorage.getItem("totalEnProductos") !=null) {
totalEnProductos= Number(this.localStorage.getItem)("totalEnProductos")
  } (this.localStorage.getItem("costoTotal") !=null){
    costoTotal=Number(this.localStorage.getItem("costoTotal"))
  }//null

  contadorProductos.innerText = contador;
  productosTotal.innerText = totalEnProductos;
  precioTotal.innerText = "$" + costoTotal.toFixed(2);
})
