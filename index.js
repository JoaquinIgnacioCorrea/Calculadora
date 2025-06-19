const botonesCalculadora = document.querySelectorAll(".boton_calculadora");
const operacionesCalculadora = document.querySelectorAll(
  ".operacion_calculadora"
);

const botonEnviar = document.getElementById("boton_enviar");
botonEnviar.addEventListener("click", mostrarResultado);

var operacionCalculadora = [];
var ultOperacionCalculadora = operacionCalculadora.length - 1;
var cuentaEnTexto = "";

// Operacion de evento click en botones de borrar y reiniciar

operacionesCalculadora.forEach(function (boton) {
  boton.addEventListener("click", function (evento) {
    const idElemento = this.id;
    realizarOperacion(idElemento);
    mostrarOperacion();
    console.log("array:" + operacionCalculadora);
  });
});

function realizarOperacion(valor) {
  if (valor == "reiniciar") {
    operacionCalculadora = [];
    console.log("reiniciado");
  } else {
    operacionCalculadora.pop();
    ultOperacionCalculadora = operacionCalculadora.length - 1;
    console.log("borrado");
  }
}

// Operacion de eventos en botones numericos y de operaciones (suma, resta, etc)

botonesCalculadora.forEach(function (boton) {
  boton.addEventListener("click", function (evento) {
    const idElemento = this.id;
    console.log(idElemento);
    ingresarArray(idElemento);
    mostrarOperacion();
    console.log("array:" + operacionCalculadora);
  });
});

function ingresarArray(valor, funcion) {
  if (operacionCalculadora.length > 0) {
    if (operacionCalculadora.length == 1) {
      actualizarLista(valor, true);
    } else {
      if (isANumber(operacionCalculadora[ultOperacionCalculadora])) {
        actualizarLista(valor, true);
      } else {
        if (isANumber(valor)) {
          actualizarLista(valor, true);
        } else {
          actualizarLista(valor, false);
        }
      }
    }
  } else {
    if (isANumber(valor)) {
      actualizarLista(valor);
    } else {
      null;
    }
  }
}

function actualizarLista(valor, condicional) {
  if (condicional) {
    operacionCalculadora.push(valor);
    ultOperacionCalculadora = operacionCalculadora.length - 1;
  } else {
    operacionCalculadora.splice(ultOperacionCalculadora, 1, valor);
  }
}

function isANumber(caracter) {
  const operaciones = ["+", "-", "x", "/"];
  if (operaciones.includes(caracter)) {
    return false;
  } else {
    return true;
  }
}

function mostrarOperacion() {
  let operacion = document.getElementById("contenedor_resultado");
  let opAMostrar = "";

  if (operacionCalculadora.length > 0) {
    if (operacionCalculadora.length == 1) {
      operacion.innerHTML = operacionCalculadora;
    } else {
      operacionCalculadora.forEach(function (valor) {
        if (isANumber(valor)) {
          cuentaEnTexto = "";
          opAMostrar += valor;
          operacion.innerHTML = opAMostrar;
          cuentaEnTexto = opAMostrar;
        } else {
          cuentaEnTexto = "";
          opAMostrar += " " + valor + " ";
          operacion.innerHTML = opAMostrar;
          cuentaEnTexto = opAMostrar;
        }
      });
    }
  } else {
    operacion.innerHTML = "";
  }
}

function mostrarResultado() {
  let operacion = document.getElementById("contenedor_resultado");
  let operacionCuenta = conversorNumerosOperacion(cuentaEnTexto.split(" "));
  let resultado;

  if (operacionCalculadora.length == 1) {
    operacion.innerHTML = operacionCalculadora;
    return;
  }

  if (operacionCuenta.length % 2 === 0) {
    operacionCuenta.pop();
  }

  resultado = operacionCuenta[0];

  for (let i = 1; i < operacionCuenta.length; i += 2) {
    const operador = operacionCuenta[i];
    const siguienteNumero = operacionCuenta[i + 1];

    switch (operador) {
      case "+":
        resultado += siguienteNumero;
        break;
      case "-":
        resultado -= siguienteNumero;
        break;
      case "x":
        resultado *= siguienteNumero;
        break;
      case "/":
        if (siguienteNumero === 0) {
          operacion.innerHTML = "Error: División por cero";
          return;
        }
        resultado /= siguienteNumero;
        break;
    }
  }
  console.log(resultado);
  operacion.innerHTML = resultado;
  operacionCalculadora = [];
}

function conversorNumerosOperacion(arrayParametro) {
  const nuevoArray = [];

  arrayParametro.forEach((item) => {
    if (isANumber(item)) {
      const parsedNumber = parseFloat(item);
      nuevoArray.push(parsedNumber);
    } else {
      nuevoArray.push(item);
    }
  });
  return nuevoArray;
}
