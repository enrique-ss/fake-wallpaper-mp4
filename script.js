const video = document.getElementById('videoBackground');
const videoSource = document.getElementById('videoSource');
const menu = document.getElementById('menu');
const controls = document.getElementById('controls');
const loading = document.getElementById('loading');
const wallpaperBtns = document.querySelectorAll('.wallpaper-btn');

// --- LÓGICA DAS THUMBNAILS (HOVER) ---
wallpaperBtns.forEach((btn) => {
  // Ignora o botão de adicionar vídeo, pois ele não tem thumbnail de vídeo
  if (btn.id === 'btnAddVideo') return;

  const thumb = btn.querySelector('.thumbnail');
  
  if(thumb) {
    btn.addEventListener('mouseenter', function() {
      thumb.currentTime = 0;
      thumb.play().catch(() => {});
    });
    
    btn.addEventListener('mouseleave', function() {
      thumb.pause();
      thumb.currentTime = 0;
    });
  }
});

// --- CLIQUE NOS BOTÕES DE VÍDEO PADRÃO ---
wallpaperBtns.forEach(btn => {
  // Se for o botão de adicionar, não adiciona o clique padrão
  if (btn.id === 'btnAddVideo') return;

  btn.addEventListener('click', function() {
    const videoFile = this.getAttribute('data-video');
    if(videoFile) {
      loadVideo(videoFile);
    }
  });
});

// --- LÓGICA DO BOTÃO "ADICIONAR VÍDEO" ---
const btnAdd = document.getElementById('btnAddVideo');
const inputVideo = document.getElementById('videoInput');

if (btnAdd && inputVideo) {
  // Ao clicar no botão, abre o seletor de arquivos do sistema
  btnAdd.addEventListener('click', () => {
    inputVideo.click();
  });

  // Ao selecionar um arquivo
  inputVideo.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      // Cria uma URL temporária para o vídeo local
      const fileURL = URL.createObjectURL(file);
      loadVideo(fileURL);
      
      // Limpa o input para permitir selecionar o mesmo arquivo novamente se quiser
      inputVideo.value = ''; 
    }
  });
}

// --- FUNÇÕES GERAIS ---

function loadVideo(filename) {
  // Mostrar loading
  loading.classList.add('active');
  menu.classList.add('hidden');

  // Parar vídeo atual
  video.pause();
  video.classList.remove('active');

  // Carregar novo vídeo
  videoSource.src = filename;
  video.load();

  video.addEventListener('loadeddata', function onLoad() {
    video.removeEventListener('loadeddata', onLoad);
    loading.classList.remove('active');
    video.classList.add('active');
    video.play();
    controls.classList.add('visible');
    
    // Entrar em tela cheia automaticamente
    enterFullscreen();
  });

  video.addEventListener('error', function onError() {
    video.removeEventListener('error', onError);
    loading.classList.remove('active');
    alert('Erro ao carregar o vídeo.\n\nSe for um arquivo local, verifique se o formato é suportado (mp4/webm).');
    menu.classList.remove('hidden');
  });
}

function goBack() {
  // Sair da tela cheia se estiver
  if (document.fullscreenElement) {
    document.exitFullscreen().then(() => {
      showMenu();
    }).catch(() => {
      showMenu();
    });
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

// Atalhos de teclado
document.addEventListener('keydown', function(e) {
  // Permitir F11 para tela cheia nativa do navegador
  if (e.key === 'Escape') {
    e.preventDefault();
    // Se não estiver no menu, voltar para o menu
    if (menu.classList.contains('hidden')) {
      goBack();
    }
  } else if (e.key === 'm' || e.key === 'M') {
    goBack();
  }
});