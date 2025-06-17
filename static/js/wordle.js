document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const messageDiv = document.getElementById('message');
    const resetButton = document.getElementById('reset');
    const keys = document.querySelectorAll('.key');
    
    // Expanded word list
    const wordList = [
        'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ADAPT', 'ADMIT', 'ADOPT', 'ADULT', 
        'AFTER', 'AGAIN', 'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 
        'ALIKE', 'ALIVE', 'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGER',
        'ANGLE', 'ANGRY', 'ANIMAL', 'APART', 'APPLE', 'APPLY', 'ARISE', 'ARMED',
        'ARRAY', 'ASIDE', 'ASSET', 'AUDIO', 'AWAIT', 'AWARD', 'AWARE', 'AWFUL',
        'BADLY', 'BAKER', 'BASES', 'BASIC', 'BASIS', 'BEACH', 'BEGIN', 'BEING',
        'BELOW', 'BENCH', 'BIRTH', 'BLACK', 'BLAME', 'BLIND', 'BLOCK', 'BLOOD',
        'BOARD', 'BOOST', 'BRAIN', 'BRAND', 'BREAD', 'BREAK', 'BRICK', 'BRING',
        'BROAD', 'BROWN', 'BRUSH', 'BUI LD', 'BUILT', 'BUYER', 'CABLE', 'CAREFUL',
        'CAUSE', 'CHAIN', 'CHAIR', 'CHART', 'CHASE', 'CHEAP', 'CHECK', 'CHEST',
        'CHIEF', 'CHILD', 'CIVIL', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLIMB',
        'CLOCK', 'CLOSE', 'COACH', 'COAST', 'COURT', 'COVER', 'CRASH', 'CRAZY',
        'CREAM', 'CRIME', 'CROSS', 'CROWD', 'CROWN', 'CURVE', 'DAILY', 'DANCE',
        'DEATH', 'DELAY', 'DEPTH', 'DIRTY', 'DONOR', 'DOUBT', 'DOZEN', 'DRAFT',
        'DRAMA', 'DREAM', 'DRESS', 'DRINK', 'DRIVE', 'DUTY', 'EARLY', 'EARTH',
        'EIGHT', 'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL',
        'ERROR', 'ESSAY', 'EVENT', 'EVERY', 'EXACT', 'EXIST', 'EXTRA', 'FAITH',
        'FALSE', 'FAULT', 'FAVOR', 'FIBER', 'FIELD', 'FIFTH', 'FIFTY', 'FIGHT',
        'FINAL', 'FIRST', 'FIXED', 'FLASH', 'FLEET', 'FLOOR', 'FLUID', 'FOCUS',
        'FORCE', 'FORTH', 'FORTY', 'FRAME', 'FRANK', 'FRESH', 'FRONT', 'FRUIT',
        'FULLY', 'FUNNY', 'GIANT', 'GIVEN', 'GLASS', 'GLOBE', 'GRADE', 'GRAND',
        'GRANT', 'GRASS', 'GREAT', 'GREEN', 'GROSS', 'GROUP', 'GROWN', 'GUARD',
        'GUEST', 'GUIDE', 'HAPPY', 'HEART', 'HEAVY', 'HONEY', 'HORSE', 'HOTEL',
        'HOUSE', 'HUMAN', 'IDEAL', 'IMAGE', 'IMPLY', 'INNER', 'INPUT', 'ISSUE',
        'JUICE', 'JOINT', 'JUDGE', 'KNIFE', 'KNOCK', 'LABEL', 'LARGE', 'LASER',
        'LATER', 'LAUGH', 'LAYER', 'LEARN', 'LEAST', 'LEAVE', 'LEGAL', 'LEVEL',
        'LIGHT', 'LIMIT', 'LOCAL', 'LOGIC', 'LOOSE', 'LOVER', 'LOWER', 'LUCKY',
        'LUNCH', 'MAJOR', 'MAKER', 'MARCH', 'MARRY', 'MATCH', 'MAYBE', 'MEDIA',
        'METAL', 'MIGHT', 'MINOR', 'MODEL', 'MONEY', 'MONTH', 'MOTOR', 'MOUNT',
        'MOUSE', 'MOUTH', 'MOVIE', 'MUSIC', 'NEEDS', 'NEVER', 'NIGHT', 'NOISE',
        'NORTH', 'OCCUR', 'OCEAN', 'OFFER', 'OFTEN', 'ORDER', 'OTHER', 'OUGHT',
        'PAINT', 'PANEL', 'PAPER', 'PARTY', 'PEACE', 'PHASE', 'PHONE', 'PIANO',
        'PIECE', 'PILOT', 'PITCH', 'PLACE', 'PLAIN', 'PLANE', 'PLANT', 'PLATE',
        'POINT', 'POUND', 'POWER', 'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRIZE',
        'PROOF', 'PROUD', 'PROVE', 'QUEEN', 'QUICK', 'QUIET', 'QUITE', 'RADIO',
        'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH', 'REACT', 'READY', 'REFER',
        'RIGHT', 'RIVER', 'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL', 'SCALE',
        'SCENE', 'SCOPE', 'SCORE', 'SENSE', 'SERVE', 'SEVEN', 'SHALL', 'SHAPE',
        'SHARE', 'SHARP', 'SHEEP', 'SHEET', 'SHIFT', 'SHINE', 'SHIRT', 'SHOCK',
        'SHOOT', 'SHORT', 'SHOWN', 'SIGHT', 'SINCE', 'SIXTH', 'SIXTY', 'SIZED',
        'SKILL', 'SLEEP', 'SLIDE', 'SMALL', 'SMART', 'SMILE', 'SMOKE', 'SOLAR',
        'SOLID', 'SOLVE', 'SORRY', 'SOUND', 'SOUTH', 'SPACE', 'SPARE', 'SPEAK',
        'SPEED', 'SPEND', 'SPENT', 'SPLIT', 'SPOKE', 'SPORT', 'STAFF', 'STAGE',
        'STAND', 'START', 'STATE', 'STEAM', 'STEEL', 'STICK', 'STILL', 'STOCK',
        'STONE', 'STOOD', 'STORE', 'STORM', 'STORY', 'STRIP', 'STUCK', 'STUDY',
        'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'TABLE', 'TAKEN',
        'TASTE', 'TEACH', 'TEETH', 'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE',
        'THICK', 'THING', 'THINK', 'THIRD', 'THOSE', 'THREE', 'THROW', 'TIGHT',
        'TIMER', 'TITLE', 'TODAY', 'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH', 'TOWER',
        'TRACK', 'TRADE', 'TRAIN', 'TREAT', 'TREND', 'TRIAL', 'TRIED', 'TRIBE',
        'TRUCK', 'TRULY', 'TRUST', 'TRUTH', 'TWICE', 'UNDER', 'UNION', 'UNITY',
        'UNTIL', 'UPPER', 'UPSET', 'URBAN', 'USAGE', 'USUAL', 'VALID', 'VALUE',
        'VIDEO', 'VIRUS', 'VISIT', 'VITAL', 'VOICE', 'VOTER', 'WASTE', 'WATCH',
        'WATER', 'WHEEL', 'WHERE', 'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE',
        'WOMAN', 'WORLD', 'WORRY', 'WORSE', 'WORST', 'WORTH', 'WOULD', 'WOUND',
        'WRITE', 'WRONG', 'WROTE', 'YIELD', 'YOUNG', 'YOUTH'
    ];
    
    const WORD_LENGTH = 5;
    const MAX_ATTEMPTS = 6;
    
    let targetWord = wordList[Math.floor(Math.random() * wordList.length)];
    let currentAttempt = 0;
    let currentGuess = '';
    let gameOver = false;
    
    // Initialize the board
    function initBoard() {
        board.innerHTML = '';
        for (let i = 0; i < MAX_ATTEMPTS; i++) {
            const row = document.createElement('div');
            row.className = 'wordle-row';
            for (let j = 0; j < WORD_LENGTH; j++) {
                const tile = document.createElement('div');
                tile.className = 'wordle-tile';
                tile.dataset.row = i;
                tile.dataset.col = j;
                row.appendChild(tile);
            }
            board.appendChild(row);
        }
    }
    
    // Update the board with current guess
    function updateBoard() {
        const row = board.children[currentAttempt];
        for (let i = 0; i < WORD_LENGTH; i++) {
            const tile = row.children[i];
            if (i < currentGuess.length) {
                tile.textContent = currentGuess[i];
                tile.classList.add('filled');
            } else {
                tile.textContent = '';
                tile.classList.remove('filled');
            }
        }
    }
    
    // Submit the current guess
    function submitGuess() {
        if (currentGuess.length !== WORD_LENGTH) {
            showMessage('Word must be 5 letters');
            return;
        }
        
        if (!wordList.includes(currentGuess)) {
            showMessage('Not in word list');
            return;
        }
        
        const row = board.children[currentAttempt];
        const targetLetters = targetWord.split('');
        const guessLetters = currentGuess.split('');
        
        // First pass: mark correct letters
        for (let i = 0; i < WORD_LENGTH; i++) {
            const tile = row.children[i];
            if (guessLetters[i] === targetLetters[i]) {
                tile.classList.add('correct');
                updateKeyColor(guessLetters[i], 'correct');
                targetLetters[i] = null; // Mark as used
            }
        }
        
        // Second pass: mark present letters
        for (let i = 0; i < WORD_LENGTH; i++) {
            const tile = row.children[i];
            if (tile.classList.contains('correct')) continue;
            
            const index = targetLetters.indexOf(guessLetters[i]);
            if (index !== -1) {
                tile.classList.add('present');
                updateKeyColor(guessLetters[i], 'present');
                targetLetters[index] = null; // Mark as used
            } else {
                tile.classList.add('absent');
                updateKeyColor(guessLetters[i], 'absent');
            }
        }
        
        // Check for win
        if (currentGuess === targetWord) {
            showMessage('You won!', 'success');
            gameOver = true;
            return;
        }
        
        // Move to next attempt
        currentAttempt++;
        currentGuess = '';
        
        // Check for game over
        if (currentAttempt === MAX_ATTEMPTS) {
            showMessage(`Game over! The word was ${targetWord}`, 'error');
            gameOver = true;
        }
    }
    
    // Update keyboard key colors
    function updateKeyColor(letter, state) {
        const key = document.querySelector(`.key[data-key="${letter}"]`);
        if (!key) return;
        
        // Don't override correct with present or absent
        if (key.classList.contains('correct')) return;
        
        // Don't override present with absent
        if (state === 'absent' && key.classList.contains('present')) return;
        
        key.classList.remove('correct', 'present', 'absent');
        key.classList.add(state);
    }
    
    // Show message to user
    function showMessage(text, type = 'error') {
        messageDiv.textContent = text;
        messageDiv.style.color = type === 'error' ? 'red' : 'green';
    }
    
    // Reset the game
    function resetGame() {
        targetWord = wordList[Math.floor(Math.random() * wordList.length)];
        currentAttempt = 0;
        currentGuess = '';
        gameOver = false;
        messageDiv.textContent = '';
        
        initBoard();
        
        // Reset keyboard colors
        keys.forEach(key => {
            key.classList.remove('correct', 'present', 'absent');
        });
    }
    
    // Handle keyboard input
    function handleKeyPress(key) {
        if (gameOver) return;
        
        if (key === 'ENTER') {
            submitGuess();
        } else if (key === 'BACKSPACE') {
            if (currentGuess.length > 0) {
                currentGuess = currentGuess.slice(0, -1);
                updateBoard();
            }
        } else if (/^[A-Z]$/.test(key)) {
            if (currentGuess.length < WORD_LENGTH) {
                currentGuess += key;
                updateBoard();
            }
        }
    }
    
    // Event listeners
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleKeyPress('ENTER');
        } else if (e.key === 'Backspace') {
            handleKeyPress('BACKSPACE');
        } else if (/^[a-zA-Z]$/.test(e.key)) {
            handleKeyPress(e.key.toUpperCase());
        }
    });
    
    keys.forEach(key => {
        key.addEventListener('click', () => {
            handleKeyPress(key.dataset.key);
        });
    });
    
    resetButton.addEventListener('click', resetGame);
    
    // Initialize the game
    resetGame();
});