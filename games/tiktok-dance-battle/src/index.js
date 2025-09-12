// TikTok Dance Battle - Hit the Beat!
// Gen Z rhythm game with dance moves and timing challenges

(() => {
    'use strict';

    // Game state
    let gameState = {
        isPlaying: false,
        isPaused: false,
        score: 0,
        streak: 0,
        maxStreak: 0,
        combo: 1,
        energy: 50,
        maxEnergy: 100,
        accuracy: 0,
        totalHits: 0,
        perfectHits: 0,
        goodHits: 0,
        misses: 0,
        currentMove: null,
        moveQueue: [],
        soundEnabled: true,
        gameStartTime: 0,
        lastBeatTime: 0,
        beatInterval: 1000, // 1 second between beats
        moveSpeed: 3, // seconds for move to reach beat line
        timerId: null,
        beatId: null
    };

    // Dance moves with Gen Z names
    const danceMoves = [
        { key: 'up', name: 'Hit It', emoji: '⬆️', energy: 10 },
        { key: 'down', name: 'Drop It', emoji: '⬇️', energy: 15 },
        { key: 'left', name: 'Slide Left', emoji: '⬅️', energy: 12 },
        { key: 'right', name: 'Slide Right', emoji: '➡️', energy: 12 }
    ];

    // Energy levels with Gen Z slang
    const energyLevels = [
        { threshold: 0, label: 'Low Energy 💤', color: '#ff3366' },
        { threshold: 20, label: 'Getting Warmed Up 🔥', color: '#ffaa00' },
        { threshold: 40, label: 'In the Zone 🎯', color: '#00d4ff' },
        { threshold: 60, label: 'Dancing Queen 💃', color: '#00ff88' },
        { threshold: 80, label: 'Main Character ✨', color: '#ff0080' },
        { threshold: 100, label: 'Ultimate Slay 💅', color: '#ff6b35' }
    ];

    // DOM elements
    const elements = {
        gameContainer: document.querySelector('.game-container'),
        dancer: document.getElementById('dancer'),
        moveIndicators: document.getElementById('moveIndicators'),
        beatTarget: document.getElementById('beatTarget'),
        beatIndicator: document.getElementById('beatIndicator'),
        beatLine: document.querySelector('.beat-line'),
        score: document.getElementById('score'),
        streak: document.getElementById('streak'),
        combo: document.getElementById('combo'),
        energyProgress: document.getElementById('energyProgress'),
        energyLabel: document.getElementById('energyLabel'),
        startBtn: document.getElementById('startBtn'),
        pauseBtn: document.getElementById('pauseBtn'),
        soundBtn: document.getElementById('soundBtn'),
        shareBtn: document.getElementById('shareBtn'),
        gameOverModal: document.getElementById('gameOverModal'),
        instructionsModal: document.getElementById('instructionsModal'),
        finalScore: document.getElementById('finalScore'),
        maxStreak: document.getElementById('maxStreak'),
        accuracy: document.getElementById('accuracy'),
        danceLevel: document.getElementById('danceLevel'),
        playAgainBtn: document.getElementById('playAgainBtn'),
        shareScoreBtn: document.getElementById('shareScoreBtn'),
        closeInstructionsBtn: document.getElementById('closeInstructionsBtn'),
        moveItems: document.querySelectorAll('.move-item')
    };

    // Audio system for rhythm game
    class RhythmAudioSystem {
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

            switch (type) {
                case 'beat':
                    oscillator.frequency.setValueAtTime(440, this.context.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(880, this.context.currentTime + 0.1);
                    break;
                case 'perfect':
                    oscillator.frequency.setValueAtTime(800, this.context.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(1200, this.context.currentTime + 0.2);
                    break;
                case 'good':
                    oscillator.frequency.setValueAtTime(600, this.context.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(800, this.context.currentTime + 0.15);
                    break;
                case 'miss':
                    oscillator.frequency.setValueAtTime(200, this.context.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(150, this.context.currentTime + 0.3);
                    break;
                case 'combo':
                    oscillator.frequency.setValueAtTime(400, this.context.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(600, this.context.currentTime + 0.25);
                    break;
                case 'energyUp':
                    oscillator.frequency.setValueAtTime(300, this.context.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(500, this.context.currentTime + 0.2);
                    break;
            }

            gainNode.gain.setValueAtTime(0.1, this.context.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.3);

            oscillator.start(this.context.currentTime);
            oscillator.stop(this.context.currentTime + 0.3);
        }
    }

    const audio = new RhythmAudioSystem();

    // Utility functions
    function getRandomMove() {
        return danceMoves[Math.floor(Math.random() * danceMoves.length)];
    }

    function updateUI() {
        elements.score.textContent = gameState.score;
        elements.streak.textContent = gameState.streak;
        elements.combo.textContent = `x${gameState.combo}`;
        
        // Update energy level
        const currentEnergy = energyLevels.find(level => gameState.energy >= level.threshold) || energyLevels[0];
        elements.energyLabel.textContent = currentEnergy.label;
        elements.energyLabel.style.color = currentEnergy.color;
        elements.energyProgress.style.width = `${gameState.energy}%`;
        elements.energyProgress.style.background = `linear-gradient(90deg, ${currentEnergy.color} 0%, ${energyLevels[energyLevels.length - 1].color} 100%)`;
    }

    function createMoveIndicator(move) {
        const indicator = document.createElement('div');
        indicator.className = 'move-indicator';
        indicator.dataset.move = move.key;
        indicator.textContent = move.emoji;
        indicator.style.animation = `moveSlide ${gameState.moveSpeed}s linear forwards`;
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes moveSlide {
                from { transform: translateX(-100px); opacity: 1; }
                to { transform: translateX(calc(100vw - 100px)); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        return indicator;
    }

    function spawnMove() {
        if (!gameState.isPlaying || gameState.isPaused) return;
        
        const move = getRandomMove();
        const indicator = createMoveIndicator(move);
        
        elements.moveIndicators.appendChild(indicator);
        gameState.moveQueue.push({
            element: indicator,
            move: move,
            spawnTime: Date.now()
        });

        // Remove indicator after animation
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
            removeMoveFromQueue(indicator);
        }, gameState.moveSpeed * 1000);
    }

    function removeMoveFromQueue(indicator) {
        gameState.moveQueue = gameState.moveQueue.filter(item => item.element !== indicator);
    }

    function checkMoveHit(moveKey) {
        if (gameState.moveQueue.length === 0) return false;

        const now = Date.now();
        let bestMatch = null;
        let bestTimeDiff = Infinity;

        // Find the closest move in time
        gameState.moveQueue.forEach(item => {
            const timeDiff = Math.abs(now - (item.spawnTime + gameState.moveSpeed * 1000));
            if (item.move.key === moveKey && timeDiff < bestTimeDiff) {
                bestMatch = item;
                bestTimeDiff = timeDiff;
            }
        });

        if (bestMatch) {
            const hitAccuracy = Math.max(0, 1 - (bestTimeDiff / 500)); // 500ms tolerance
            
            if (hitAccuracy > 0.8) {
                // Perfect hit
                handlePerfectHit(bestMatch);
            } else if (hitAccuracy > 0.5) {
                // Good hit
                handleGoodHit(bestMatch);
            } else {
                // Miss
                handleMiss();
            }

            // Remove from queue
            if (bestMatch.element.parentNode) {
                bestMatch.element.parentNode.removeChild(bestMatch.element);
            }
            removeMoveFromQueue(bestMatch.element);
            
            return true;
        }

        return false;
    }

    function handlePerfectHit(moveItem) {
        gameState.perfectHits++;
        gameState.totalHits++;
        gameState.streak++;
        gameState.maxStreak = Math.max(gameState.maxStreak, gameState.streak);
        gameState.combo = Math.floor(gameState.streak / 5) + 1;
        
        const baseScore = 100;
        const comboBonus = gameState.combo * 20;
        const energyBonus = moveItem.move.energy * 2;
        const score = (baseScore + comboBonus + energyBonus) * gameState.combo;
        
        gameState.score += score;
        gameState.energy = Math.min(gameState.maxEnergy, gameState.energy + moveItem.move.energy);
        
        moveItem.element.classList.add('perfect');
        audio.playSound('perfect');
        
        showComboPopup(`Perfect! +${score}`);
        updateDancerAnimation('perfect');
        
        if (gameState.combo > 1) {
            audio.playSound('combo');
        }
    }

    function handleGoodHit(moveItem) {
        gameState.goodHits++;
        gameState.totalHits++;
        gameState.streak++;
        gameState.maxStreak = Math.max(gameState.maxStreak, gameState.streak);
        gameState.combo = Math.floor(gameState.streak / 5) + 1;
        
        const baseScore = 50;
        const comboBonus = gameState.combo * 10;
        const energyBonus = moveItem.move.energy;
        const score = (baseScore + comboBonus + energyBonus) * gameState.combo;
        
        gameState.score += score;
        gameState.energy = Math.min(gameState.maxEnergy, gameState.energy + moveItem.move.energy);
        
        moveItem.element.classList.add('perfect');
        audio.playSound('good');
        
        showComboPopup(`Good! +${score}`);
        updateDancerAnimation('good');
    }

    function handleMiss() {
        gameState.misses++;
        gameState.streak = 0;
        gameState.combo = 1;
        gameState.energy = Math.max(0, gameState.energy - 5);
        
        audio.playSound('miss');
        showComboPopup('Miss!');
        updateDancerAnimation('miss');
        
        // Check game over
        if (gameState.energy <= 0) {
            endGame();
        }
    }

    function updateDancerAnimation(type) {
        elements.dancer.classList.add('dancing');
        
        setTimeout(() => {
            elements.dancer.classList.remove('dancing');
        }, 500);
    }

    function showComboPopup(text) {
        const popup = document.createElement('div');
        popup.className = 'combo-popup';
        popup.textContent = text;
        document.body.appendChild(popup);

        setTimeout(() => {
            if (popup.parentNode) {
                document.body.removeChild(popup);
            }
        }, 1000);
    }

    function startGame() {
        gameState = {
            isPlaying: true,
            isPaused: false,
            score: 0,
            streak: 0,
            maxStreak: 0,
            combo: 1,
            energy: 50,
            maxEnergy: 100,
            accuracy: 0,
            totalHits: 0,
            perfectHits: 0,
            goodHits: 0,
            misses: 0,
            currentMove: null,
            moveQueue: [],
            soundEnabled: gameState.soundEnabled,
            gameStartTime: Date.now(),
            lastBeatTime: 0,
            beatInterval: 1000,
            moveSpeed: 3,
            timerId: null,
            beatId: null
        };

        // Clear indicators
        elements.moveIndicators.innerHTML = '';
        gameState.moveQueue = [];

        // Update UI
        updateUI();

        // Start beat
        startBeat();

        // Start move spawning
        startMoveSpawning();

        // Update button states
        elements.startBtn.disabled = true;
        elements.pauseBtn.disabled = false;
        elements.pauseBtn.textContent = '⏸️ Pause';

        // Hide instructions
        elements.instructionsModal.classList.add('hidden');
    }

    function startBeat() {
        gameState.beatId = setInterval(() => {
            if (!gameState.isPlaying || gameState.isPaused) return;
            
            audio.playSound('beat');
            elements.beatLine.classList.add('active');
            
            setTimeout(() => {
                elements.beatLine.classList.remove('active');
            }, 200);
            
            gameState.lastBeatTime = Date.now();
        }, gameState.beatInterval);
    }

    function startMoveSpawning() {
        const spawnMoveInterval = () => {
            if (!gameState.isPlaying || gameState.isPaused) return;
            
            spawnMove();
            
            // Randomize next spawn time (1-3 seconds)
            const nextSpawn = Math.random() * 2000 + 1000;
            setTimeout(spawnMoveInterval, nextSpawn);
        };
        
        // Start spawning after 2 seconds
        setTimeout(spawnMoveInterval, 2000);
    }

    function pauseGame() {
        if (gameState.isPaused) {
            gameState.isPaused = false;
            elements.pauseBtn.textContent = '⏸️ Pause';
            startBeat();
        } else {
            gameState.isPaused = true;
            elements.pauseBtn.textContent = '▶️ Resume';
            clearInterval(gameState.beatId);
        }
    }

    function endGame() {
        gameState.isPlaying = false;
        clearInterval(gameState.beatId);
        
        // Calculate accuracy
        gameState.accuracy = gameState.totalHits > 0 ? 
            Math.round((gameState.perfectHits + gameState.goodHits) / gameState.totalHits * 100) : 0;
        
        showGameOverModal();
    }

    function showGameOverModal() {
        elements.finalScore.textContent = gameState.score;
        elements.maxStreak.textContent = gameState.maxStreak;
        elements.accuracy.textContent = `${gameState.accuracy}%`;
        
        const currentEnergy = energyLevels.find(level => gameState.energy >= level.threshold) || energyLevels[0];
        elements.danceLevel.textContent = currentEnergy.label;
        elements.danceLevel.style.color = currentEnergy.color;

        elements.gameOverModal.classList.remove('hidden');
    }

    function resetGame() {
        gameState.isPlaying = false;
        gameState.isPaused = false;
        clearInterval(gameState.beatId);
        
        elements.startBtn.disabled = false;
        elements.pauseBtn.disabled = true;
        elements.pauseBtn.textContent = '⏸️ Pause';
        
        elements.gameOverModal.classList.add('hidden');
        elements.moveIndicators.innerHTML = '';
        gameState.moveQueue = [];
    }

    async function shareScore() {
        const energyLabel = energyLevels.find(level => gameState.energy >= level.threshold)?.label || 'Low Energy';
        const text = `I scored ${gameState.score} in TikTok Dance Battle! ${energyLabel} Can you beat my moves? 🕺✨`;
        const url = window.location.href;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'TikTok Dance Battle - Hit the Beat!',
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

    function handleMoveInput(moveKey) {
        if (!gameState.isPlaying || gameState.isPaused) return;
        
        const hit = checkMoveHit(moveKey);
        
        if (hit) {
            // Visual feedback
            elements.moveItems.forEach(item => {
                if (item.dataset.move === moveKey) {
                    item.classList.add('active');
                    setTimeout(() => {
                        item.classList.remove('active');
                    }, 200);
                }
            });
        }
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

    // Move button listeners
    elements.moveItems.forEach(item => {
        item.addEventListener('click', () => {
            handleMoveInput(item.dataset.move);
        });
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && gameState.isPlaying) {
            pauseGame();
        }
        if (e.key === ' ' && !gameState.isPlaying) {
            e.preventDefault();
            startGame();
        }
        
        // Arrow keys for moves
        const moveMap = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right'
        };
        
        if (moveMap[e.key]) {
            e.preventDefault();
            handleMoveInput(moveMap[e.key]);
        }
    });

    // Initialize
    updateUI();
    elements.soundBtn.textContent = gameState.soundEnabled ? '🔊' : '🔇';

    // Show instructions on first load
    if (!localStorage.getItem('tiktokDance_instructionsShown')) {
        elements.instructionsModal.classList.remove('hidden');
        localStorage.setItem('tiktokDance_instructionsShown', 'true');
    }

    // Prevent context menu on long press
    document.addEventListener('contextmenu', (e) => {
        if (gameState.isPlaying) {
            e.preventDefault();
        }
    });

})();

