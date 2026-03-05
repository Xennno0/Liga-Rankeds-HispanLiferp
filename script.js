const equipos = [
    {nombre:"🦈 98 Gang", puntos:0},
    {nombre:"🔪 69 Hardkors Gang", puntos:0},
    {nombre:"x", puntos:0},
    {nombre:"x", puntos:0},
];

function mostrarTabla(){

    equipos.sort((a,b)=> b.puntos - a.puntos);

    const tabla = document.getElementById("ranking");

    tabla.innerHTML="";

    equipos.forEach((equipo,index)=>{

        tabla.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${equipo.nombre}</td>
            <td>${equipo.puntos}</td>
        </tr>
        `;

    });

}

mostrarTabla();

const jugadores = {
    "🦈 98 Gang": ["Zmnuel","Mascapitos","Enrico","Oliboil","Feixas"],
    "🔪 69 Hardkors Gang": ["PlayerA","PlayerB","PlayerC"],
    "x": ["JugadorX1","JugadorX2"]
};

const equiposHTML = document.querySelectorAll(".equipo");

let equipoAbierto = null;

equiposHTML.forEach(equipo => {

    equipo.addEventListener("click", ()=>{

        const nombre = equipo.textContent;

        const lista = document.getElementById("listaJugadores");
        const titulo = document.getElementById("tituloEquipo");
        const ventana = document.getElementById("ventanaJugadores");

        // SI YA ESTÁ ABIERTO -> CERRAR
        if(equipoAbierto === nombre){
            ventana.style.display = "none";
            equipoAbierto = null;
            return;
        }

        // MOSTRAR NUEVO
        titulo.textContent = nombre;
        lista.innerHTML = "";

        if(jugadores[nombre]){
            jugadores[nombre].forEach(j => {
                lista.innerHTML += `<li>${j}</li>`;
            });
        }

        ventana.style.display = "block";
        equipoAbierto = nombre;

    });

});