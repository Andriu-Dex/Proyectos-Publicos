document.getElementById('crear-mascota').addEventListener('click', () => {
    const nombre = document.getElementById('nombre-mascota').value;
    if (nombre) {
        document.getElementById('pantalla-bienvenida').classList.remove('activo');
        document.getElementById('pantalla-bienvenida').style.display = 'none';
        document.getElementById('pantalla-tamagotchi').classList.add('activo');
        document.getElementById('pantalla-tamagotchi').style.display = 'block';
        document.getElementById('nombre-mascota-display').innerText = nombre;
        cambiarEscenario('sala');
    } else {
        alert('Por favor, ingrese un nombre para su mascota.');
    }
});

let estadoAnimo = 'feliz';
let escenarioActual = 0;
const escenarios = [
    'Escenarios/sala.png',
    'Escenarios/comedor.png',
    'Escenarios/gym.png',
    'Escenarios/dormitorio.png'
];
const interacciones = {
    sala: 'Gato/feliz.png',
    cocina: 'Gato/comiendo.png',
    gym: 'Gato/ejercicio2.gif',
    cama: 'Gato/dormir.gif'
};

// Patrón de Estado (State)
class Estado {
    cambiarEstado(tamagotchi, animo) {
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
        tamagotchi.src = interacciones['cocina'];
    }
}

class Ejercicio extends Estado {
    cambiarEstado(tamagotchi) {
        tamagotchi.src = interacciones['gym'];
    }
}

class Dormido extends Estado {
    cambiarEstado(tamagotchi) {
        tamagotchi.src = interacciones['cama'];
    }
}

// Patrón de Estrategia (Strategy)
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

class InteraccionCocina extends Estrategia {
    interactuar(tamagotchi) {
        const estado = new Comiendo();
        estado.cambiarEstado(tamagotchi);
    }
}

class InteraccionGym extends Estrategia {
    interactuar(tamagotchi) {
        const estado = new Ejercicio();
        estado.cambiarEstado(tamagotchi);
    }
}

class InteraccionCama extends Estrategia {
    interactuar(tamagotchi) {
        const estado = new Dormido();
        estado.cambiarEstado(tamagotchi);
    }
}

const tamagotchi = document.getElementById('imagen-tamagotchi');
const estrategias = {
    sala: new InteraccionSala(),
    cocina: new InteraccionCocina(),
    gym: new InteraccionGym(),
    cama: new InteraccionCama()
};

function cambiarEscenario(direccion) {
    if (direccion === 'izquierda') {
        escenarioActual = (escenarioActual === 0) ? escenarios.length - 1 : escenarioActual - 1;
    } else if (direccion === 'derecha') {
        escenarioActual = (escenarioActual === escenarios.length - 1) ? 0 : escenarioActual + 1;
    }
    document.getElementById('imagen-escenario').src = escenarios[escenarioActual];
}

document.getElementById('izquierda').addEventListener('click', () => {
    cambiarEscenario('izquierda');
});

document.getElementById('derecha').addEventListener('click', () => {
    cambiarEscenario('derecha');
});

document.getElementById('interaccion').addEventListener('click', () => {
    const escenario = escenarios[escenarioActual].split('/').pop().split('.')[0];
    estrategias[escenario].interactuar(tamagotchi);
});

setInterval(() => {
    const frases = ["¡Sigue adelante!", "¡Eres capaz de lograr grandes cosas!"];
    const frase = frases[Math.floor(Math.random() * frases.length)];
    document.getElementById('mensaje').innerText = frase;
}, 300000); // 300000 ms = 5 minutos
