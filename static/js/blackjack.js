document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const dealerCardsDiv = document.getElementById('dealer-cards');
    const playerCardsDiv = document.getElementById('player-cards');
    const dealerScoreSpan = document.getElementById('dealer-score');
    const playerScoreSpan = document.getElementById('player-score');
    const balanceSpan = document.getElementById('balance');
    const betSpan = document.getElementById('bet');
    const messageDiv = document.getElementById('message');
    const betControlsDiv = document.getElementById('bet-controls');
    const gameControlsDiv = document.getElementById('game-controls');
    const hitButton = document.getElementById('hit');
    const standButton = document.getElementById('stand');
    const doubleButton = document.getElementById('double');
    const dealButton = document.getElementById('deal');
    const resetButton = document.getElementById('reset');
    const betButtons = document.querySelectorAll('.bet-btn');
    
    // Game state
    let deck = [];
    let dealerHand = [];
    let playerHand = [];
    let balance = 1000;
    let currentBet = 0;
    let gameInProgress = false;
    
    // Card suits and values
    const suits = ['♥', '♦', '♣', '♠'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    
    // Initialize a new deck
    function initDeck() {
        deck = [];
        for (const suit of suits) {
            for (const value of values) {
                deck.push({ suit, value });
            }
        }
        shuffleDeck();
    }
    
    // Shuffle the deck
    function shuffleDeck() {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }
    
    // Deal a card
    function dealCard() {
        if (deck.length === 0) {
            initDeck();
        }
        return deck.pop();
    }
    
    // Calculate hand value
    function calculateHandValue(hand) {
        let value = 0;
        let aces = 0;
        
        for (const card of hand) {
            if (card.value === 'A') {
                aces++;
                value += 11;
            } else if (['K', 'Q', 'J'].includes(card.value)) {
                value += 10;
            } else {
                value += parseInt(card.value);
            }
        }
        
        // Adjust for aces
        while (value > 21 && aces > 0) {
            value -= 10;
            aces--;
        }
        
        return value;
    }
    
    // Create card element
    function createCardElement(card, hidden = false) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        
        if (hidden) {
            cardDiv.className += ' back';
            return cardDiv;
        }
        
        if (['♥', '♦'].includes(card.suit)) {
            cardDiv.className += ' red';
        }
        
        cardDiv.textContent = card.value + card.suit;
        cardDiv.setAttribute('data-value', card.value);
        cardDiv.setAttribute('data-suit', card.suit);
        
        return cardDiv;
    }
    
    // Update UI
    function updateUI() {
        // Clear card displays
        dealerCardsDiv.innerHTML = '';
        playerCardsDiv.innerHTML = '';
        
        // Show dealer cards (first card hidden during play)
        dealerCardsDiv.appendChild(createCardElement(dealerHand[0], gameInProgress));
        for (let i = 1; i < dealerHand.length; i++) {
            dealerCardsDiv.appendChild(createCardElement(dealerHand[i]));
        }
        
        // Show player cards
        playerHand.forEach(card => {
            playerCardsDiv.appendChild(createCardElement(card));
        });
        
        // Update scores
        playerScoreSpan.textContent = calculateHandValue(playerHand);
        
        if (gameInProgress) {
            dealerScoreSpan.textContent = '?';
        } else {
            dealerScoreSpan.textContent = calculateHandValue(dealerHand);
        }
        
        // Update balance and bet
        balanceSpan.textContent = balance;
        betSpan.textContent = currentBet;
    }
    
    // Deal initial cards
    function dealInitialCards() {
        dealerHand = [dealCard(), dealCard()];
        playerHand = [dealCard(), dealCard()];
        gameInProgress = true;
        updateUI();
        
        // Check for blackjack after a small delay to let UI update
        setTimeout(checkBlackjack, 100);
    }
    
    // Check for blackjack
    function checkBlackjack() {
        const playerValue = calculateHandValue(playerHand);
        const dealerValue = calculateHandValue(dealerHand);
        
        if (playerValue === 21) {
            if (dealerValue === 21) {
                endGame("Push! Both have Blackjack.");
                balance += currentBet; // Return bet
            } else {
                endGame("Blackjack! You win 1.5x your bet!");
                balance += Math.floor(currentBet * 2.5); // Win 1.5x (original bet + 1.5x)
            }
        } else if (dealerValue === 21) {
            endGame("Dealer has Blackjack! You lose.");
        }
    }
    
    // Player hits
    function playerHit() {
        if (!gameInProgress) return;
        
        playerHand.push(dealCard());
        updateUI();
        
        const playerValue = calculateHandValue(playerHand);
        
        if (playerValue > 21) {
            endGame("Bust! You went over 21.");
        }
    }
    
    // Player stands
    function playerStand() {
        if (!gameInProgress) return;
        
        gameInProgress = false;
        dealerPlay();
    }
    
    // Player doubles
    function playerDouble() {
        if (!gameInProgress || playerHand.length !== 2 || balance < currentBet) return;
        
        balance -= currentBet;
        currentBet *= 2;
        updateUI();
        playerHit();
        
        if (gameInProgress) {
            playerStand();
        }
    }
    
    // Dealer plays
    function dealerPlay() {
        // Reveal dealer's hidden card
        updateUI();
        
        // Dealer hits on soft 17
        while (calculateHandValue(dealerHand) < 17) {
            dealerHand.push(dealCard());
            updateUI();
        }
        
        const dealerValue = calculateHandValue(dealerHand);
        const playerValue = calculateHandValue(playerHand);
        
        if (dealerValue > 21) {
            endGame("Dealer busts! You win.");
            balance += currentBet * 2;
        } else if (dealerValue > playerValue) {
            endGame("Dealer wins.");
        } else if (dealerValue < playerValue) {
            endGame("You win!");
            balance += currentBet * 2;
        } else {
            endGame("Push! It's a tie.");
            balance += currentBet;
        }
    }
    
    // End game
    function endGame(message) {
        gameInProgress = false;
        messageDiv.textContent = message;
        
        // Show all dealer cards
        dealerCardsDiv.innerHTML = '';
        dealerHand.forEach(card => {
            dealerCardsDiv.appendChild(createCardElement(card));
        });
        dealerScoreSpan.textContent = calculateHandValue(dealerHand);
        
        betControlsDiv.style.display = 'flex';
        gameControlsDiv.style.display = 'none';
        
        if (balance <= 0) {
            messageDiv.textContent = "Game over! You're out of money.";
            dealButton.disabled = true;
        }
    }
    
    // Place bet
    function placeBet(amount) {
        if (gameInProgress || balance < amount) return;
        
        currentBet += amount;
        balance -= amount;
        updateUI();
    }
    
    // Start new hand
    function startNewHand() {
        if (currentBet === 0) {
            messageDiv.textContent = "Please place a bet first.";
            return;
        }
        
        initDeck();
        messageDiv.textContent = "";
        
        betControlsDiv.style.display = 'none';
        gameControlsDiv.style.display = 'flex';
        
        dealInitialCards();
    }
    
    // Reset game
    function resetGame() {
        balance = 1000;
        currentBet = 0;
        gameInProgress = false;
        messageDiv.textContent = "";
        
        betControlsDiv.style.display = 'flex';
        gameControlsDiv.style.display = 'none';
        dealButton.disabled = false;
        
        updateUI();
    }
    
    // Event listeners
    hitButton.addEventListener('click', playerHit);
    standButton.addEventListener('click', playerStand);
    doubleButton.addEventListener('click', playerDouble);
    dealButton.addEventListener('click', startNewHand);
    resetButton.addEventListener('click', resetGame);
    
    betButtons.forEach(button => {
        button.addEventListener('click', () => {
            placeBet(parseInt(button.dataset.amount));
        });
    });
    
    // Initialize game
    updateUI();
});