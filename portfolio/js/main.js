// const typed = new Typed('.Typed', {
//     strings: ['Aprender Nuevas Cosas ', 'Trabajar en Equipo', 'Colobar ']
// });

const typed = new Typed('.typed', {
    strings: [
        '<i class="desarrollo">Desarollar Sitios Web</i>',
        // '<i class="desarrollo">Diseñar Sitios Web</i>',
        '<i class="desarrollo">Trabajar en Equipo</i>',
        '<i class="desarrollo">Aprender Nuevas Cosas</i>',
        
        // '<i class="desarrollo">Front End Developer</i>',
        // '<i class="desarrollo">Web Designer</i>'
    ],
    typeSpeed: 75, //velocidad de escritura de cada letra en ms
    startDelay: 300, //Tiempo de retraso en iniciar la animacion
    backSpeed: 75, //velocidad para borrar una letra en ms.
    backDelay:  1185, //Tiempo de espera tras terminar de escribir una palabra
    loop: true, //Repite la funcion indefinidamente
    //smartBackspace: true, elimina unicamenete aquellas palabras nuevas en el texto
    // showCursor: true , Sirve para mostrar el cursor
    //cursorChar: '|' , muestra dicho caracter como cursor
    //contentType: 'html' , html o null es el tipo de texto 
});
