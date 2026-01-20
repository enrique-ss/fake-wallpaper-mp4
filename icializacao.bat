@echo off
REM Use o argumento --user-data-dir para criar um perfil dedicado,
REM isolando a configuração de tela cheia (fullscreen) do seu Edge normal.

start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --user-data-dir="C:\EdgeWallpaperProfile" --guest --start-fullscreen "C:\Users\LUIZHENRIQUESILVEIRA\Documents\GitHub\fake-wallpaper\index.html" --no-first-run