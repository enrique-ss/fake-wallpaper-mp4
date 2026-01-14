# 🎬 Fake Wallpaper - Wallpaper Animado Falso

Transforme vídeos em wallpapers animados falsos para computadores que não deixam você personalizar a tela de fundo. Simples assim: abre um navegador em tela cheia com vídeo em loop.

## 🤔 Por Que Isso Existe?

Sabe aquele computador da escola/trabalho que não deixa você mudar o papel de parede? Ou que não tem suporte nativo para wallpapers animados? Esse projeto contorna isso.

**A ideia:** Navegador em tela cheia = parece wallpaper animado 🎭

## 🎯 Como Funciona

1. Você abre uma página web
2. Escolhe um vídeo de uma grade com 17 opções
3. Vídeo entra em tela cheia e fica em loop infinito
4. Parece um wallpaper animado de verdade

**Resultado:** Seu desktop chato vira um fundo animado maneiro sem precisar de permissão de administrador.

## 🚀 Como usar

### **Jeito Rápido (Teste)**
1. Abra o arquivo `index.html` no navegador
2. Clique em um dos 17 vídeos da grade
3. Pronto! Já tá parecendo wallpaper

### **Jeito Automático (Windows)**
Tem um arquivo `.bat` que abre tudo automaticamente em tela cheia:

1. Abra `start-wallpaper.bat` no bloco de notas
2. Mude essa linha com o caminho correto:
   ```bat
   "file:///C:/CAMINHO/PARA/SEU/PROJETO/index.html"
   ```
3. Salva e fecha
4. Agora só dar dois cliques no `.bat`

> **Dica:** Arrasta o `.bat` pra área de trabalho ou configura pra abrir sozinho quando ligar o PC

## ✨ O Que Tem de Bom

- **17 vídeos prontos** pra usar (paisagens, espaço, abstratos)
- **Adiciona seus vídeos** do computador (MP4, WebM, MKV)
- **Miniatura automática** de cada vídeo (você vê antes de escolher)
- **Dois formatos suportados:** WebM (menor) e MP4 (compatível)
- **Atalhos úteis:**
  - **ESC** ou **M** → Volta pro menu
  - **F11** → Liga/desliga tela cheia

## 🎮 Casos de Uso

- 🏫 **Escola:** Computador bloqueado mas você quer personalizar
- 🏢 **Trabalho:** PC corporativo sem graça
- 🎨 **Estética:** Wallpaper de jogo/anime/filme favorito
- 📺 **Apresentações:** Background animado pra eventos
- 💻 **Diversão:** Só porque é legal mesmo

## 📂 Como Tá Organizado

```
fake-wallpaper/
├── index.html              # Página que você abre
├── styles.css              # Deixa bonito
├── script.js               # Faz funcionar
├── start-wallpaper.bat     # Abre automático (Windows)
├── video2.mp4/.webm        # Wallpapers incluídos
├── video3.mp4/.webm
├── ... (até video18)
└── README.md               # Você tá aqui
```

## 🎥 Colocando Seus Vídeos

### **Jeito Temporário (Teste Rápido)**
1. Clica no botão **"+ Adicionar Vídeo"** na grade
2. Escolhe um vídeo do seu PC
3. Usa normalmente

**Problema:** Quando fechar e abrir de novo, o vídeo some. É só pra testar.

### **Jeito Permanente (Fixo)**
1. Coloca teu vídeo na pasta do projeto (exemplo: `meu-video.mp4`)
2. Abre `script.js` no bloco de notas
3. Procura essa parte (linha 6):
   ```javascript
   const videoFiles = [
       'video2', 'video3', 'video4', ... 'video18'
   ];
   ```
4. Adiciona teu vídeo no final (sem extensão):
   ```javascript
   const videoFiles = [
       'video2', 'video3', ... 'video18', 'meu-video'
   ];
   ```
5. Salva e atualiza a página

> **Dica:** Usa WebM se puder (arquivo menor, carrega mais rápido)

## 🔧 Customizações Rápidas

### **Mudar Vídeo Inicial**
Quando você abre, já começa com um vídeo tocando. Pra mudar qual:
- Abre `index.html` (linha 13)
- Troca `video10.mp4` por outro número

### **Mudar Quantas Colunas na Grade**
Por padrão são 6 colunas. Pra mudar:
- Abre `styles.css` (linha 62)
- Muda o `repeat(6, 1fr)` pro número que quiser

### **Qualidade da Miniatura**
Miniaturas em alta qualidade deixam carregamento lento. Pra ajustar:
- Abre `script.js` (linha 43)
- Muda `0.7` (70%) pra `0.5` (50%) ou `0.9` (90%)

