#!/usr/bin/env python3
"""
Script per creare archivi ZIP dei giochi Gen Z
Crea file ZIP pronti per la distribuzione
"""

import os
import zipfile
import shutil
from datetime import datetime

def create_game_zip(game_folder, output_name):
    """Crea un archivio ZIP per un gioco"""
    if not os.path.exists(game_folder):
        print(f"❌ Cartella {game_folder} non trovata!")
        return False
    
    zip_name = f"{output_name}.zip"
    
    try:
        with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(game_folder):
                for file in files:
                    file_path = os.path.join(root, file)
                    arc_path = os.path.relpath(file_path, game_folder)
                    zipf.write(file_path, arc_path)
        
        print(f"✅ Creato {zip_name} con successo!")
        return True
    except Exception as e:
        print(f"❌ Errore nella creazione di {zip_name}: {e}")
        return False

def main():
    """Funzione principale"""
    print("🎮 Creazione archivi ZIP per i giochi Gen Z")
    print("=" * 50)
    
    # Lista dei giochi da comprimere
    games = [
        {
            "folder": "games/meme-master",
            "name": "meme-master-genz-game"
        },
        {
            "folder": "games/tiktok-dance-battle", 
            "name": "tiktok-dance-battle-genz-game"
        }
    ]
    
    success_count = 0
    
    for game in games:
        print(f"\n📦 Comprimendo {game['folder']}...")
        if create_game_zip(game['folder'], game['name']):
            success_count += 1
    
    print(f"\n🎉 Completato! {success_count}/{len(games)} archivi creati con successo")
    
    # Crea anche un archivio con tutti i giochi
    print(f"\n📦 Creando archivio completo...")
    all_games_zip = "genz-arcade-games-complete.zip"
    
    try:
        with zipfile.ZipFile(all_games_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
            # Aggiungi tutti i giochi
            for game in games:
                if os.path.exists(game['folder']):
                    for root, dirs, files in os.walk(game['folder']):
                        for file in files:
                            file_path = os.path.join(root, file)
                            arc_path = os.path.relpath(file_path, "games")
                            zipf.write(file_path, arc_path)
            
            # Aggiungi file di configurazione
            if os.path.exists("games/games.json"):
                zipf.write("games/games.json", "games.json")
            
            # Aggiungi README principale
            if os.path.exists("README.md"):
                zipf.write("README.md", "README.md")
        
        print(f"✅ Creato {all_games_zip} con successo!")
        success_count += 1
    except Exception as e:
        print(f"❌ Errore nella creazione dell'archivio completo: {e}")
    
    print(f"\n🚀 Tutti gli archivi sono pronti per la distribuzione!")
    print(f"📁 File creati:")
    for game in games:
        print(f"   - {game['name']}.zip")
    print(f"   - {all_games_zip}")

if __name__ == "__main__":
    main()
