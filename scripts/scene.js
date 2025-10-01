// ---------- CONFIG ----------
const CONFIG = {
    nick: 'Carlos Patiño',
    desc: 'Primer encuentro con el mundo AR',
    link: 'https://github.com/CarlosFernandoPatinoGarcia',
    modelPath: 'models/GLBwaving.glb',
    modelPosition: '0 0 -3',
    billboardText: 'Carlosfpg',
    billboardOffset: '0 2.2 -3'
};

// ---------- HUD ----------
document.getElementById('nick').textContent = CONFIG.nick;
document.getElementById('desc').textContent = CONFIG.desc;
document.getElementById('link').href = CONFIG.link;

// ---------- ESCENA ----------
const scene = document.querySelector('a-scene');
const personaje = document.getElementById('personaje');
const billboard = document.getElementById('billboard');

// Configuramos modelo y billboard cuando cargue
personaje.addEventListener('model-loaded', () => {
    console.info('✅ Modelo cargado');
    personaje.setAttribute('position', CONFIG.modelPosition);
    billboard.setAttribute('value', CONFIG.billboardText);
    billboard.setAttribute('position', CONFIG.billboardOffset);
});

// Manejo de error
scene.addEventListener('model-error', e => {
    console.error('❌ Error al cargar modelo:', e.detail.target?.src);
    alert('No se pudo cargar el modelo 3D.\nComprueba la ruta o el archivo.');
});

// ---------- BOTÓN AR ----------
const glb = CONFIG.modelPath;
const usdz = 'models/USDZWaving.usdz';
const arBtn = document.getElementById('arBtn');

// Detectamos AR (Scene Viewer o QuickLook)
const isAR =
    (/Android/i.test(navigator.userAgent) && window.XRSystem) ||
    /iPhone|iPad/i.test(navigator.userAgent);

if (isAR) {
    arBtn.style.display = 'block';
} else {
    const msg = document.createElement('div');
    msg.className = 'no-ar-msg';
    msg.textContent = 'Modo cámara no disponible en este dispositivo. Disfruta la experiencia 3D.';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 4000);
}

// ---------- DIÁLOGO TIPO RPG ----------
const frases = [
    "Hola mundo.",
    "Este es mi primer proyecto",
    "con modelos 3D",
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
            if (callback) setTimeout(callback, 1500); // espera 1.5s y sigue
        }
    }, 80); // velocidad escritura
}

function mostrarDialogo() {
    if (escribiendo) return;
    escribirFrase(frases[indice], () => {
        indice = (indice + 1) % frases.length;
        mostrarDialogo();
    });
}

// Arranca cuando cargue el avatar
personaje.addEventListener('model-loaded', () => {
    console.info('✅ Modelo cargado → iniciando diálogo RPG');
    mostrarDialogo();
});
