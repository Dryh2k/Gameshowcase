# 🕺 TikTok Dance Battle — Hit the Beat!

Un rhythm game Gen Z che mette alla prova i tuoi riflessi e il tuo senso del ritmo. Colpisci i dance moves al momento giusto per costruire combo e raggiungere il massimo livello di energia! 🎵

## 🎯 Tema e Regole

**Tema**: Rhythm game con dance moves e timing challenges
**Durata**: 4-7 minuti per partita
**Obiettivo**: Colpisci i dance moves al momento giusto per mantenere alta l'energia

### Regole Principali
- 🎵 Colpisci i dance moves quando raggiungono la beat line
- ⚡ Costruisci streak per punti bonus e energia
- 🔥 Timing perfetto = più punti e energia
- 💃 Usa le frecce o i pulsanti touch
- ⚡ Mantieni l'energia sopra lo zero per continuare

## 🚀 Requisiti di Sistema

- **Browser**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **JavaScript**: ES6+ supportato
- **Risoluzione**: Ottimizzato per mobile (320px+) e desktop (1920px+)
- **Audio**: Opzionale (Web Audio API)

## 📦 Dipendenze

- **Nessuna dipendenza esterna** - Solo JavaScript vanilla
- **Font**: Inter + Fredoka One (Google Fonts) - caricati automaticamente
- **Audio**: Web Audio API nativo del browser

## 🛠️ Installazione e Avvio

### Metodo 1: Apertura Diretta
1. Scarica tutti i file nella cartella `tiktok-dance-battle/`
2. Apri `index.html` nel browser
3. Inizia a ballare! 🕺

### Metodo 2: Server Locale
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

Poi vai su `http://localhost:8000/games/tiktok-dance-battle/`

## 🎮 Controlli

### Desktop
- **Frecce**: ↑ Hit It, ↓ Drop It, ← Slide Left, → Slide Right
- **Spazio**: Avvia partita
- **Escape**: Pausa/Riprendi

### Mobile
- **Tap**: Usa i pulsanti touch per i dance moves
- **Swipe**: Non supportato (usa tap)

## 🎨 Caratteristiche Gen Z

### Estetica
- 🌈 Gradienti neon e colori vibranti
- ✨ Animazioni fluide e micro-interazioni
- 🔥 Design glassmorphism e blur effects
- 💃 Dancer animato con emoji
- 🎵 Beat line pulsante e effetti visivi

### Gameplay
- 🧠 Sistema di timing preciso per competizione
- 📱 Condivisione social integrata
- 🎵 Sound effects per feedback immediato
- 📊 Sistema di livelli energia con slang Gen Z
- ⚡ Combo system per punti bonus

### Dance Moves Inclusi
- ⬆️ Hit It - Move classico per energia base
- ⬇️ Drop It - Move potente per energia extra
- ⬅️ Slide Left - Move fluido per stile
- ➡️ Slide Right - Move fluido per stile

## 🏆 Sistema di Punteggio

- **Perfect Hit**: 100 punti + combo bonus + energia bonus
- **Good Hit**: 50 punti + combo bonus + energia bonus
- **Combo Bonus**: +20 punti ogni 5 streak
- **Energy Bonus**: Punti extra basati sul tipo di move
- **Multiplier**: Punti × livello combo attuale
- **Energy Levels**: 6 livelli da "Low Energy" a "Ultimate Slay"

## 🔧 Struttura File

```
tiktok-dance-battle/
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

### Moves non rispondono
- Assicurati che JavaScript sia abilitato
- Controlla la console per errori
- Ricarica la pagina

### Timing impreciso
- Il gioco è ottimizzato per 60fps
- Chiudi altre applicazioni per migliori performance
- Usa un browser moderno per il miglior timing

## 🚀 Integrazione Sito Web

### Opzione 1: Iframe
```html
<iframe 
    src="games/tiktok-dance-battle/index.html" 
    width="480" 
    height="600"
    frameborder="0">
</iframe>
```

### Opzione 2: Link Diretto
```html
<a href="games/tiktok-dance-battle/index.html" target="_blank">
    🕺 Play TikTok Dance Battle
</a>
```

### Opzione 3: Popup Modal
```javascript
// Apri in popup
window.open('games/tiktok-dance-battle/index.html', 'tiktokDance', 
    'width=480,height=600,scrollbars=no,resizable=no');
```

## 📱 Responsive Design

- **Mobile First**: Ottimizzato per smartphone
- **Breakpoints**: 320px, 480px, 768px, 1024px
- **Touch Friendly**: Bottoni e controlli ottimizzati per touch
- **Viewport**: Meta tag per scaling corretto

## 🎵 Audio System

- **Web Audio API**: Generazione suoni in tempo reale
- **Sound Effects**: Beat, perfect, good, miss, combo, energy up
- **Toggle**: Pulsante per abilitare/disabilitare audio
- **Fallback**: Funziona anche senza audio

## 🔄 Salvataggio Progresso

- **LocalStorage**: Salva migliori punteggi
- **Session**: Mantiene stato durante la sessione
- **Privacy**: Nessun dato inviato a server esterni

## 🎯 Perché è Accattivante per la Gen Z

1. **Estetica Trend**: Design neon, glassmorphism, micro-animazioni
2. **Rhythm Game**: Genere popolare tra la Gen Z (Dance Dance Revolution, Just Dance)
3. **Competizione Social**: Sistema di condivisione e leaderboard
4. **Gameplay Rapido**: Sessioni brevi perfette per l'attenzione Gen Z
5. **Feedback Immediato**: Suoni, animazioni e popup per engagement
6. **Mobile First**: Ottimizzato per l'uso su smartphone
7. **Memorabile**: Elementi visivi e sonori che rimangono impressi
8. **TikTok Vibes**: Estetica e meccaniche ispirate a TikTok

## 📈 Metriche di Successo

- **Tempo di Sessione**: 4-7 minuti target
- **Rigiocabilità**: Alta grazie a combo e leaderboard
- **Condivisione**: Integrazione social per viralità
- **Accessibilità**: Funziona su tutti i dispositivi moderni
- **Engagement**: Sistema di energia per mantenere l'attenzione

## 🎮 Meccaniche di Gioco

### Timing System
- **Perfect Hit**: Timing entro 200ms = massimi punti
- **Good Hit**: Timing entro 500ms = punti buoni
- **Miss**: Timing oltre 500ms = perdita energia

### Energy System
- **Base Energy**: 50 punti all'inizio
- **Energy Gain**: +10-15 per hit (dipende dal move)
- **Energy Loss**: -5 per miss
- **Game Over**: Quando energia raggiunge 0

### Combo System
- **Streak**: Contatore di hit consecutivi
- **Combo**: +1 ogni 5 streak
- **Multiplier**: Punti × livello combo
- **Reset**: Combo si resetta a 0 per miss

---

**Creato per la Gen Z** 🫡 | **Stay Slaying** 💅 | **No Cap** 💯