## ⚠️ Limitações

- **Não é wallpaper real:** Precisa deixar navegador aberto
- **Gasta mais bateria:** Vídeo sempre rodando consome recursos
- **Sem áudio:** Os vídeos ficam mutados (senão ia fazer barulho)
- **Precisa tela cheia:** Se minimizar, estraga a ilusão

## 💻 Requisitos Mínimos

- Qualquer navegador moderno (Chrome, Edge, Firefox)
- Vídeos em MP4, WebM ou MKV
- Windows 10/11 (se for usar o `.bat`)

## 📧 Contato

- **GitHub:** [@enrique-ss](https://github.com/enrique-ss)
- **Email:** enriqueabyss@gmail.com

---

💡 **Dica Pro:** Coloca o `.bat` na pasta de inicialização do Windows (`Win+R` → `shell:startup`) e teu wallpaper animado abre sozinho quando ligar o PC!

---

## 🛠️ Parte Técnica

### **Tech Stack**
- **HTML5 Video API** - Player de vídeo nativo do navegador
- **Canvas API** - Gera miniatura pegando frame do vídeo
- **Fetch API** - Testa qual formato de vídeo existe (HEAD request)
- **CSS Grid** - Layout responsivo das miniaturas
- **Vanilla JavaScript** - Zero dependências, zero frameworks

### **Como Funciona a Detecção de Formato**

```javascript
const videoFormats = ['.webm', '.mp4'];

async function detectVideoFormat(basename) {
    for (const format of videoFormats) {
        const url = basename + format;
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) return url;
    }
    return basename + '.mp4'; // Fallback
}
```

**Por quê?**
- WebM é menor (melhor compressão)
- MP4 é mais compatível (todos navegadores)
- Sistema tenta WebM primeiro, depois MP4

### **Geração de Thumbnails em Tempo Real**

```javascript
function generateThumbnail(videoSrc, callback) {
    const tempVideo = document.createElement('video');
    tempVideo.currentTime = 1; // Frame em 1 segundo
    
    tempVideo.addEventListener('seeked', function() {
        const canvas = document.createElement('canvas');
        canvas.width = 480;
        canvas.height = 270;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
        
        const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.7);
        callback(thumbnailUrl);
    });
    
    tempVideo.src = videoSrc;
}
```

**Fluxo:**
1. Cria `<video>` invisível
2. Carrega vídeo só os metadados (não baixa tudo)
3. Pula pro segundo 1
4. Captura frame pro canvas
5. Converte canvas pra JPEG base64
6. Usa como `background-image` do botão

**Performance:**
- Delay de 200ms entre cada miniatura (não trava navegador)
- Qualidade 70% (balanço tamanho vs qualidade)
- Canvas 480x270 (16:9 proporção)

### **Perfil Isolado do Edge (Windows)**

```bat
start "" "msedge.exe" ^
  --user-data-dir="C:\EdgeWallpaperProfile" ^
  --guest ^
  --start-fullscreen ^
  "file:///C:/caminho/index.html" ^
  --no-first-run
```

**Flags importantes:**
- `--user-data-dir`: Cria perfil separado (não mexe no seu Edge normal)
- `--guest`: Modo anônimo (sem histórico)
- `--start-fullscreen`: Abre em tela cheia direto
- `--no-first-run`: Pula mensagens de boas-vindas

### **Responsividade do Grid**

```css
/* Desktop: 6 colunas */
.wallpaper-grid {
  grid-template-columns: repeat(6, 1fr);
}

/* Notebook: 4 colunas */
@media (max-width: 1800px) {
  grid-template-columns: repeat(4, 1fr);
}

/* Tablet: 2 colunas */
@media (max-width: 1400px) {
  grid-template-columns: repeat(2, 1fr);
}

/* Mobile: 1 coluna */
@media (max-width: 768px) {
  grid-template-columns: 1fr;
}
```

### **Upload de Arquivo Temporário**

```javascript
inputVideo.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        loadVideo(fileURL);
        inputVideo.value = ''; // Limpa input
    }
});
```

**Blob URL temporário:**
- `URL.createObjectURL()` cria referência na memória
- Válido apenas naquela sessão do navegador
- Não persiste (fecha navegador = some)

### **Por Que Sem Framework?**

✅ **Vantagens:**
- Mais leve (0kb de biblioteca)
- Mais rápido (sem virtual DOM)
- Mais simples (código direto)
- Hospedagem grátis fácil (GitHub Pages)

❌ **Desvantagens:**
- Código mais verboso
- Sem reatividade automática
- Gerenciamento manual do DOM

**Conclusão:** Pra um projeto pequeno assim, framework seria canhão pra matar formiga.
