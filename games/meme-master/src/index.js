// Meme Master - The Ultimate Vibe Check
// Gen Z matching game with memes, slang, and trend-driven gameplay

(() => {
    'use strict';

    // Game state
    let gameState = {
        isPlaying: false,
        isPaused: false,
        score: 0,
        combo: 1,
        maxCombo: 1,
        timeLeft: 60,
        vibeLevel: 0,
        flippedCards: [],
        matchedPairs: 0,
        totalPairs: 8,
        soundEnabled: true,
        gameStartTime: 0
    };

    // Gen Z meme pairs - keeping it fresh and relatable
    const memePairs = [
        { id: 1, content: '💅', match: 'slay' },
        { id: 2, content: 'slay', match: '💅' },
        { id: 3, content: '🔥', match: 'fire' },
        { id: 4, content: 'fire', match: '🔥' },
        { id: 5, content: '✨', match: 'vibe' },
        { id: 6, content: 'vibe', match: '✨' },
        { id: 7, content: '🫡', match: 'respect' },
        { id: 8, content: 'respect', match: '🫡' },
        { id: 9, content: '💀', match: 'dead' },
        { id: 10, content: 'dead', match: '💀' },
        { id: 11, content: '🧠', match: 'big brain' },
        { id: 12, content: 'big brain', match: '🧠' },
        { id: 13, content: '🤡', match: 'clown' },
        { id: 14, content: 'clown', match: '🤡' },
        { id: 15, content: '💯', match: 'hundred' },
        { id: 16, content: 'hundred', match: '💯' }
    ];

    // Vibe levels with Gen Z slang
    const vibeLevels = [
        { threshold: 0, label: 'Lowkey Mid 💀', color: '#ff3366' },
        { threshold: 20, label: 'Not Bad 😌', color: '#ffaa00' },
        { threshold: 40, label: 'Valid 🫡', color: '#00d4ff' },
        { threshold: 60, label: 'Slaying 💅', color: '#00ff88' },
        { threshold: 80, label: 'Ultra Based 🔥', color: '#ff0080' },
        { threshold: 100, label: 'Main Character ✨', color: '#ff6b35' }
    ];

    // DOM elements
    const elements = {
        gameGrid: document.getElementById('gameGrid'),
        score: document.getElementById('score'),
        combo: document.getElementById('combo'),
        timer: document.getElementById('timer'),
        vibeProgress: document.getElementById('vibeProgress'),
        vibeLabel: document.getElementById('vibeLabel'),
        startBtn: document.getElementById('startBtn'),
        pauseBtn: document.getElementById('pauseBtn'),
        soundBtn: document.getElementById('soundBtn'),
        shareBtn: document.getElementById('shareBtn'),
        gameOverModal: document.getElementById('gameOverModal'),
        instructionsModal: document.getElementById('instructionsModal'),
        finalScore: document.getElementById('finalScore'),
        maxCombo: document.getElementById('maxCombo'),
        finalVibe: document.getElementById('finalVibe'),
        playAgainBtn: document.getElementById('playAgainBtn'),
        shareScoreBtn: document.getElementById('shareScoreBtn'),
        closeInstructionsBtn: document.getElementById('closeInstructionsBtn')
    };

    // Audio system for Gen Z sound effects
    class AudioSystem {
        constructor() {
            this.context = null;
            this.init();
        }

        init() {
            try {
                this.context = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.log('Audio not supported');
            }
        }

        playSound(type) {
            if (!gameState.soundEnabled || !this.context) return;

            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.context.destination);

            // Different sounds for different actions
            switch (type) {
                case 'match':
                    oscillator.frequency.setValueAtTime(800, this.context.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(1200, this.context.currentTime + 0.1);
                    break;
                case 'combo':
                    oscillator.frequency.setValueAtTime(600, this.context.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(1000, this.context.currentTime + 0.2);
                    break;
                case 'wrong':
                    oscillator.frequency.setValueAtTime(200, this.context.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(150, this.context.currentTime + 0.3);
                    break;
                case 'vibeUp':
                    oscillator.frequency.setValueAtTime(400, this.context.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(800, this.context.currentTime + 0.15);
                    break;
            }

            gainNode.gain.setValueAtTime(0.1, this.context.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.3);

            oscillator.start(this.context.currentTime);
            oscillator.stop(this.context.currentTime + 0.3);
        }
    }

    const audio = new AudioSystem();

    // Utility functions
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function getRandomPairs(count) {
        const shuffled = shuffleArray(memePairs);
        return shuffled.slice(0, count * 2);
    }

    function updateUI() {
        elements.score.textContent = gameState.score;
        elements.combo.textContent = `x${gameState.combo}`;
        elements.timer.textContent = gameState.timeLeft;
        
        // Update vibe level
        const currentVibe = vibeLevels.find(vibe => gameState.vibeLevel >= vibe.threshold) || vibeLevels[0];
        elements.vibeLabel.textContent = currentVibe.label;
        elements.vibeLabel.style.color = currentVibe.color;
        elements.vibeProgress.style.width = `${Math.min(gameState.vibeLevel, 100)}%`;
        elements.vibeProgress.style.background = `linear-gradient(90deg, ${currentVibe.color} 0%, ${vibeLevels[vibeLevels.length - 1].color} 100%)`;
    }

    function createCard(pair, index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.pairId = pair.id;
        card.dataset.index = index;
        
        const content = document.createElement('div');
        content.className = 'card-content';
        content.textContent = pair.content;
        
        card.appendChild(content);
        
        card.addEventListener('click', () => handleCardClick(card));
        
        return card;
    }

    function handleCardClick(card) {
        if (!gameState.isPlaying || gameState.isPaused) return;
        if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
        if (gameState.flippedCards.length >= 2) return;

        // Flip card
        card.classList.add('flipped');
        gameState.flippedCards.push(card);

        // Check for match when two cards are flipped
        if (gameState.flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    function checkMatch() {
        const [card1, card2] = gameState.flippedCards;
        const pair1Id = parseInt(card1.dataset.pairId);
        const pair2Id = parseInt(card2.dataset.pairId);

        // Find the matching pair
        const pair1 = memePairs.find(p => p.id === pair1Id);
        const pair2 = memePairs.find(p => p.id === pair2Id);

        if (pair1 && pair2 && pair1.match === pair2.content) {
            // Match found!
            card1.classList.add('matched');
            card2.classList.add('matched');
            
            gameState.matchedPairs++;
            gameState.combo++;
            gameState.maxCombo = Math.max(gameState.maxCombo, gameState.combo);
            
            // Calculate score with combo multiplier
            const baseScore = 10;
            const comboBonus = Math.floor(gameState.combo / 3) * 5;
            const timeBonus = Math.floor(gameState.timeLeft / 10) * 2;
            const score = (baseScore + comboBonus + timeBonus) * gameState.combo;
            
            gameState.score += score;
            gameState.vibeLevel = Math.min(100, gameState.vibeLevel + 5);

            // Show combo popup
            showComboPopup(score);
            audio.playSound('match');

            // Check for combo
            if (gameState.combo > 1) {
                audio.playSound('combo');
            }

            // Check for vibe level up
            const newVibeLevel = vibeLevels.find(vibe => gameState.vibeLevel >= vibe.threshold);
            const oldVibeLevel = vibeLevels.find(vibe => (gameState.vibeLevel - 5) >= vibe.threshold);
            if (newVibeLevel && newVibeLevel !== oldVibeLevel) {
                audio.playSound('vibeUp');
                showVibeUpPopup(newVibeLevel.label);
            }

            // Check win condition
            if (gameState.matchedPairs === gameState.totalPairs) {
                setTimeout(winGame, 300);
            }
        } else {
            // No match
            card1.classList.add('wrong');
            card2.classList.add('wrong');
            
            setTimeout(() => {
                card1.classList.remove('flipped', 'wrong');
                card2.classList.remove('flipped', 'wrong');
            }, 1000);
            
            gameState.combo = 1;
            gameState.vibeLevel = Math.max(0, gameState.vibeLevel - 2);
            audio.playSound('wrong');
        }

        gameState.flippedCards = [];
        updateUI();
    }

    function showComboPopup(score) {
        const popup = document.createElement('div');
        popup.className = 'combo-popup';
        popup.textContent = `+${score}`;
        document.body.appendChild(popup);

        setTimeout(() => {
            document.body.removeChild(popup);
        }, 1000);
    }

    function showVibeUpPopup(vibeLabel) {
        const popup = document.createElement('div');
        popup.className = 'combo-popup';
        popup.textContent = vibeLabel;
        popup.style.color = '#ff6b35';
        document.body.appendChild(popup);

        setTimeout(() => {
            document.body.removeChild(popup);
        }, 1500);
    }

    function startGame() {
        gameState = {
            isPlaying: true,
            isPaused: false,
            score: 0,
            combo: 1,
            maxCombo: 1,
            timeLeft: 60,
            vibeLevel: 0,
            flippedCards: [],
            matchedPairs: 0,
            totalPairs: 8,
            soundEnabled: gameState.soundEnabled,
            gameStartTime: Date.now()
        };

        // Clear grid
        elements.gameGrid.innerHTML = '';

        // Create cards
        const pairs = getRandomPairs(gameState.totalPairs);
        pairs.forEach((pair, index) => {
            const card = createCard(pair, index);
            elements.gameGrid.appendChild(card);
        });

        // Update UI
        updateUI();

        // Start timer
        startTimer();

        // Update button states
        elements.startBtn.disabled = true;
        elements.pauseBtn.disabled = false;
        elements.pauseBtn.textContent = '⏸️ Pause';

        // Hide instructions
        elements.instructionsModal.classList.add('hidden');
    }

    function pauseGame() {
        if (gameState.isPaused) {
            gameState.isPaused = false;
            elements.pauseBtn.textContent = '⏸️ Pause';
            startTimer();
        } else {
            gameState.isPaused = true;
            elements.pauseBtn.textContent = '▶️ Resume';
            clearInterval(gameState.timerId);
        }
    }

    function startTimer() {
        clearInterval(gameState.timerId);
        gameState.timerId = setInterval(() => {
            if (!gameState.isPlaying || gameState.isPaused) return;
            
            gameState.timeLeft--;
            updateUI();

            if (gameState.timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function winGame() {
        gameState.isPlaying = false;
        clearInterval(gameState.timerId);
        
        // Bonus points for time remaining
        const timeBonus = gameState.timeLeft * 5;
        gameState.score += timeBonus;
        
        showGameOverModal(true);
    }

    function endGame() {
        gameState.isPlaying = false;
        clearInterval(gameState.timerId);
        showGameOverModal(false);
    }

    function showGameOverModal(won) {
        const title = won ? 'You Slayed! 🔥' : 'Game Over! 💀';
        document.getElementById('gameOverTitle').textContent = title;
        
        elements.finalScore.textContent = gameState.score;
        elements.maxCombo.textContent = `x${gameState.maxCombo}`;
        
        const currentVibe = vibeLevels.find(vibe => gameState.vibeLevel >= vibe.threshold) || vibeLevels[0];
        elements.finalVibe.textContent = currentVibe.label;
        elements.finalVibe.style.color = currentVibe.color;

        elements.gameOverModal.classList.remove('hidden');
    }

    function resetGame() {
        gameState.isPlaying = false;
        gameState.isPaused = false;
        clearInterval(gameState.timerId);
        
        elements.startBtn.disabled = false;
        elements.pauseBtn.disabled = true;
        elements.pauseBtn.textContent = '⏸️ Pause';
        
        elements.gameOverModal.classList.add('hidden');
    }

    async function shareScore() {
        const vibeLabel = vibeLevels.find(vibe => gameState.vibeLevel >= vibe.threshold)?.label || 'Mid';
        const text = `I scored ${gameState.score} in Meme Master! ${vibeLabel} Can you beat my vibe? 🧠✨`;
        const url = window.location.href;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Meme Master - The Ultimate Vibe Check',
                    text: text,
                    url: url
                });
            } else {
                await navigator.clipboard.writeText(`${text} ${url}`);
                alert('Link copiato! 📱✨');
            }
        } catch (error) {
            console.log('Share failed:', error);
        }
    }

    function toggleSound() {
        gameState.soundEnabled = !gameState.soundEnabled;
        elements.soundBtn.textContent = gameState.soundEnabled ? '🔊' : '🔇';
        elements.soundBtn.style.opacity = gameState.soundEnabled ? '1' : '0.5';
    }

    // Event listeners
    elements.startBtn.addEventListener('click', startGame);
    elements.pauseBtn.addEventListener('click', pauseGame);
    elements.soundBtn.addEventListener('click', toggleSound);
    elements.shareBtn.addEventListener('click', shareScore);
    elements.playAgainBtn.addEventListener('click', () => {
        elements.gameOverModal.classList.add('hidden');
        startGame();
    });
    elements.shareScoreBtn.addEventListener('click', shareScore);
    elements.closeInstructionsBtn.addEventListener('click', () => {
        elements.instructionsModal.classList.add('hidden');
    });

    // Initialize
    updateUI();
    elements.soundBtn.textContent = gameState.soundEnabled ? '🔊' : '🔇';

    // Show instructions on first load
    if (!localStorage.getItem('memeMaster_instructionsShown')) {
        elements.instructionsModal.classList.remove('hidden');
        localStorage.setItem('memeMaster_instructionsShown', 'true');
    }

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && gameState.isPlaying) {
            pauseGame();
        }
        if (e.key === ' ' && !gameState.isPlaying) {
            e.preventDefault();
            startGame();
        }
    });

    // Prevent context menu on long press
    document.addEventListener('contextmenu', (e) => {
        if (gameState.isPlaying) {
            e.preventDefault();
        }
    });

})();
