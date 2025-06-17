document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice');
    const playerChoiceDisplay = document.getElementById('player-choice');
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const resultText = document.getElementById('result-text');
    const winsDisplay = document.getElementById('wins');
    const lossesDisplay = document.getElementById('losses');
    const tiesDisplay = document.getElementById('ties');
    const resetButton = document.getElementById('reset');
    
    let wins = 0;
    let losses = 0;
    let ties = 0;
    
    const choicesMap = {
        rock: '✊',
        paper: '✋',
        scissors: '✌️'
    };
    
    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const playerChoice = choice.dataset.choice;
            const computerChoice = computerPlay();
            
            playerChoiceDisplay.textContent = choicesMap[playerChoice];
            computerChoiceDisplay.textContent = choicesMap[computerChoice];
            
            const result = determineWinner(playerChoice, computerChoice);
            displayResult(result);
            updateScoreboard();
        });
    });
    
    resetButton.addEventListener('click', () => {
        wins = 0;
        losses = 0;
        ties = 0;
        updateScoreboard();
        playerChoiceDisplay.textContent = '-';
        computerChoiceDisplay.textContent = '-';
        resultText.textContent = '';
    });
    
    function computerPlay() {
        const choices = ['rock', 'paper', 'scissors'];
        return choices[Math.floor(Math.random() * 3)];
    }
    
    function determineWinner(player, computer) {
        if (player === computer) return 'tie';
        
        if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return 'win';
        }
        
        return 'lose';
    }
    
    function displayResult(result) {
        switch(result) {
            case 'win':
                wins++;
                resultText.textContent = 'You Win!';
                resultText.style.color = '#28a745';
                break;
            case 'lose':
                losses++;
                resultText.textContent = 'You Lose!';
                resultText.style.color = '#dc3545';
                break;
            case 'tie':
                ties++;
                resultText.textContent = 'Tie Game!';
                resultText.style.color = '#6c757d';
                break;
        }
    }
    
    function updateScoreboard() {
        winsDisplay.textContent = wins;
        lossesDisplay.textContent = losses;
        tiesDisplay.textContent = ties;
    }
});