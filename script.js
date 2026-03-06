// añadir equipos y puntos
let equipos = [];

// Cargar datos desde datos.json
async function cargarDatos() {
    try {
        const response = await fetch('datos.json');
        const data = await response.json();
        equipos = data.equipos.map(nombre => ({ nombre, puntos: data.puntosEquipos[nombre] || 0 }));
    } catch (error) {
        console.error('Error cargando datos:', error);
        // Fallback a datos por defecto
        equipos = [
            {nombre:"🦈 98 Gang", puntos:0},
            {nombre:"🔪 69 Hardkors Gang", puntos:0},
            {nombre:"🍁 2BLEBETA", puntos:0},
            {nombre:"🧊 Do Bronx", puntos:0},
            {nombre:"🤬 Peta", puntos:0},
            {nombre:"🌩️  La 1314", puntos:0}
        ];
    }
}

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


const jugadores = {
    "🦈 98 Gang": ["Zmnuel","Mascapitos","Enrico","Oliboil","Feixas"],
    "🔪 69 Hardkors Gang": ["PlayerA","PlayerB","PlayerC"],
    "🍁 2BLEBETA": ["JugadorB1","JugadorB2"],
    "🧊 Do Bronx": ["rayx.17","mario09_28",".l99999","dim.420","jaimeee__00","rogelio1103","icey"
,"nxthanzz"],
    "🤬 Peta": ["𝔍𝔬𝔱𝔞afps","Slaaa  ","! Pxul","Rubidoge","!يوليسيس","._Javi._00","Alpha Pear","Bambydubi "],
    "🌩️  La 1314": ["freevanilla","_hernandeezz_","obsessedwithyou___","ryze.isaac","marcoss2.7"]
};

const equiposHTML = document.querySelectorAll(".equipo");

let equipoAbierto = null;

equiposHTML.forEach(equipo => {

    equipo.addEventListener("click", ()=>{

        const nombre = equipo.textContent;

        const lista = document.getElementById("listaJugadores");
        const titulo = document.getElementById("tituloEquipo");
        const ventana = document.getElementById("ventanaJugadores");

        
        if(equipoAbierto === nombre){
            ventana.style.display = "none";
            equipoAbierto = null;
            return;
        }

        
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

mostrarTabla();

// Cargar datos al inicio
(async () => {
    await cargarDatos();
    mostrarTabla();
})();