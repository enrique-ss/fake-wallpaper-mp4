const video = document.getElementById('videoBackground');
const videoSource = document.getElementById('videoSource');
const menu = document.getElementById('menu');
const controls = document.getElementById('controls');
const loading = document.getElementById('loading');
const wallpaperBtnsContainer = document.getElementById('wallpaperGrid');

// 1. LISTA DE VÍDEOS PARA GERAÇÃO DINÂMICA
const videoFiles = [
    'video2.mp4', 'video3.mp4', 'video4.mp4', 'video5.mp4', 'video6.mp4', 'video7.mp4',
    'video8.mp4', 'video9.mp4', 'video10.mp4', 'video11.mp4', 'video12.mp4', 'video13.mp4',
    'video14.mp4', 'video15.mp4', 'video16.mp4', 'video17.mp4', 'video18.mp4'
];

// 2. FUNÇÃO PARA CRIAR E ADICIONAR BOTÕES DE VÍDEO
function createVideoButtons() {
    videoFiles.forEach((filename) => {
        
        const btn = document.createElement('button');
        btn.classList.add('wallpaper-btn');
        btn.setAttribute('data-video', filename);
        
        // USO DE preload="metadata" (Compromisso)
        // Isso permite que o navegador carregue o primeiro frame do vídeo 
        // para ser usado como miniatura, substituindo o arquivo .jpg.
        btn.innerHTML = `
            <video class="thumbnail" muted playsinline preload="metadata">
                <source src="${filename}" type="video/mp4">
            </video>
        `;

        wallpaperBtnsContainer.appendChild(btn);
        setupVideoHover(btn);
    });
}

// 3. LÓGICA DO HOVER SIMPLIFICADA (Sem o Map de Lazy Load)
function setupVideoHover(btn) {
    const thumb = btn.querySelector('.thumbnail');
    
    if (thumb) {
        btn.addEventListener('mouseenter', function() {
            // Garante que o vídeo toque imediatamente
            thumb.currentTime = 0;
            thumb.play().catch(() => {});
        });
        
        btn.addEventListener('mouseleave', function() {
            thumb.pause();
            // Volta para o primeiro frame (que agora é a miniatura estática)
            thumb.currentTime = 0; 
        });

        // Lógica do Clique (Carregamento do Wallpaper principal)
        btn.addEventListener('click', function() {
            const videoFile = this.getAttribute('data-video');
            if (videoFile) loadVideo(videoFile);
        });
    }
}

// Inicializa a criação dos botões
document.addEventListener('DOMContentLoaded', createVideoButtons);


// --- LÓGICA DO BOTÃO "ADICIONAR VÍDEO" (Sem alteração) ---
const btnAdd = document.getElementById('btnAddVideo');
const inputVideo = document.getElementById('videoInput');

if (btnAdd && inputVideo) {
    btnAdd.addEventListener('click', () => inputVideo.click());

    inputVideo.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            loadVideo(fileURL);
            inputVideo.value = ''; 
        }
    });
}

// --- FUNÇÕES GERAIS (Sem alteração) ---

function loadVideo(filename) {
    loading.classList.add('active');
    menu.classList.add('hidden');

    video.pause();
    video.classList.remove('active');

    videoSource.src = filename;
    video.load();

    video.addEventListener('loadeddata', function onLoad() {
        video.removeEventListener('loadeddata', onLoad);
        loading.classList.remove('active');
        video.classList.add('active');
        video.play();
        controls.classList.add('visible');
        enterFullscreen();
    });

    video.addEventListener('error', function onError() {
        video.removeEventListener('error', onError);
        loading.classList.remove('active');
        alert('Erro ao carregar o vídeo. Verifique se o arquivo existe e o formato é compatível (mp4/webm).');
        menu.classList.remove('hidden');
    });
}

function goBack() {
    if (document.fullscreenElement) {
        document.exitFullscreen().then(() => showMenu()).catch(() => showMenu());
    } else {
        showMenu();
    }
}

function showMenu() {
    menu.classList.remove('hidden');
    video.classList.remove('active');
    video.pause();
    controls.classList.remove('visible');
}

function enterFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Não foi possível entrar em tela cheia automaticamente:', err.message);
        });
    }
}

// Atalhos de teclado (Escape ou M)
document.addEventListener('keydown', function(e) {
    const key = e.key.toLowerCase();
    if (key === 'escape' || key === 'm') {
        e.preventDefault();
        if (menu.classList.contains('hidden')) goBack();
    }
});