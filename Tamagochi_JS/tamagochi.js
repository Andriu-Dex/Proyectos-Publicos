// tamagotchi.js

class Tamagotchi {
    constructor() {
        this.animo = 'Feliz';
        this.energia = 100;
        this.hambre = 0;
        this.estados = {
            feliz: new EstadoFeliz(this),
            cansado: new EstadoCansado(this),
            hambriento: new EstadoHambriento(this),
        };
        this.estadoActual = this.estados.feliz;
        this.frases = [
            "Mantén una actitud positiva y feliz.",
            "Trabaja duro y no pierdas la esperanza.",
            "Sé receptivo a las críticas y sigue aprendiendo.",
            "Rodéate de personas felices, cálidas y genuinas."
        ];
        this.iniciar();
    }

    iniciar() {
        this.actualizarEstado();
        this.configurarEventos();
        this.iniciarInspiracion();
    }

    actualizarEstado() {
        document.getElementById('animo').innerText = `Ánimo: ${this.animo}`;
        document.getElementById('energia').innerText = `Energía: ${this.energia}`;
        document.getElementById('hambre').innerText = `Hambre: ${this.hambre}`;
        this.actualizarImagen();  // Llamar a la función para actualizar la imagen
    }

    configurarEventos() {
        document.getElementById('alimentar').addEventListener('click', () => this.alimentar());
        document.getElementById('jugar').addEventListener('click', () => this.jugar());
        document.getElementById('descansar').addEventListener('click', () => this.descansar());
    }

    iniciarInspiracion() {
        setInterval(() => {
            const fraseAleatoria = this.frases[Math.floor(Math.random() * this.frases.length)];
            document.getElementById('frase').innerText = fraseAleatoria;
        }, 10000); // Cambiar frase cada 10 segundos
    }

    alimentar() {
        this.estadoActual.alimentar();
        this.actualizarEstado();
    }

    jugar() {
        this.estadoActual.jugar();
        this.actualizarEstado();
    }

    descansar() {
        this.estadoActual.descansar();
        this.actualizarEstado();
    }

    cambiarEstado(nuevoEstado) {
        this.estadoActual = nuevoEstado;
    }

    actualizarImagen() {
        // Cambiar la fuente de la imagen según el estado de ánimo
        const imagen = document.getElementById('imagen-estado');
        if (this.animo === 'Feliz') {
            imagen.src = 'Gato/feliz.png';  // Ruta del gif para el estado feliz
        } else if (this.animo === 'Cansado') {
            imagen.src = 'gifs/tired.gif';  // Ruta del gif para el estado cansado
        } else if (this.animo === 'Hambriento') {
            imagen.src = 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXJhamVxMTYwczU2ZTQ4aW81cnpidWxqMGs5YWo0anRrZ2g5OGJtaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/EExJM3NifsBwjJukuF/giphy.webp';  // Ruta del gif para el estado hambriento
        }
    }
}

class EstadoTamagotchi {
    constructor(tamagotchi) {
        this.tamagotchi = tamagotchi;
    }

    alimentar() {}
    jugar() {}
    descansar() {}
}

class EstadoFeliz extends EstadoTamagotchi {
    alimentar() {
        this.tamagotchi.hambre -= 10;
        this.tamagotchi.energia += 10;
        if (this.tamagotchi.hambre <= 0) {
            this.tamagotchi.hambre = 0;
            this.tamagotchi.cambiarEstado(this.tamagotchi.estados.cansado);
            this.tamagotchi.animo = 'Cansado';
        }
    }

    jugar() {
        this.tamagotchi.energia -= 20;
        if (this.tamagotchi.energia <= 0) {
            this.tamagotchi.energia = 0;
            this.tamagotchi.cambiarEstado(this.tamagotchi.estados.cansado);
            this.tamagotchi.animo = 'Cansado';
        }
    }

    descansar() {
        this.tamagotchi.energia += 20;
        if (this.tamagotchi.energia >= 100) {
            this.tamagotchi.energia = 100;
        }
    }
}

class EstadoCansado extends EstadoTamagotchi {
    alimentar() {
        this.tamagotchi.hambre += 10;
        if (this.tamagotchi.hambre >= 100) {
            this.tamagotchi.hambre = 100;
            this.tamagotchi.cambiarEstado(this.tamagotchi.estados.hambriento);
            this.tamagotchi.animo = 'Hambriento';
        }
    }

    jugar() {
        this.tamagotchi.energia -= 10;
        if (this.tamagotchi.energia <= 0) {
            this.tamagotchi.energia = 0;
        }
    }

    descansar() {
        this.tamagotchi.energia += 30;
        this.tamagotchi.hambre += 10;
        if (this.tamagotchi.energia >= 100) {
            this.tamagotchi.energia = 100;
            this.tamagotchi.cambiarEstado(this.tamagotchi.estados.feliz);
            this.tamagotchi.animo = 'Feliz';
        }
        if (this.tamagotchi.hambre >= 100) {
            this.tamagotchi.hambre = 100;
            this.tamagotchi.cambiarEstado(this.tamagotchi.estados.hambriento);
            this.tamagotchi.animo = 'Hambriento';
        }
    }
}

class EstadoHambriento extends EstadoTamagotchi {
    alimentar() {
        this.tamagotchi.hambre -= 20;
        if (this.tamagotchi.hambre <= 0) {
            this.tamagotchi.hambre = 0;
            this.tamagotchi.cambiarEstado(this.tamagotchi.estados.feliz);
            this.tamagotchi.animo = 'Feliz';
        }
    }

    jugar() {
        this.tamagotchi.energia -= 10;
        if (this.tamagotchi.energia <= 0) {
            this.tamagotchi.energia = 0;
            this.tamagotchi.cambiarEstado(this.tamagotchi.estados.cansado);
            this.tamagotchi.animo = 'Cansado';
        }
    }

    descansar() {
        this.tamagotchi.energia += 10;
        if (this.tamagotchi.energia >= 100) {
            this.tamagotchi.energia = 100;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const miTamagotchi = new Tamagotchi();
});
