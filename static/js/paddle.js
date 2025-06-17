document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const score1Display = document.getElementById('score1');
    const score2Display = document.getElementById('score2');
    const resetButton = document.getElementById('reset');
    const resultText = document.createElement('div');
    resultText.className = 'result-text';
    document.querySelector('.game-container').insertBefore(resultText, canvas.nextSibling);
    
    // Game elements
    const paddleWidth = 15;
    const paddleHeight = 100;
    const ballSize = 15;
    const winningScore = 11; 
    
    // Game state
    let paddle1Y = canvas.height / 2 - paddleHeight / 2;
    let paddle2Y = canvas.height / 2 - paddleHeight / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSpeedX = 3;
    let ballSpeedY = 3;
    let score1 = 0;
    let score2 = 0;
    let gameActive = true;
    
    // Control flags
    let wPressed = false;
    let sPressed = false;
    let upPressed = false;
    let downPressed = false;
    const paddleSpeed = 5;

    // Game loop
    function gameLoop() {
        if (!gameActive) return;
        
        // Clear canvas
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw paddles
        ctx.fillStyle = 'white';
        ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
        ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
        
        // Draw ball
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Move paddles
        if (wPressed && paddle1Y > 0) paddle1Y -= paddleSpeed;
        if (sPressed && paddle1Y < canvas.height - paddleHeight) paddle1Y += paddleSpeed;
        if (upPressed && paddle2Y > 0) paddle2Y -= paddleSpeed;
        if (downPressed && paddle2Y < canvas.height - paddleHeight) paddle2Y += paddleSpeed;
        
        // Move ball
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        
        // Ball collision with top and bottom
        if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
            ballSpeedY = -ballSpeedY;
        }
        
        // Ball collision with paddles
        if (ballX - ballSize < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX * 1.03;
            let deltaY = ballY - (paddle1Y + paddleHeight / 2);
            ballSpeedY = deltaY * 0.15;
        }
        
        if (ballX + ballSize > canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX * 1.03;
            let deltaY = ballY - (paddle2Y + paddleHeight / 2);
            ballSpeedY = deltaY * 0.15;
        }
        
        // Ball out of bounds (score)
        if (ballX < 0) {
            score2++;
            score2Display.textContent = score2;
            checkGameEnd();
            resetBall();
        }
        if (ballX > canvas.width) {
            score1++;
            score1Display.textContent = score1;
            checkGameEnd();
            resetBall();
        }
        
        requestAnimationFrame(gameLoop);
    }
    
    function checkGameEnd() {
        if (score1 >= winningScore || score2 >= winningScore) {
            gameActive = false;
            const winner = score1 > score2 ? "Player 1" : "Player 2";
            resultText.textContent = `${winner} wins! Final Score: ${score1}-${score2}`;
            resultText.style.color = '#28a745';
            resultText.style.fontWeight = 'bold';
            resultText.style.fontSize = '1.5rem';
            resultText.style.textAlign = 'center';
            resultText.style.margin = '20px 0';
        }
    }
    
    function resetBall() {
        if (!gameActive) return;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * 3;
        ballSpeedY = (Math.random() * 2 - 1);
    }
    
    function resetGame() {
        gameActive = true;
        score1 = 0;
        score2 = 0;
        score1Display.textContent = score1;
        score2Display.textContent = score2;
        paddle1Y = canvas.height / 2 - paddleHeight / 2;
        paddle2Y = canvas.height / 2 - paddleHeight / 2;
        resultText.textContent = '';
        resetBall();
        if (!requestId) {
            requestId = requestAnimationFrame(gameLoop);
        }
    }
    
    // Event listeners
    document.addEventListener('keydown', (e) => {
        if (!gameActive) return;
        switch(e.key) {
            case 'w': wPressed = true; break;
            case 's': sPressed = true; break;
            case 'ArrowUp': upPressed = true; break;
            case 'ArrowDown': downPressed = true; break;
        }
    });
    
    document.addEventListener('keyup', (e) => {
        switch(e.key) {
            case 'w': wPressed = false; break;
            case 's': sPressed = false; break;
            case 'ArrowUp': upPressed = false; break;
            case 'ArrowDown': downPressed = false; break;
        }
    });
    
    resetButton.addEventListener('click', resetGame);
    
    // Start game
    let requestId = requestAnimationFrame(gameLoop);
});