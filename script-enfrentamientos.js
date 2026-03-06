const equipos = ["🦈 98 Gang", "🔪 69 Hardkors Gang", "🍁 2BLEBETA", "🧊 Do Bronx", "🤬 Peta", "🌩️  La 1314"];
const ADMIN_PASSWORD = "alberto98";
let isAdmin = false;
let enfrentamientos = [];

function mostrarLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

function cerrarLogin() {
    document.getElementById('loginModal').style.display = 'none';
    mostrarEnfrentamientos();
}

function verificarPassword() {
    const password = document.getElementById('passwordInput').value;
    if (password === ADMIN_PASSWORD) {
        isAdmin = true;
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('adminBadge').style.display = 'block';
        document.getElementById('formSeccion').style.display = 'block';
        llenarSelects();
        mostrarEnfrentamientos();
    } else {
        alert('Contraseña incorrecta');
        document.getElementById('passwordInput').value = '';
    }
}

function generarEnfrentamientosChampions() {
    const enfrentamientosGenerados = [];
    for (let i = 0; i < equipos.length; i++) {
        for (let j = i + 1; j < equipos.length; j++) {
            enfrentamientosGenerados.push({equipo1: equipos[i], puntos1: 0, equipo2: equipos[j], puntos2: 0, fecha: null, estado: 'pendiente'});
            enfrentamientosGenerados.push({equipo1: equipos[j], puntos1: 0, equipo2: equipos[i], puntos2: 0, fecha: null, estado: 'pendiente'});
        }
    }
    return enfrentamientosGenerados;
}

async function cargarEnfrentamientos() {
    try {
        const response = await fetch('datos.json');
        const data = await response.json();
        enfrentamientos = data.enfrentamientos || [];
    } catch (error) {
        console.error('Error cargando enfrentamientos:', error);
        enfrentamientos = generarEnfrentamientosChampions();
    }
}

function guardarEnfrentamientos() {
    // No guardar en localStorage, editar manualmente en datos.json
}

function llenarSelects() {
    const select1 = document.getElementById('equipo1');
    const select2 = document.getElementById('equipo2');
    if (!select1 || !select2) return;
    select1.innerHTML = '<option value="">Selecciona Equipo 1</option>';
    select2.innerHTML = '<option value="">Selecciona Equipo 2</option>';
    equipos.forEach(equipo => {
        const opt1 = document.createElement('option');
        opt1.value = equipo;
        opt1.textContent = equipo;
        select1.appendChild(opt1);
        const opt2 = document.createElement('option');
        opt2.value = equipo;
        opt2.textContent = equipo;
        select2.appendChild(opt2);
    });
}

function mostrarEnfrentamientos() {
    const container = document.getElementById('partidosContainer');
    container.innerHTML = '';
    if (enfrentamientos.length === 0) {
        container.innerHTML = '<p class="sin-enfrentamientos">No hay enfrentamientos</p>';
        return;
    }
    enfrentamientos.forEach((partido, index) => {
        const esPendiente = partido.puntos1 === 0 && partido.puntos2 === 0;
        const ganador = partido.puntos1 > partido.puntos2 ? 1 : partido.puntos1 < partido.puntos2 ? 2 : 0;
        let clases = 'partido';
        if (esPendiente) clases += ' pendiente';
        if (ganador === 1) clases += ' equipo1-ganador';
        if (ganador === 2) clases += ' equipo2-ganador';
        const div = document.createElement('div');
        div.className = clases;
        let html = `<div class="partido-header"><span class="jornada">Jornada</span>${esPendiente ? '<span class="estado-badge">PENDIENTE</span>' : '<span class="estado-badge completado">FINALIZADO</span>'}</div>`;
        html += `<div class="partido-body"><div class="equipo-lado"><div class="escudo">${partido.equipo1.split(' ')[0]}</div><div class="equipo-info"><p class="nombre-equipo">${partido.equipo1}</p></div></div>`;
        html += `<div class="resultado"><div class="score"><span class="puntos">${partido.puntos1}</span><span class="vs">-</span><span class="puntos">${partido.puntos2}</span></div></div>`;
        html += `<div class="equipo-lado derecha"><div class="equipo-info"><p class="nombre-equipo">${partido.equipo2}</p></div><div class="escudo">${partido.equipo2.split(' ')[0]}</div></div></div>`;
        div.innerHTML = html;
        container.appendChild(div);
    });
}

function editarEnfrentamiento(index) {
    alert('Para editar resultados, modifica el archivo datos.json en el repositorio de GitHub y haz commit.');
}

function actualizarPuntosEnTabla() {
    // Puntos se calculan desde datos.json, editar manualmente
}

function eliminarEnfrentamiento(index) {
    alert('Para resetear partidos, modifica el archivo datos.json en el repositorio de GitHub.');
}

document.addEventListener('DOMContentLoaded', async () => {
    await cargarEnfrentamientos();
    mostrarEnfrentamientos();
});