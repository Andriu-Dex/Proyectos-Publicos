class Tamagotchi {
    constructor() {
        this.state = new EstadoFeliz(this);
        this.inspiracionFrases = [
            "Sigue adelante!",
            "¡Tú puedes!",
            "Cree en ti mismo!",
            "¡Mantente positivo!",
            "¡Nunca te rindas!"
        ]; // Cambia estas frases por tus propias frases de inspiración
        this.init();
    }

    init() {
        document.getElementById('feedButton').addEventListener('click', () => this.alimentar());
        document.getElementById('playButton').addEventListener('click', () => this.jugar());
        document.getElementById('sleepButton').addEventListener('click', () => this.dormir());
        this.generarInspiracion();
    }

    setState(state) {
        this.state = state;
        this.actualizarUI();
    }

    alimentar() {
        this.state.alimentar();
    }

    jugar() {
        this.state.jugar();
    }

    dormir() {
        this.state.dormir();
    }

    actualizarUI() {
        document.getElementById('status').innerText = this.state.getStatus();
        document.getElementById('tamagotchiImage').src = this.state.getImage();
    }

    generarInspiracion() {
        setInterval(() => {
            const frase = this.inspiracionFrases[Math.floor(Math.random() * this.inspiracionFrases.length)];
            document.getElementById('inspiration').innerText = frase;
        }, 10000); // Cambia este valor para ajustar la frecuencia de las frases de inspiración
    }
}

class EstadoTamagotchi {
    constructor(tamagotchi) {
        this.tamagotchi = tamagotchi;
    }

    alimentar() {}
    jugar() {}
    dormir() {}
    getStatus() {}
    getImage() {}
}

class EstadoFeliz extends EstadoTamagotchi {
    alimentar() {
        this.tamagotchi.setState(new EstadoLleno(this.tamagotchi));
    }

    jugar() {
        this.tamagotchi.setState(new EstadoCansado(this.tamagotchi));
    }

    dormir() {
        this.tamagotchi.setState(new EstadoDurmiendo(this.tamagotchi));
    }

    getStatus() {
        return 'Feliz';
    }

    getImage() {
        return '/Gato/feliz.png'; // Cambia 'feliz.png' a tu imagen personalizada
    }
}

class EstadoLleno extends EstadoTamagotchi {
    alimentar() {
        console.log('¡El Tamagotchi ya está lleno!');
    }

    jugar() {
        this.tamagotchi.setState(new EstadoCansado(this.tamagotchi));
    }

    dormir() {
        this.tamagotchi.setState(new EstadoDurmiendo(this.tamagotchi));
    }

    getStatus() {
        return 'Lleno';
    }

    getImage() {
        return '/Gato/gordo.png'; // Cambia 'lleno.png' a tu imagen personalizada
    }
}

class EstadoCansado extends EstadoTamagotchi {
    alimentar() {
        this.tamagotchi.setState(new EstadoLleno(this.tamagotchi));
    }

    jugar() {
        console.log('¡El Tamagotchi está demasiado cansado para jugar!');
    }

    dormir() {
        this.tamagotchi.setState(new EstadoDurmiendo(this.tamagotchi));
    }

    getStatus() {
        return 'Cansado';
    }

    getImage() {
        return '/Gato/cansado.png'; // Cambia 'cansado.png' a tu imagen personalizada
    }
}

class EstadoDurmiendo extends EstadoTamagotchi {
    alimentar() {
        console.log('¡El Tamagotchi está durmiendo!');
    }

    jugar() {
        console.log('¡El Tamagotchi está durmiendo!');
    }

    dormir() {
        console.log('¡El Tamagotchi ya está durmiendo!');
    }

    getStatus() {
        return 'Durmiendo';
    }

    getImage() {
        return '/Gato/con_sueño.png'; // Cambia 'durmiendo.png' a tu imagen personalizada
    }
}

// Inicializa Tamagotchi
document.addEventListener('DOMContentLoaded', () => {
    new Tamagotchi();
});
