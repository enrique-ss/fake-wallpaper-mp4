# 🎬 Fake Wallpaper - Simulador de Wallpaper Dinâmico

Simulador de wallpaper animado com vídeos em loop, desenvolvido para contornar restrições de personalização em computadores institucionais (escola, trabalho, etc).

## 🎯 Problema que Resolve

Muitos computadores de instituições bloqueiam a configuração de wallpapers personalizados ou não suportam wallpapers animados nativamente. Este projeto simula um wallpaper dinâmico abrindo um navegador em tela cheia com vídeos em loop.

## 🚀 Como Usar

### **Método 1: Navegador Manual**
1. Abra o arquivo `index.html` no navegador
2. Selecione um wallpaper da grade

### **Método 2: Atalho Automatizado (Windows)**
1. Edite o arquivo `start-wallpaper.bat`
2. Ajuste o caminho do arquivo HTML:
   ```bat
   "file:///C:/CAMINHO/PARA/SEU/PROJETO/index.html"
   ```
3. Clique duplo no `.bat` para abrir automaticamente em tela cheia

> **Dica:** Crie um atalho do `.bat` na área de trabalho ou configure para iniciar com o Windows

## ✨ Funcionalidades

- **17 Wallpapers Pré-carregados:** Vídeos em loop otimizados
- **Upload Personalizado:** Adicione seus próprios vídeos (MP4, WebM, MKV)
- **Detecção Automática de Formato:** Prioriza WebM (melhor compressão) e fallback para MP4
- **Geração de Thumbnails:** Preview em JPEG dos vídeos para seleção visual
- **Controles Discretos:** Botão "Voltar" no canto inferior direito
- **Atalhos de Teclado:**
  - **ESC** ou **M** → Retorna ao menu
  - **F11** → Alterna tela cheia

## 🛠️ Tech Stack

- **HTML5 Video API** - Reprodução nativa de vídeos
- **Canvas API** - Geração de thumbnails JPEG
- **Fetch API** - Detecção assíncrona de formatos de vídeo
- **CSS Grid** - Layout responsivo da grade de wallpapers
- **Vanilla JavaScript** - Sem dependências externas

## 🎨 Destaques Técnicos

### **1. Detecção Inteligente de Formato**
```javascript
// Tenta WebM primeiro (melhor compressão), depois MP4
const videoFormats = ['.webm', '.mp4'];
```
O sistema faz requisições `HEAD` para verificar qual formato existe sem baixar o arquivo completo.

### **2. Geração de Thumbnails**
```javascript
// Cria um canvas, captura frame em 1s, converte para JPEG 70%
const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.7);
```
Thumbnails são gerados em tempo real com delay de 200ms entre cada um para não travar o navegador.

### **3. Perfil Isolado do Edge**
```bat
--user-data-dir="C:\EdgeWallpaperProfile" --guest
```
Cria perfil dedicado para não interferir nas configurações do seu navegador principal.

## 📂 Estrutura do Projeto

```
fake-wallpaper/
├── index.html              # Interface principal
├── styles.css              # Estilos (grid, animações, responsividade)
├── script.js               # Lógica (thumbnails, vídeos, fullscreen)
├── start-wallpaper.bat     # Atalho Windows para tela cheia
├── video2.mp4/.webm        # Wallpapers pré-incluídos
├── video3.mp4/.webm
├── ...
└── README.md               # Este arquivo
```

## 🎥 Adicionando Novos Wallpapers

### **Método 1: Via Interface (Temporário)**
- Clique no botão "+ Adicionar Vídeo"
- Selecione arquivo do computador
- Wallpaper fica disponível apenas na sessão atual

### **Método 2: Permanente**
1. Adicione seu vídeo na pasta do projeto (ex: `video18.mp4`)
2. Edite `script.js` na linha 6:
   ```javascript
   const videoFiles = [
       'video2', 'video3', ..., 'video18' // Adicione aqui
   ];
   ```
3. Recarregue a página

> **Recomendação:** Use WebM quando possível (arquivo menor, mesma qualidade)

## 🖥️ Requisitos

- Navegador moderno (Chrome, Edge, Firefox)
- Vídeos em formato MP4, WebM ou MKV
- Para `.bat`: Windows 10/11 com Edge instalado

## 🔧 Personalização

### **Alterar Wallpaper Inicial**
Edite `index.html` linha 13:
```html
<source id="videoSource" src="video10.mp4" type="video/mp4">
```

### **Ajustar Grid de Wallpapers**
Edite `styles.css` linha 62:
```css
grid-template-columns: repeat(6, 1fr); /* 6 colunas */
```

### **Mudar Qualidade dos Thumbnails**
Edite `script.js` linha 43:
```javascript
canvas.toDataURL('image/jpeg', 0.7); // 0.7 = 70% de qualidade
```

## 💡 Casos de Uso

- 🏫 **Escolas/Universidades:** Personalizar computadores bloqueados
- 🏢 **Ambientes Corporativos:** Wallpapers dinâmicos sem admin
- 🎮 **Estética:** Wallpapers de jogos, animes, paisagens em loop
- 📺 **Apresentações:** Background animado para eventos

## ⚠️ Limitações

- Não é um wallpaper real (precisa manter navegador aberto)
- Consome mais recursos que wallpaper estático
- Áudio dos vídeos é sempre mutado

## 📧 Contato

- **GitHub:** [@enrique-ss](https://github.com/enrique-ss)
- **Email:** enriqueabyss@gmail.com

---

💡 **Dica Pro:** Configure o `.bat` para iniciar automaticamente com o Windows e tenha seu wallpaper animado sempre que ligar o PC!