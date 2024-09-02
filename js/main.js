let btnAgregar = document.getElementById("btnAgregar");
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

function validarCantidad() {
  if (txtNumber.value.lenght == 0) {
    return false;
  }

  if (isNaN(txtNumber.value)) {
    return false;
  }

  if (Number(txtNumber.value) <= 0) {
    return false;
  }
  return true;
}

btnAgregar.addEventListener("click", function (event) {
  event.preventDefault();
  txtNombre.style.border = "";
  txtNumber.style.border = "";
  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";
  //VAlidar el nombre del producto
  if (txtNombre.value.lenght < 3) {
    txtNombre.style.border = "solid red medium";
    alertValidacionesTexto.innerHTML =
      "El <strong>Nombre</strong>no escorrecto.<br/>";
    alertValidaciones.style.display = "block";
    // return false;
  }
  //validar la cantidad
  if (!validarcantidad()) {
    txtNombre.style.border = "solid red medium";
    alertValidacionesTexto.innerHTML +=
      "La <strong>Cantidad</strong>no escorrecta.<br/>";
    alertValidaciones.style.display = "block";
  }
}); //btnAgregar.addEventListener

//evento blur es cuando pierde el foco, se sale del campo
txtNombre.addEventListener("blur", function (event) {
  txtNombre.value = txtNombre.value.trim();
}); // txt.Nombre.addeventListener
