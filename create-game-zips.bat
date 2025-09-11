@echo off
echo 🎮 Creazione archivi ZIP per i giochi Gen Z
echo ================================================

echo.
echo 📦 Comprimendo Meme Master...
powershell Compress-Archive -Path "games\meme-master\*" -DestinationPath "meme-master-genz-game.zip" -Force

echo.
echo 📦 Comprimendo TikTok Dance Battle...
powershell Compress-Archive -Path "games\tiktok-dance-battle\*" -DestinationPath "tiktok-dance-battle-genz-game.zip" -Force

echo.
echo 📦 Creando archivio completo...
powershell Compress-Archive -Path "games\*" -DestinationPath "genz-arcade-games-complete.zip" -Force

echo.
echo 🎉 Completato! Archivi creati con successo
echo 📁 File creati:
echo    - meme-master-genz-game.zip
echo    - tiktok-dance-battle-genz-game.zip
echo    - genz-arcade-games-complete.zip
echo.
echo 🚀 Tutti gli archivi sono pronti per la distribuzione!
pause
