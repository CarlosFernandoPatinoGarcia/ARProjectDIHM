// ---------- CONFIG ----------
const CONFIG = {
    nick: 'Carlos Patiño',
    desc: 'Primer encuentro con el mundo AR',
    link: 'https://github.com/CarlosFernandoPatinoGarcia',
    modelPath: 'models/GLBwaving.glb',
    modelPosition: '0 0 -3',
    billboardText: 'CarlosNPC',
    billboardOffset: '0 2.2 -3'
};

// ---------- HUD ----------
document.getElementById('nick').textContent = CONFIG.nick;
document.getElementById('desc').textContent = CONFIG.desc;
document.getElementById('link').href = CONFIG.link;

// ---------- Diálogo RPG ----------
const frases = [
    "Hola mundo.",
    "Este es mi primer proyecto",
    "con modelos 3D",
    "Puedes desplazarte con las teclas",
    "W: Adelante, A: Izquierda",
    "S: Atras, D: Derecha",
    "y con el mouse mirar alrededor",
    "Supongo que eso es todo.",
    "¡Gracias por mirar mi demo!"
];

let indice = 0;
let escribiendo = false;
const texto = document.getElementById('dialogo');

function escribirFrase(frase, callback) {
    escribiendo = true;
    texto.setAttribute('value', ""); // limpiar antes
    let i = 0;

    const intervalo = setInterval(() => {
        texto.setAttribute('value', texto.getAttribute('value') + frase[i]);
        i++;
        if (i >= frase.length) {
            clearInterval(intervalo);
            escribiendo = false;
            if (callback) setTimeout(callback, 1500);
        }
    }, 80);
}

function mostrarDialogo() {
    if (escribiendo) return;
    escribirFrase(frases[indice], () => {
        indice = (indice + 1) % frases.length;
        mostrarDialogo();
    });
}

// Arranca cuando cargue el avatar
const personaje = document.getElementById('personaje');
personaje.addEventListener('model-loaded', () => {
    console.info('✅ Modelo cargado → iniciando diálogo RPG');
    personaje.setAttribute('position', CONFIG.modelPosition);
    document.getElementById('billboard').setAttribute('value', CONFIG.billboardText);
    mostrarDialogo();
});

// ---------- Componente 3D botón ----------
const miniDialogoBtn = document.getElementById('miniDialogoBtn');

AFRAME.registerComponent('check-distance', {
    schema: {
        target: { type: 'selector' },
        range: { type: 'number', default: 2 }
    },
    init() { this.cerca = false; },
    tick() {
        const posBoton = this.el.object3D.position;
        const posCam = this.data.target.object3D.position;
        const dx = posBoton.x - posCam.x;
        const dy = posBoton.y - posCam.y;
        const dz = posBoton.z - posCam.z;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (d < this.data.range && !this.cerca) {
            this.cerca = true;
            this.el.setAttribute('color', '#4caf50'); // verde
        } else if (d >= this.data.range && this.cerca) {
            this.cerca = false;
            this.el.setAttribute('color', 'red'); // rojo
        }
    }
});

// ---------- Evento click del botón ----------
const boton = document.getElementById('boton3d');
boton.addEventListener('click', () => {
    if (boton.getAttribute('color') === '#4caf50') {
        miniDialogoBtn.setAttribute('value', 'BOOOM!');
    }
});

// ---------- Botón AR para móviles ----------
const arBtn = document.getElementById('arBtn');
const glbUrl = CONFIG.modelPath;
const usdzUrl = glbUrl.replace('.glb', '.usdz'); // Suponiendo que tienes la versión .usdz para iOS

if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    // iOS -> Quick Look
    arBtn.setAttribute('rel', 'ar');
    arBtn.setAttribute('href', usdzUrl);
} else if (/Android/i.test(navigator.userAgent)) {
    // Android -> Scene Viewer
    arBtn.setAttribute('href', `intent://arvr.google.com/scene-viewer/1.0?file=${glbUrl}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;end;`);
} else {
    // Otros -> ocultar botón AR
    arBtn.style.display = 'none';
}
