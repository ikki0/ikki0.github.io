// Variables
const botonCerrar = document.querySelector(".cerrar");
const ventanaGrafica = document.querySelector(".grafica");
const inputBuscar = document.querySelector("#txtSearch");

let thNombre;
let contadorNombre = 0;
let contadorId = 0;
let contadorPeso = 0;
let arrayObjetos;

// Funciones

// Boton reiniciar mediante location.reload()
const reiniciar = function () {
  location.reload();
};

// Botón calcular media peso
const calcMitjana = function () {
  let arrayPeso = [];
  let sumarPeso = 0;

  for (let pokemon of dades) {
    arrayPeso.push(pokemon.weight);
  }

  // longitud del array para saber cuantos elementos hay
  const longitudPeso = arrayPeso.length;

  for (const valor of arrayPeso) {
    sumarPeso += valor;
  }
  const calcularMediaPeso = (sumarPeso / longitudPeso).toFixed(2);
  alert(`El peso medio de todos los pokemon es: ${calcularMediaPeso} kg`);
};

// Funcion para crear la tabla
const printList = function (arrayObjetos) {
  const tabla = document.createElement("table");

  const tablaBody = document.createElement("tbody");

  // Crear elementos de la tabla
  const tr = document.createElement("tr");

  const th = document.createElement("th");

  const td = document.createElement("td");

  // Crear fila de la tabla
  const trEncima = document.createElement("tr");

  // Crear las columnas de la tabla
  const thId = document.createElement("th");
  thNombre = document.createElement("th");
  const thImagen = document.createElement("th");
  const thPeso = document.createElement("th");

  // Añadir texto a las columnas
  thId.textContent = "ID";
  thNombre.textContent = "Nombre";
  thImagen.textContent = "Imagen";
  thPeso.textContent = "Peso (Kg)";

  // Añadir las columnas a la fila trEncima
  trEncima.appendChild(thId);
  trEncima.appendChild(thNombre);
  trEncima.appendChild(thImagen);
  trEncima.appendChild(thPeso);

  // Añadir la fila a la tabla
  tabla.appendChild(trEncima);

  // Crear celdas (td)
  arrayObjetos.forEach(function (pokemon) {
    let fila = document.createElement("tr");

    // Crear elementos td
    let celdaId = document.createElement("td");
    let celdaNombre = document.createElement("td");
    let celdaImagen = document.createElement("td");
    let celdaPeso = document.createElement("td");
    let imagen = document.createElement("img");

    // Agregamos la propiedad a la imagen
    imagen.src = pokemon.img;

    // Agregar a cada celda (td) como valor el contenido del objeto pokemon
    let celdaTextoId = document.createTextNode(pokemon.id);
    let celdaTextoNombre = document.createTextNode(pokemon.name);
    let celdaTextoPeso = document.createTextNode(pokemon.weight);

    // Añadir elementos a las celdas
    celdaId.appendChild(celdaTextoId);
    celdaNombre.appendChild(celdaTextoNombre);
    celdaImagen.appendChild(imagen);
    celdaPeso.appendChild(celdaTextoPeso);

    // Añadir las celdas a la fila
    fila.appendChild(celdaId);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaImagen);
    fila.appendChild(celdaPeso);

    // Fila añadido al final de la parte body de la tabla
    tablaBody.appendChild(fila);
  });

  // Crear una clase para tabla
  tabla.classList.add("tablaPokemon");

  // Añadir tablaBody a la tabla
  tabla.appendChild(tablaBody);

  // Añadir tabla a la pagina
  document.querySelector("#resultat").appendChild(tabla);

  tabla.classList.add("tabla");

  // añadir clase a tr encima
  trEncima.classList.add("trEncima");

  //Funciones ordenar tabla asc o desc

  // Ordenar por ID
  thId.addEventListener("click", function () {
    if (contadorId % 2 === 0) {
      arrayObjetos.sort(function (a, b) {
        return a.id < b.id;
      });
    } else {
      arrayObjetos.sort(function (a, b) {
        return a.id > b.id;
      });
    }
    contadorId++;
    modificaImprimir(arrayObjetos);
  });

  // Ordenar por nombre
  thNombre.addEventListener("click", function () {
    if (contadorNombre % 2 === 0) {
      arrayObjetos.sort(function (a, b) {
        return a.name > b.name;
      });
    } else {
      arrayObjetos.sort(function (a, b) {
        return a.name < b.name;
      });
    }
    contadorNombre++;
    modificaImprimir(arrayObjetos);
  });

  // Ordenar por peso
  thPeso.addEventListener("click", function () {
    if (contadorPeso % 2 === 0) {
      arrayObjetos.sort(function (a, b) {
        return a.weight > b.weight;
      });
    } else {
      arrayObjetos.sort(function (a, b) {
        return a.weight < b.weight;
      });
    }
    contadorPeso++;
    modificaImprimir(arrayObjetos);
  });
};

// Crear array multidimensional con id, nombre, imagen y peso de los pokemon
function arrayMultidimensional() {
  for (let pokemon of dades) {
    // eliminar letras kg de peso
    pesoArray = pokemon.weight.split(" ");
    pokemon.weight = Math.round(pesoArray[0]);

    // Cambiar url a imagen
    // imagen.src = dades[i].img;
    arrayPokemon2.push([pokemon.id, pokemon.name, pokemon.img, pokemon.weight]);
  }
}

function modificaImprimir(arraPokemon2) {
  document.querySelector("#resultat").innerHTML = "";
  printList(arraPokemon2);
}

