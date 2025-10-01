// ---------- CONFIG ----------
const CONFIG = {
    nick: 'Carlos Patiño',
    desc: 'Me gusta el encebollado',
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

// Mensajes de carga / error
scene.addEventListener('model-loaded', e => {
    if (e.detail.target?.id === 'personaje') {
        console.info('✅ Modelo cargado');
        personaje?.setAttribute('position', CONFIG.modelPosition);
        billboard?.setAttribute('value', CONFIG.billboardText);
        billboard?.setAttribute('position', CONFIG.billboardOffset);
    }
});

scene.addEventListener('model-error', e => {
    console.error('❌ Error al cargar modelo:', e.detail.target?.src);
    alert('No se pudo cargar el modelo 3D.\nComprueba la ruta o el archivo.');
});

// ---------- BOTÓN AR ----------
const glb = CONFIG.modelPath;                // mismo archivo
const usdz = 'models/USDZWaving.usdz';           // USDZ para iOS (crear una vez)
const arBtn = document.getElementById('arBtn');

const isAR =
    (/Android/i.test(navigator.userAgent) && window.XRSystem) ||
    /iPhone|iPad/i.test(navigator.userAgent);

if (isAR) arBtn.style.display = 'block';

arBtn.addEventListener('click', () => {
    if (/Android/i.test(navigator.userAgent)) {
        // Android → Scene Viewer
        location.href = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(glb)}&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;end;`;
    } else if (/iPhone|iPad/i.test(navigator.userAgent)) {
        // iOS → Quick Look
        const link = document.createElement('a');
        link.setAttribute('rel', 'ar');
        link.href = usdz;
        link.click();
    }
});
