document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guessInput');
    const submitButton = document.getElementById('submitGuess');
    const messageDiv = document.getElementById('message');
    const previousGuessesSpan = document.getElementById('previousGuesses');
    const resetButton = document.getElementById('reset');
    
    let secretNumber = generateRandomNumber();
    let previousGuesses = [];
    let gameOver = false;
    
    function generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }
    
    function checkGuess() {
        if (gameOver) return;
        
        const guess = parseInt(guessInput.value);
        
        if (isNaN(guess)) {
            messageDiv.textContent = 'Please enter a valid number!';
            messageDiv.style.color = 'red';
            return;
        }
        
        if (guess < 1 || guess > 100) {
            messageDiv.textContent = 'Please enter a number between 1 and 100!';
            messageDiv.style.color = 'red';
            return;
        }
        
        previousGuesses.push(guess);
        previousGuessesSpan.textContent = previousGuesses.join(', ');
        
        if (guess === secretNumber) {
            messageDiv.textContent = `Congratulations! You got it in ${previousGuesses.length} guesses!`;
            messageDiv.style.color = 'green';
            gameOver = true;
        } else if (guess < secretNumber) {
            messageDiv.textContent = 'Too low! Try a higher number.';
            messageDiv.style.color = 'blue';
        } else {
            messageDiv.textContent = 'Too high! Try a lower number.';
            messageDiv.style.color = 'blue';
        }
        
        guessInput.value = '';
        guessInput.focus();
    }
    
    function resetGame() {
        secretNumber = generateRandomNumber();
        previousGuesses = [];
        previousGuessesSpan.textContent = '';
        messageDiv.textContent = '';
        gameOver = false;
        guessInput.value = '';
        guessInput.focus();
    }
    
    submitButton.addEventListener('click', checkGuess);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });
    resetButton.addEventListener('click', resetGame);
    
    // Focus input on page load
    guessInput.focus();
});