// Crear array no repetidos mediante Set
function arrayTipos(dades) {
  const tiposPokemon = [];
  let tiposNoRepetido = [];

  for (let pokemon of dades) {
    // Hacer for de pokemon.type
    for (let tipo of pokemon.type) {
      // Añadir los tipos al array
      tiposPokemon.push(tipo);
    }
  }
  // El metodo set me permite crear un array sin repetir elementos
  tiposNoRepetido = new Set(tiposPokemon);

  tiposNoRepetido = [...tiposNoRepetido];

  return tiposNoRepetido;
}

function arrayContador(dades, tiposNoRepetido) {
  let contador = 0;
  let arrayContador = [];

  for (let tipo of tiposNoRepetido) {
    for (let pokemon of dades) {
      for (let tipoPokemon of pokemon.type) {
        if (tipo === tipoPokemon) {
          contador++;
        }
      }
    }
    arrayContador.push(contador);
    contador = 0;
  }

  nPokemon = arrayContador.length;
  return arrayContador;
}

function coloresAleatorios() {
  // Math.floor redondea  el numero al numero entero abajo
  // tengo que crear 15 arrays que vienen de nPokemon donde tengan 3 valores rgba.
  // Para ello tengo que crear un numero aleatorio entre 0 y 255 3 veces
  let arrayBackgroundColor = [];

  for (let i = 0; i < nPokemon; i++) {
    const primerValor = Math.floor(Math.random() * 256);
    const segundoValor = Math.floor(Math.random() * 256);
    const tercerValor = Math.floor(Math.random() * 256);
    const cuartoValor = Math.random().toFixed(1);

    // añadir los 4 valores dentro del array BackgroundColor
    arrayBackgroundColor.push(
      `rgba(${primerValor}, ${segundoValor}, ${tercerValor}, ${cuartoValor})`
    );
  }

  return arrayBackgroundColor;
}

function coloresBorderColor() {
  let arrayBorderColor = [];

  for (let i = 0; i < nPokemon; i++) {
    const primerValor = Math.floor(Math.random() * 256);
    const segundoValor = Math.floor(Math.random() * 256);
    const tercerValor = Math.floor(Math.random() * 256);

    arrayBorderColor.push(
      `rgba(${primerValor}, ${segundoValor}, ${tercerValor}`
    );
  }

  return arrayBorderColor;
}

function mostrarGrafico() {
  // Quitar clase hidden a la grafica para mostrarlo
  ventanaGrafica.classList.remove("hidden");
}

// funcion para buscarPokemon mediante aray filter
inputBuscar.addEventListener("input", buscarPokemon);

// Esta funcionm utilizara array filter para buscar el pokemon
function buscarPokemon() {
  // convertir el texto introducido a minsuculas
  const texto = inputBuscar.value.toLowerCase();

  // filtrar el array de objetos con el texto introducido
  const arrayFiltrado = arrayObjetos.filter(function (pokemon) {
    if (pokemon.name.toLowerCase().includes(texto)) {
      return pokemon;
    }
  });

  modificaImprimir(arrayFiltrado);
}

// Funciones para cerrar Ventana Modal

// Crear evento para el boton de cerrar
botonCerrar.addEventListener("click", function () {
  ventanaGrafica.classList.add("hidden");
});

// Crear evento para cerrar modal cuando se hace click fuera del evento
window.addEventListener("click", function (event) {
  if (event.target == ventanaGrafica) ventanaGrafica.classList.add("hidden");
});

// Crear evento para cerrar modal cuando se presiona tecla esc
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") ventanaGrafica.classList.add("hidden");
});

/// VARIABLES

// Este array me muestra el id, nombre, imagen y peso de cada pokemon
let arrayPokemon2 = [];

let dades;

// Esta variable indica cuantos pokemon existen mediante arrayPokemon.length
let nPokemon;

// Añadir gráfico

const seleccionGrafico = document.getElementById("myChart");

// Funcion imprimir grafica
function crearGrafica(
  arrayTipos,
  arrayContador,
  arrayColores,
  arrayBorderColor
) {
  const myChart = new Chart(seleccionGrafico, {
    type: "polarArea",
    data: {
      labels: arrayTipos,
      datasets: [
        {
          label: "Tipos de pokemon",
          data: arrayContador,
          backgroundColor: arrayColores,
          borderColor: arrayBorderColor,
        },
      ],
    },
  });
}
// Pregunta 4: convertir array multidimensional a array de objetos
function convertirArrayMultidimensional() {
  const arrayObjetos = arrayPokemon2.map(function (pokemon) {
    return {
      id: pokemon[0],
      name: pokemon[1],
      img: pokemon[2],
      weight: pokemon[3],
    };
  });

  return arrayObjetos;
}

fetch("./json/pokemon.json")
  .then(response => response.json())
  .then(data => {
    dades = data.pokemon;
    // recorrerPokemon(dades);
    arrayMultidimensional();
    arrayObjetos = convertirArrayMultidimensional();

    // printList(arrayPokemon2);
    printList(arrayObjetos);

    const tiposNoRepetido = arrayTipos(dades);
    const contadorTipos = arrayContador(dades, tiposNoRepetido);
    const arrayColores = coloresAleatorios();
    const arrayBorderColor = coloresBorderColor();
    crearGrafica(
      tiposNoRepetido,
      contadorTipos,
      arrayColores,
      arrayBorderColor
    );
    // Pregunta 4 convertir array multidimensional en araray Objectos
  });
