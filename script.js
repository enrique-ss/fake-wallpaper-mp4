const video = document.getElementById('videoBackground');
const videoSource = document.getElementById('videoSource');
const menu = document.getElementById('menu');
const controls = document.getElementById('controls');
const loading = document.getElementById('loading');
const wallpaperBtns = document.querySelectorAll('.wallpaper-btn');
const thumbnails = document.querySelectorAll('.thumbnail');

// Iniciar reprodução das thumbnails ao passar o mouse
wallpaperBtns.forEach((btn, index) => {
  const thumb = btn.querySelector('.thumbnail');
  
  btn.addEventListener('mouseenter', function() {
    thumb.currentTime = 0;
    thumb.play().catch(() => {});
  });
  
  btn.addEventListener('mouseleave', function() {
    thumb.pause();
    thumb.currentTime = 0;
  });
});

// Configurar eventos dos botões
wallpaperBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const videoFile = this.getAttribute('data-video');
    loadVideo(videoFile);
  });
});

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
    alert('Erro ao carregar o vídeo: ' + filename + '\n\nCertifique-se de que o arquivo existe na mesma pasta.');
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

function closeWallpaper() {
  if (confirm('Deseja realmente fechar o wallpaper?')) {
    video.pause();
    video.classList.remove('active');
    menu.classList.remove('hidden');
    controls.classList.remove('visible');
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }
}

function enterFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log('Não foi possível entrar em tela cheia automaticamente:', err.message);
      // Tentar novamente após 500ms
      setTimeout(enterFullscreen, 500);
    });
  }
}

// Atalhos de teclado
document.addEventListener('keydown', function(e) {
  // Bloquear F11 e ESC para não sair da tela cheia
  if (e.key === 'F11') {
    e.preventDefault();
  }
  
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

// Garantir que sempre volte para tela cheia
document.addEventListener('fullscreenchange', function() {
  // Se saiu da tela cheia e há um vídeo ativo, voltar para tela cheia
  if (!document.fullscreenElement && video.classList.contains('active')) {
    setTimeout(enterFullscreen, 100);
  }
});