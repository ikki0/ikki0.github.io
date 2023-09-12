"use strict";

// Variables
const btnIniciar = document.querySelector(".iniciarPartida");
const divErroresLetras = document.querySelector(".estadisticas");
const divAbecedario = document.querySelector(".abecedario");
const divResultadoFinal = document.querySelector(".resultadoFinal");
const divPalabraAdivinar = document.querySelector(".palabraAdivinar");
const title = document.querySelector(".title");
const pPalabraCorrecta = document.querySelector(".palabraCorrecta");
const soundWinner = new Audio("../audio/winner.mp3");
const soundLoser = new Audio("../audio/loser.mp3");
const infoWrite = document.querySelector('.infoWrite');


soundWinner.volume = 0.3;
soundLoser.volume = 0.3;
// Letras abecedario
const abecedario = "abcdefghijklmnñopqrstuvwxyz";
let palabra;
// Incia el juego
let juegoActivo = false;
// Verificar opción correcta
let verifica = false;
let opciones = 1;
let contadorPartidas = 0;
let contadorGanadas = 0;
let contadorPerdidas = 0;
let letraBoton;


// Variables de función boton 
let barraBaja;
let longitudPalabra;
let palabraAdivinar;

let letrasErroneas = [];
let contadorLetrasErroneas = 0;
const contadorMaximo = 6;
let arrayBarraBaja;
let barraJunta;
let posicion;
let contadorPosicion;

for (let i = 0; i < abecedario.length; i++) {
  let boton = document.createElement("button");
  boton.type = "button";
  boton.innerText = abecedario[i];

  // Añadir el botón dentro de la clase abecedario
  divAbecedario.appendChild(boton);
  boton.classList.add("boton");
}


function activarBotones() {
  // variables
  let letra;
  // Modo de juego con teclado
  document.addEventListener('keydown', (event) => {
    // El usuario no puede presionar una tecla fuera del abecedario
    if (!abecedario.includes(event.key)) {
      return;
    }

    letra = event.key;

    if (juegoActivo) {
      analizaJuego(letra);
    }
  });

  // Modo de juego con botones
  const arrayButtons = document.querySelectorAll(".boton");
  for (const button of arrayButtons) {
    button.addEventListener("click", function () {
      letra = button.textContent;
      if (juegoActivo) {
        analizaJuego(letra);
      }
    });
  }
}

function analizaJuego(letra) {
  // Si se presiona una letra y esta existen en la palabra a adivinar, entonces, se reemplaza '_' por la letra

  if (palabra.includes(letra)) {
    posicion = 0;
    contadorPosicion = 0;
    // Para reemplazar la letra por '_' tenemos que saber en que posiciones se encuentra la letra en la palabra mediante indexOf(letra, posicion)
    while (posicion != -1) {
      posicion = palabra.indexOf(letra, contadorPosicion);
      arrayBarraBaja[posicion] = letra;
      contadorPosicion++;
    }
    // En caso de que la letra no exista en la palabra, se añade la letra en el array letrasErroneas, se suma en 1 el contadorLetrasErroneas y se muestra la imagen correspondiente
  } else {
    if (!letrasErroneas.includes(letra)) {
      letrasErroneas.push(letra);
      contadorLetrasErroneas++;
      // añadir imagen de manera dinámica
      document.querySelector(".imagen").src = `./img/penjat_${contadorLetrasErroneas}.png`;
      // Retirar clase hidden de la imagen
      document.querySelector(".imagen").classList.remove("hidden");
    }
  }

  // Mostrar todas las letras o '_' adivinados hasta dentro del div del arrayBarraBaja
  barraJunta = arrayBarraBaja.join("  ");
  divPalabraAdivinar.innerHTML = barraJunta;

  // ? Cuando el Usuario Gana
  // Si el el array barraJunta no incluye ningún "_" significa que el usuario ha ganado
  if (!barraJunta.includes("_")) {
    // cambiar el color del body  a verde
    document.body.style.background = "#abf1ab ";
    // Crear un elemento h1 y agregarlo al divResultadoFinal
    const tituloGanador = document.createElement('h1');
    tituloGanador.classList.add('tituloFinal');
    tituloGanador.textContent = `🎉🎉🎉  Enhorabuena, Ganaste!  🎉🎉🎉`;
    divResultadoFinal.appendChild(tituloGanador);
    pPalabraCorrecta.textContent = `respuesta: ${palabra}`;
    pPalabraCorrecta.classList.remove('hidden');
    infoWrite.classList.add('hidden');
    // agregamos el contadorGanadas al localStorage
    window.localStorage.setItem('partidasGanadas', contadorGanadas);
    soundWinner.play();
    // juegoActivo a false para que no se pueda seguir jugando
    juegoActivo = false;
    contadorGanadas++;
    juegoTerminado();
  }

  // !Cuando el Usuario Pierde
  // Si el usuario ha llegado al contadorMáximo ha perdido
  if (contadorLetrasErroneas === contadorMaximo) {
    // Cambiar color body  a rojo
    document.body.style.background = "#9e1b32";
    // agregar mensaje perdedor
    const tituloPerdedor = document.createElement('h1');
    const texto = document.createTextNode('Lastima, Perdiste 🙁');
    tituloPerdedor.appendChild(texto);
    tituloPerdedor.classList.add('tituloFinal');
    divResultadoFinal.appendChild(tituloPerdedor);
    pPalabraCorrecta.textContent = `respuesta: ${palabra}`;
    pPalabraCorrecta.classList.remove('hidden');
    infoWrite.classList.add('hidden');
    // agregar contador perdidas al localStorage
    window.localStorage.setItem('partidasPerdidas', contadorPerdidas);
    soundLoser.play();

    juegoActivo = false;
    contadorPerdidas++;
    juegoTerminado();
  }

  // ? Mensaje de estadísticas del juego durante el juego
  let estadistica = `Letras Erróneas: ${contadorLetrasErroneas} /${contadorMaximo}: ${letrasErroneas.join(", ")}`
  // agregar estadistica al div errores letras
  divErroresLetras.innerHTML = estadistica;
}

