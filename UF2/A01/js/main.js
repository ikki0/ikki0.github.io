/* Crea una constante que será la referencia al id llamado fullImgBox del html */
const fullImgBox = document.getElementById("fullImgBox"),
/* Crea una constante que será la referencia al id llamado fullImg del html */
fullImg = document.getElementById("fullImg");

/* Creamos una función que nos servirá para mostrar la imagen en grande y le pasamos como parámetro la dirección url de la imagen */
function openFullImg(reference){
    /* Cuando hacemos click mediante el atributo on click y estamos en esta función. El contenedor pasa de display none a display flex y se muestra cada imagen correspondiente gracias a que le pasamos la ulr de cada imagen */
    /* reference es la dirección url de cada imagen gracias a que en html le pasamos como argumento this.src */
    fullImg.src = reference;
}

/* Esta función se encarga de cerrar la imagen aumentada mediante display: none, de esta menra el div será oculto*/
function closeImg(){
    fullImgBox.style.display = "none";
}

