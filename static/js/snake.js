document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('highScore');
    const resetButton = document.getElementById('reset');
    const up=document.getElementById("up")
    const Left=document.getElementById("Left")
    const down=document.getElementById("down")
    const Right=document.getElementById("Right")
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    
    let snake = [{x: 10, y: 10}];
    let food = {x: 5, y: 5};
    let xVelocity = 0;
    let yVelocity = 0;
    let score = 0;
    let highScore = localStorage.getItem('snakeHighScore') || 0;
    let gameRunning = true;
    let gameSpeed = 150; // Initial speed (slower than before)
    
    // Game loop
    function gameLoop() {
        if (gameRunning) {
            setTimeout(() => {
                clearCanvas();
                drawFood();
                moveSnake();
                drawSnake();
                checkCollision();
                gameLoop();
            }, gameSpeed);
        }
    }
    
    function clearCanvas() {
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    function drawSnake() {
        ctx.fillStyle = '#28a745';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        });
    }
    
    function drawFood() {
        ctx.fillStyle = '#dc3545';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    }
    
    function moveSnake() {
        const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};
        snake.unshift(head);
        
        // Check if snake ate food
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreElement.textContent = score;
            
            // Update high score if needed
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('snakeHighScore', highScore);
                highScoreElement.textContent = highScore;
            }
            
            generateFood();
            // Increase speed slightly as score goes up
            gameSpeed = Math.max(50, 150 - Math.floor(score / 10) * 5);
        } else {
            snake.pop();
        }
    }
    
    function generateFood() {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        
        // Make sure food doesn't appear on snake
        snake.forEach(segment => {
            if (segment.x === food.x && segment.y === food.y) {
                generateFood();
            }
        });
    }
    
    function checkCollision() {
        const head = snake[0];
        
        // Wall collision
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            gameOver();
        }
        
        // Self collision
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver();
            }
        }
    }
    
    function gameOver() {
        gameRunning = false;
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over!', canvas.width / 6, canvas.height / 2);
    }
    
    function resetGame() {
        snake = [{x: 10, y: 10}];
        xVelocity = 0;
        yVelocity = 0;
        score = 0;
        scoreElement.textContent = score;
        highScoreElement.textContent = highScore;
        gameRunning = true;
        gameSpeed = 150;
        generateFood();
        gameLoop();
    }
    up.addEventListener('click', () => {
    if (yVelocity !== 1) {
        xVelocity = 0;
        yVelocity = -1;
    }
});

down.addEventListener('click', () => {
    if (yVelocity !== -1) {
        xVelocity = 0;
        yVelocity = 1;
    }
});

Left.addEventListener('click', () => {
    if (xVelocity !== 1) {
        xVelocity = -1;
        yVelocity = 0;
    }
});

Right.addEventListener('click', () => {
    if (xVelocity !== -1) {
        xVelocity = 1;
        yVelocity = 0;
    }
});

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        // Prevent reversing direction
        switch(e.key) {
            case 'ArrowUp':
                if (yVelocity !== 1) {
                    xVelocity = 0;
                    yVelocity = -1;
                }
                break;
            case 'ArrowDown':
                if (yVelocity !== -1) {
                    xVelocity = 0;
                    yVelocity = 1;
                }
                break;
            case 'ArrowLeft':
                if (xVelocity !== 1) {
                    xVelocity = -1;
                    yVelocity = 0;
                }
                break;
            case 'ArrowRight':
                if (xVelocity !== -1) {
                    xVelocity = 1;
                    yVelocity = 0;
                }
                break;
        }
    });
    
    resetButton.addEventListener('click', resetGame);
    
    // Initialize high score display
    highScoreElement.textContent = highScore;
    
    // Start the game
    resetGame();
});
