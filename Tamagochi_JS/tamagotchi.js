class Estado {
    cambiarEstado(tamagotchi) {
        throw "Este método debe ser sobrescrito";
    }
}

class Feliz extends Estado {
    cambiarEstado(tamagotchi) {
        tamagotchi.src = interacciones['sala'];
    }
}

class Comiendo extends Estado {
    cambiarEstado(tamagotchi) {
        tamagotchi.src = interacciones['comedor'];
    }
}

class Ejercicio extends Estado {
    cambiarEstado(tamagotchi) {
        tamagotchi.src = interacciones['gym'];
    }
}

class Durmiendo extends Estado {
    cambiarEstado(tamagotchi) {
        tamagotchi.src = interacciones['dormitorio'];
    }
}

class Bañando extends Estado {
    cambiarEstado(tamagotchi) {
        tamagotchi.src = interacciones['baño'];
    }
}

class Estudiando extends Estado {
    cambiarEstado(tamagotchi) {
        tamagotchi.src = interacciones['cuarto_estudio'];
    }
}

class Muerto extends Estado {
    cambiarEstado(tamagotchi) {
        tamagotchi.src = interacciones['tumba'];
    }
}

class Estrategia {
    interactuar(tamagotchi) {
        throw "Este método debe ser sobrescrito";
    }
}

class InteraccionSala extends Estrategia {
    interactuar(tamagotchi) {
        const estado = new Feliz();
        estado.cambiarEstado(tamagotchi);
    }
}

class InteraccionComedor extends Estrategia {
    interactuar(tamagotchi) {
        estados.hambre = Math.max(estados.hambre - 1, 0);
        const estado = new Comiendo();
        estado.cambiarEstado(tamagotchi);
    }
}

class InteraccionGym extends Estrategia {
    interactuar(tamagotchi) {
        estados.aburrimiento = Math.max(estados.aburrimiento - 1, 0);
        const estado = new Ejercicio();
        estado.cambiarEstado(tamagotchi);
    }
}

class InteraccionDormitorio extends Estrategia {
    interactuar(tamagotchi) {
        estados.cansancio = Math.max(estados.cansancio - 1, 0);
        const estado = new Durmiendo();
        estado.cambiarEstado(tamagotchi);
    }
}

class InteraccionBaño extends Estrategia {
    interactuar(tamagotchi) {
        estados.suciedad = Math.max(estados.suciedad - 1, 0);
        const estado = new Bañando();
        estado.cambiarEstado(tamagotchi);
    }
}

class InteraccionCuartoEstudio extends Estrategia {
    interactuar(tamagotchi) {
        const estado = new Estudiando();
        estado.cambiarEstado(tamagotchi);
    }
}

const tamagotchi = document.getElementById('imagen-tamagotchi');
const estadoAnimoDisplay = document.createElement('div');
estadoAnimoDisplay.id = 'estado-animo';
estadoAnimoDisplay.style.position = 'absolute';
estadoAnimoDisplay.style.top = '50px';
estadoAnimoDisplay.style.left = '50%';
estadoAnimoDisplay.style.transform = 'translateX(-50%)';
estadoAnimoDisplay.style.fontSize = '24px';
estadoAnimoDisplay.style.fontWeight = 'bold';
estadoAnimoDisplay.style.color = 'black';
estadoAnimoDisplay.style.zIndex = '3';
document.getElementById('contenedor-marco').appendChild(estadoAnimoDisplay);

const estrategias = {
    sala: new InteraccionSala(),
    comedor: new InteraccionComedor(),
    gym: new InteraccionGym(),
    dormitorio: new InteraccionDormitorio(),
    baño: new InteraccionBaño(),
    cuarto_estudio: new InteraccionCuartoEstudio()
};

let estadoAnimo = 'feliz';
let escenarioActual = 0;
let juegoTerminado = false;

const estados = {
    hambre: 0,
    aburrimiento: 0,
    cansancio: 0,
    suciedad: 0
};

const escenarios = [
    'Escenarios/sala.png',
    'Escenarios/comedor.png',
    'Escenarios/gym.png',
    'Escenarios/dormitorio.png',
    'Escenarios/baño.png',
    'Escenarios/cuarto_estudio.png',
    'Escenarios/tumba.png'
];

