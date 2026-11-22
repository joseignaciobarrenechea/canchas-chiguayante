// Reservas de canchas

var ventana = new bootstrap.Modal(document.getElementById('modalReserva'));
var formulario = document.getElementById('formulario');
var campoNombre = document.getElementById('nombre');
var mensaje = document.getElementById('mensaje');

// Aqui guardamos el boton que el usuario apretó
var botonElegido = null;

// Todos los botones de horas libres
var botones = document.querySelectorAll('.hora-libre');

for (var i = 0; i < botones.length; i++) {
  botones[i].addEventListener('click', function () {
    botonElegido = this;

    // Mostramos la cancha y la hora en la ventana
    document.getElementById('textoCancha').innerText = this.getAttribute('data-cancha');
    document.getElementById('textoHora').innerText = this.getAttribute('data-hora');

    // Dejamos el campo vacio
    campoNombre.value = '';
    formulario.classList.remove('was-validated');

    ventana.show();
  });
}

// Cuando se envía el formulario
formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  // Revisa required y el minlength
  if (!formulario.checkValidity()) {
    formulario.classList.add('was-validated');
    return;
  }

  var nombre = campoNombre.value.trim();

  if (nombre === '') {
    campoNombre.value = '';
    formulario.classList.add('was-validated');
    return;
  }

  var hora = botonElegido.getAttribute('data-hora');
  // Dejamos el boton como ocupado
  botonElegido.innerText = hora + ' (Ocupado por ' + nombre + ')';
  botonElegido.classList.remove('btn-outline-success');
  botonElegido.classList.remove('btn-outline-secondary');
  botonElegido.classList.add('btn-danger');
  botonElegido.disabled = true;

  ventana.hide();

  // mensajde de que todo salió bien
  mensaje.innerText = 'Hora reservada para ' + nombre + '.';
  mensaje.classList.remove('d-none');
});
