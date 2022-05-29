//esta funcion sirve para cerrar o abrir el navbar
let menuToggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
menuToggle.onclick = function() {
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
}

//Esta funcion sirve para active cada vez que hagamos un select a un boton
let list = document.querySelectorAll('.list');
for (let i=0; i < list.length; i++) {
    list[i].onclick = function(){
        let j = 0;
        while(j < list.length) {
            list[j++].className = 'list';
        }
        list[i].className = 'list active';
    }
}