const interacciones = {
    sala: 'Gato/feliz.gif',
    comedor: 'Gato/comiendo.gif',
    gym: 'Gato/ejercicio2.gif',
    dormitorio: 'Gato/durmiendo.gif',
    baño: 'Gato/bañando.gif',
    cuarto_estudio: 'Gato/estudiando.gif',
    tumba: 'Gato/muerto.gif'
};

document.getElementById('crear-mascota').addEventListener('click', () => {
    const nombre = document.getElementById('nombre-mascota').value;
    if (nombre) {
        document.getElementById('pantalla-bienvenida').classList.remove('activo');
        document.getElementById('pantalla-bienvenida').style.display = 'none';
        document.getElementById('pantalla-tamagotchi').classList.add('activo');
        document.getElementById('pantalla-tamagotchi').style.display = 'block';
        document.getElementById('nombre-mascota-display').innerText = nombre;
        cambiarEscenario('sala');
        iniciarEstados();
    } else {
        alert('Por favor, ingrese un nombre para su mascota.');
    }
});

function cambiarEscenario(direccion) {
    if (juegoTerminado) return;

    if (direccion === 'izquierda') {
        escenarioActual = (escenarioActual === 0) ? escenarios.length - 2 : escenarioActual - 1;
    } else if (direccion === 'derecha') {
        escenarioActual = (escenarioActual === escenarios.length - 2) ? 0 : escenarioActual + 1;
    }
    document.getElementById('imagen-escenario').src = escenarios[escenarioActual];
    actualizarEstadoAnimo();
}

document.getElementById('izquierda').addEventListener('click', () => {
    cambiarEscenario('izquierda');
});

document.getElementById('derecha').addEventListener('click', () => {
    cambiarEscenario('derecha');
});

document.getElementById('interaccion').addEventListener('click', () => {
    if (juegoTerminado) return;

    const escenario = escenarios[escenarioActual].split('/').pop().split('.')[0];
    estrategias[escenario].interactuar(tamagotchi);
    actualizarEstadoAnimo();
});

function actualizarEstadoAnimo() {
    estadoAnimoDisplay.innerText = `Estado: Hambre ${estados.hambre}, Aburrimiento ${estados.aburrimiento}, Cansancio ${estados.cansancio}, Suciedad ${estados.suciedad}`;
}

function verificarMuerte() {
    for (const [key, value] of Object.entries(estados)) {
        if (value >= 10) {
            const estado = new Muerto();
            estado.cambiarEstado(tamagotchi);
            estadoAnimo = 'muerto';
            juegoTerminado = true;
            mostrarFinDelJuego();
            cambiarEscenario('tumba');
            actualizarEstadoAnimo();
            return;
        }
    }
}

function incrementarEstado(key, intervalo) {
    return setInterval(() => {
        if (!juegoTerminado) {
            estados[key]++;
            actualizarEstadoAnimo();
            verificarMuerte();
        }
    }, intervalo);
}

function iniciarEstados() {
    incrementarEstado('hambre', 10000);
    incrementarEstado('aburrimiento', 15000);
    incrementarEstado('cansancio', 20000);
    incrementarEstado('suciedad', 25000);
}

function mostrarFinDelJuego() {
    const mensajeFin = document.createElement('div');
    mensajeFin.id = 'mensaje-fin';
    mensajeFin.innerText = 'Fin del juego';
    mensajeFin.style.position = 'absolute';
    mensajeFin.style.top = '50%';
    mensajeFin.style.left = '50%';
    mensajeFin.style.transform = 'translate(-50%, -50%)';
    mensajeFin.style.fontSize = '48px';
    mensajeFin.style.fontWeight = 'bold';
    mensajeFin.style.color = 'red';
    mensajeFin.style.zIndex = '5';
    document.body.appendChild(mensajeFin);
}

setInterval(() => {
    if (!juegoTerminado) {
        const frases = ["¡Sigue adelante!", "¡Eres capaz de lograr grandes cosas!", "¡No te rindas!", "¡Vamos, tú puedes!"];
        const frase = frases[Math.floor(Math.random() * frases.length)];
        document.getElementById('mensaje').innerText = frase;
    }
}, 300000);
