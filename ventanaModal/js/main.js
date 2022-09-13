"use strict";

const botonAbrir = document.querySelectorAll(".boton");
const modal = document.querySelector(".modal");
const blur = document.querySelector(".blur");
const botonCerrar = document.querySelector(".botonCerrar");

const esconderModulos = function () {
  modal.classList.add("oculto");
  blur.classList.add("oculto");
};

const abrirModulos = function () {
  modal.classList.remove("oculto");
  blur.classList.remove("oculto");
};

for (let i = 0; i < botonAbrir.length; i++) {
  botonAbrir[i].addEventListener("click", abrirModulos);
}

botonCerrar.addEventListener("click", esconderModulos);

blur.addEventListener("click", esconderModulos);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    esconderModulos();
  }
});
