# 🎮 Meme Master - The Ultimate Vibe Check

Un mini-gioco Gen Z che mette alla prova la tua conoscenza di meme, slang e trend. Matcha le coppie corrette per costruire combo e raggiungere il massimo livello di vibe! ✨

## 🎯 Tema e Regole

**Tema**: Matching game con estetica Gen Z, meme e slang
**Durata**: 3-5 minuti per partita
**Obiettivo**: Matcha tutte le coppie di meme/slang prima che scada il tempo

### Regole Principali
- 🎯 Matcha le coppie di meme e slang (es. 💅 ↔ slay)
- ⚡ Costruisci combo per punti bonus
- 🔥 Mantieni il vibe alto per sbloccare nuovi livelli
- ⏰ Hai 60 secondi per completare tutte le coppie
- 🧠 Più veloce matchi, più punti ottieni

## 🚀 Requisiti di Sistema

- **Browser**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **JavaScript**: ES6+ supportato
- **Risoluzione**: Ottimizzato per mobile (320px+) e desktop (1920px+)
- **Audio**: Opzionale (Web Audio API)

## 📦 Dipendenze

- **Nessuna dipendenza esterna** - Solo JavaScript vanilla
- **Font**: Inter (Google Fonts) - caricato automaticamente
- **Audio**: Web Audio API nativo del browser

## 🛠️ Installazione e Avvio

### Metodo 1: Apertura Diretta
1. Scarica tutti i file nella cartella `meme-master/`
2. Apri `index.html` nel browser
3. Inizia a giocare! 🎮

### Metodo 2: Server Locale
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

Poi vai su `http://localhost:8000/games/meme-master/`

## 🎮 Controlli

### Desktop
- **Click**: Seleziona carte
- **Spazio**: Avvia partita
- **Escape**: Pausa/Riprendi

### Mobile
- **Tap**: Seleziona carte
- **Swipe**: Non supportato (usa tap)

## 🎨 Caratteristiche Gen Z

### Estetica
- 🌈 Gradienti neon e colori vibranti
- ✨ Animazioni smooth e micro-interazioni
- 🔥 Design glassmorphism e blur effects
- 💅 Typography bold e emoji integration

### Gameplay
- 🧠 Sistema di combo per competizione
- 📱 Condivisione social integrata
- 🎵 Sound effects per feedback immediato
- 📊 Sistema di livelli vibe con slang Gen Z

### Slang e Meme Inclusi
- 💅 slay, 🔥 fire, ✨ vibe, 🫡 respect
- 💀 dead, 🧠 big brain, 🤡 clown, 💯 hundred

## 🏆 Sistema di Punteggio

- **Match Base**: 10 punti
- **Combo Bonus**: +5 punti ogni 3 combo
- **Time Bonus**: +2 punti ogni 10 secondi rimasti
- **Multiplier**: Punti × livello combo attuale
- **Vibe Levels**: 6 livelli da "Lowkey Mid" a "Main Character"

## 🔧 Struttura File

```
meme-master/
├── index.html          # File principale
├── src/
│   ├── index.js        # Logica del gioco
│   └── style.css       # Stili e animazioni
└── README.md           # Questa documentazione
```

## 🐛 Troubleshooting

### Audio non funziona
- Assicurati che il browser supporti Web Audio API
- Controlla che l'audio non sia disabilitato nel browser
- Prova a cliccare prima di iniziare il gioco

### Performance lente
- Chiudi altre tab del browser
- Aggiorna il browser all'ultima versione
- Disabilita estensioni che potrebbero interferire

### Carte non si girano
- Assicurati che JavaScript sia abilitato
- Controlla la console per errori
- Ricarica la pagina

## 🚀 Integrazione Sito Web

### Opzione 1: Iframe
```html
<iframe 
    src="games/meme-master/index.html" 
    width="480" 
    height="600"
    frameborder="0">
</iframe>
```

### Opzione 2: Link Diretto
```html
<a href="games/meme-master/index.html" target="_blank">
    🎮 Play Meme Master
</a>
```

### Opzione 3: Popup Modal
```javascript
// Apri in popup
window.open('games/meme-master/index.html', 'memeMaster', 
    'width=480,height=600,scrollbars=no,resizable=no');
```

## 📱 Responsive Design

- **Mobile First**: Ottimizzato per smartphone
- **Breakpoints**: 320px, 480px, 768px, 1024px
- **Touch Friendly**: Bottoni e carte ottimizzati per touch
- **Viewport**: Meta tag per scaling corretto

## 🎵 Audio System

- **Web Audio API**: Generazione suoni in tempo reale
- **Sound Effects**: Match, combo, wrong, vibe up
- **Toggle**: Pulsante per abilitare/disabilitare audio
- **Fallback**: Funziona anche senza audio

## 🔄 Salvataggio Progresso

- **LocalStorage**: Salva migliori punteggi
- **Session**: Mantiene stato durante la sessione
- **Privacy**: Nessun dato inviato a server esterni

## 🎯 Perché è Accattivante per la Gen Z

1. **Estetica Trend**: Design neon, glassmorphism, micro-animazioni
2. **Linguaggio Relatable**: Slang e meme che la Gen Z usa quotidianamente
3. **Competizione Social**: Sistema di condivisione e leaderboard
4. **Gameplay Rapido**: Sessioni brevi perfette per l'attenzione Gen Z
5. **Feedback Immediato**: Suoni, animazioni e popup per engagement
6. **Mobile First**: Ottimizzato per l'uso su smartphone
7. **Memorabile**: Elementi visivi e sonori che rimangono impressi

## 📈 Metriche di Successo

- **Tempo di Sessione**: 3-5 minuti target
- **Rigiocabilità**: Alta grazie a combo e leaderboard
- **Condivisione**: Integrazione social per viralità
- **Accessibilità**: Funziona su tutti i dispositivi moderni

---

**Creato per la Gen Z** 🫡 | **Stay Based** 🔥 | **No Cap** 💯
