// Datos personalizables
const CONFIG = {
    nick: 'Carlos Patiño',
    desc: 'Me gusta el encebollado',
    link: 'https://github.com/CarlosFernandoPatinoGarcia',
    modelPath: 'models/GLB_WavingGesture.glb',
    modelPosition: '0 0 -3',
    billboardText: 'CarlosNick',
    billboardOffset: '0 2.2 -3'
};

// Rellena HUD
document.getElementById('nick').textContent = CONFIG.nick;
document.getElementById('desc').textContent = CONFIG.desc;
document.getElementById('link').href = CONFIG.link;

// Ajusta modelo y billboard cuando la escena esté lista
document.querySelector('a-scene').addEventListener('loaded', () => {
    const personaje = document.getElementById('personaje');
    const billboard = document.getElementById('billboard');

    personaje.setAttribute('position', CONFIG.modelPosition);
    billboard.setAttribute('value', CONFIG.billboardText);
    billboard.setAttribute('position', CONFIG.billboardOffset);

});
