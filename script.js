const video = document.getElementById('videoBackground');
const videoSource = document.getElementById('videoSource');
const menu = document.getElementById('menu');
const controls = document.getElementById('controls');
const loading = document.getElementById('loading');
const wallpaperBtnsContainer = document.getElementById('wallpaperGrid');

// Lista de vídeos (aceita MP4, WebM, etc)
const videoFiles = [
    'video2', 'video3', 'video4', 'video5', 'video6', 'video7',
    'video8', 'video9', 'video10', 'video11', 'video12', 'video13',
    'video14', 'video15', 'video16', 'video17', 'video18'
];

// Formatos suportados em ordem de preferência (melhor compressão primeiro)
const videoFormats = ['.webm', '.mp4'];

// Detecta qual formato existe para cada vídeo
async function detectVideoFormat(basename) {
    for (const format of videoFormats) {
        const url = basename + format;
        try {
            const response = await fetch(url, { method: 'HEAD' });
            if (response.ok) {
                return url;
            }
        } catch (e) {
            continue;
        }
    }
    return basename + '.mp4'; // Fallback para MP4
}

// Função para gerar thumbnail JPEG do vídeo
function generateThumbnail(videoSrc, callback) {
    const tempVideo = document.createElement('video');
    tempVideo.preload = 'metadata';
    tempVideo.muted = true;
    tempVideo.playsInline = true;
    
    tempVideo.addEventListener('loadeddata', function() {
        tempVideo.currentTime = 1; // Pega frame em 1 segundo
    });
    
    tempVideo.addEventListener('seeked', function() {
        const canvas = document.createElement('canvas');
        canvas.width = 480;
        canvas.height = 270;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
        
        // Converte para JPEG com qualidade 70%
        const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.7);
        
        // Libera memória
        tempVideo.src = '';
        tempVideo.load();
        
        callback(thumbnailUrl);
    });
    
    tempVideo.addEventListener('error', function() {
        callback(null);
    });
    
    tempVideo.src = videoSrc;
}

// Cria os botões de vídeo com thumbnails
async function createVideoButtons() {
    for (let index = 0; index < videoFiles.length; index++) {
        const basename = videoFiles[index];
        
        const btn = document.createElement('button');
        btn.classList.add('wallpaper-btn');
        
        // Placeholder de loading
        const loadingText = document.createElement('div');
        loadingText.classList.add('thumbnail-loading');
        loadingText.textContent = '...';
        
        // Label do vídeo
        const label = document.createElement('span');
        label.classList.add('video-label');
        label.textContent = basename.replace('video', 'Wallpaper ');
        
        btn.appendChild(loadingText);
        btn.appendChild(label);
        wallpaperBtnsContainer.appendChild(btn);
        
        // Detecta formato e define
        const videoPath = await detectVideoFormat(basename);
        btn.setAttribute('data-video', videoPath);
        
        // Gera thumbnail com delay para não travar o navegador
        setTimeout(() => {
            generateThumbnail(videoPath, (thumbnailUrl) => {
                if (thumbnailUrl) {
                    const img = document.createElement('img');
                    img.classList.add('thumbnail');
                    img.src = thumbnailUrl;
                    btn.insertBefore(img, btn.firstChild);
                }
                loadingText.remove();
            });
        }, index * 200); // Delay de 200ms entre cada thumbnail
        
        // Evento de clique
        btn.addEventListener('click', function() {
            const videoFile = this.getAttribute('data-video');
            if (videoFile) loadVideo(videoFile);
        });
    }
}

// Inicializa ao carregar a página
document.addEventListener('DOMContentLoaded', createVideoButtons);

// Botão "Adicionar Vídeo"
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

// Carrega o vídeo selecionado
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

// Volta ao menu
function goBack() {
    if (document.fullscreenElement) {
        document.exitFullscreen().then(() => showMenu()).catch(() => showMenu());
    } else {
        showMenu();
    }
}

// Mostra o menu
function showMenu() {
    menu.classList.remove('hidden');
    video.classList.remove('active');
    video.pause();
    controls.classList.remove('visible');
}

// Entra em tela cheia
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