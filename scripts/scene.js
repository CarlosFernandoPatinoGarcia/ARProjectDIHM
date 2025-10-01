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
    if (e.detail.target?.id === 'personaje') {          // ← protección
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