function reiniciarVariables() {
  posicion = 0;
  contadorPosicion = 0
  contadorLetrasErroneas = 0;
  letrasErroneas = [];
  barraJunta = "";

}

function nuevaPartida() {
  juegoActivo = true;
  // Cada vez que hacemos click nueva Partida hay que reiniciar las variables a 0
  reiniciarVariables();

  // mostrar el titulo del juego
  title.classList.remove('hidden');

  infoWrite.classList.remove('hidden');

  // reiniciar nuevamente al color original
  document.body.style.background = "linear-gradient(to top left, #F46B45, #EEA849)";

  // ocultar p palabraCorrecta
  pPalabraCorrecta.classList.add('hidden');
  // Suma en 1 el contador de partidas
  contadorPartidas++;
  // almacenar contadorPartidas en localStorage
  window.localStorage.setItem('totalPartidas', contadorPartidas);
  // Eliminar el contenido del div errores letras
  divErroresLetras.textContent = "";
  // Poner vacio verificaGanador
  divResultadoFinal.textContent = "";
  // Poner vacío las barritas
  divPalabraAdivinar.textContent = "";
  // Ocultar nuevamente la imagen
  document.querySelector(".imagen").classList.add("hidden");
  // Retiramos la clase hidden de CSS
  divAbecedario.classList.remove("hidden");
  divPalabraAdivinar.classList.remove('hidden');

  // Aquí creamos una variable para la palabra que se tenga que adivinar
  palabra = prompt(`Escriba una palabra`, '');

  // Si la palabra es null porque le dio a cancelar, fin del juego
  if (palabra === null) {
    juegoActivo = false;
    estadoInicial()
    return;
  }
  // Si no se escribio ninguna palabra, tiene número o tiene espacios en blanco se vuelve a pedir la palabra
  while (palabra.length === 0 || !isNaN(palabra) || palabra.includes(" ")) {
    palabra = prompt(`Escriba una palabra`, '').toLowerCase();
  }

  longitudPalabra = palabra.length;
  barraBaja = "_ ";
  barraBaja = barraBaja.repeat(longitudPalabra).trim();
  arrayBarraBaja = barraBaja.split(" ");
  divPalabraAdivinar.innerHTML = barraBaja;

  activarBotones();
}

function estadoInicial() {
  title.classList.remove('hidden');
  divAbecedario.classList.add('hidden');
  divPalabraAdivinar.classList.add('hidden');
  divResultadoFinal.classList.add('hidden');
  infoWrite.classList.add('hidden');
}

// Está función es del botón estadísticas y muestra el total de partidas , partidas ganadas y perdidas mediante el local storage
function estadisticas() {
  let totalPartidas = window.localStorage.getItem("totalPartidas");
  // Si totalPartidas es null -> 0
  if (totalPartidas === null) { totalPartidas = 0 }

  let totalGanadas = Math.round(
    window.localStorage.getItem("partidasGanadas") * (100 / window.localStorage.getItem("totalPartidas"))
  );
  /// Si totalGanadas es Nan -> 0
  if (isNaN(totalGanadas)) { totalGanadas = 0 }
  let totalPerdidas = Math.round(
    window.localStorage.getItem("partidasPerdidas") * (100 / window.localStorage.getItem("totalPartidas"))
  );
  // Si totalPerdidas es Nan -> 0
  if (isNaN(totalPerdidas)) { totalPerdidas = 0 }

  alert(`---ESTADÍSTICAS DE LA PARTIDA---
    Total Partidas Jugadas: ${totalPartidas},
    Total Partidas Ganadas: ${totalGanadas} %,
    Total Partidas Perdidas: ${totalPerdidas} %
  `);
}

// cuando el juego termina, se tiene que que ocultar el div abecedario
function juegoTerminado() {
  divPalabraAdivinar.classList.add('hidden');
  divAbecedario.classList.add("hidden");
  divAbecedario.classList.add('hidden');
  title.classList.add('hidden');
  divResultadoFinal.classList.remove('hidden');
  title.classList.add('hidden');
}

// Reiniciar local storage del boton reiniciarLocalStorage
document.querySelector(".reiniciarLocalStorage").addEventListener("click", function () {
  window.localStorage.clear();
  // Importante los contadores relacionados con el localStorage deben volver a 0
  contadorGanadas = 0;
  contadorPerdidas = 0;
  contadorPartidas = 0;
});
