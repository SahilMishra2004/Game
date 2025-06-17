document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('raceCanvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startRace');
    const resetButton = document.getElementById('reset');
    const resultsDiv = document.getElementById('results');
    const predictionSelect = document.getElementById('turtle-prediction');
    const submitPredictionBtn = document.getElementById('submit-prediction');
    
    const turtleColors = ['red', 'blue', 'green', 'orange', 'purple'];
    const turtleNames = {
        'red': 'Red',
        'blue': 'Blue',
        'green': 'Green',
        'orange': 'Orange',
        'purple': 'Purple'
    };
    const turtleCount = turtleColors.length;
    const trackHeight = 50;
    const turtleSize = 30;
    const finishLine = canvas.width - 50;
    
    let turtles = [];
    let raceInterval;
    let raceFinished = false;
    let userPrediction = null;
    let predictionSubmitted = false;
    
    // Initialize turtles
    function initTurtles() {
        turtles = [];
        for (let i = 0; i < turtleCount; i++) {
            const color = turtleColors[i];
            turtles.push({
                x: 50,
                y: 50 + i * trackHeight,
                color: color,
                name: turtleNames[color],
                speed: 1 + Math.random() * 3,
                finished: false,
                position: 0
            });
        }
    }
    
    // Draw the race track
    function drawTrack() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw finish line
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(finishLine, 0);
        ctx.lineTo(finishLine, canvas.height);
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.fillText('FINISH', finishLine + 10, 20);
        
        // Draw lanes
        for (let i = 0; i < turtleCount; i++) {
            ctx.strokeStyle = '#ddd';
            ctx.beginPath();
            ctx.moveTo(0, 50 + i * trackHeight + trackHeight/2);
            ctx.lineTo(canvas.width, 50 + i * trackHeight + trackHeight/2);
            ctx.stroke();
        }
        
        // Draw turtles
        turtles.forEach(turtle => {
            ctx.fillStyle = turtle.color;
            
            // Turtle body
            ctx.beginPath();
            ctx.arc(turtle.x, turtle.y, turtleSize/2, 0, Math.PI * 2);
            ctx.fill();
            
            // Turtle head
            ctx.beginPath();
            ctx.arc(turtle.x + turtleSize/3, turtle.y - turtleSize/4, turtleSize/4, 0, Math.PI * 2);
            ctx.fill();
            
            // Turtle name
            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.fillText(turtle.name, turtle.x - turtleSize/2, turtle.y - turtleSize/2 - 5);
        });
    }
    
    // Update turtle positions
    function updateRace() {
        let turtlesFinished = 0;
        
        turtles.forEach(turtle => {
            if (!turtle.finished) {
                turtle.x += turtle.speed;
                
                // Check if turtle crossed finish line
                if (turtle.x >= finishLine) {
                    turtle.finished = true;
                    turtle.position = ++turtlesFinished;
                    
                    // First turtle to finish
                    if (turtlesFinished === 1) {
                        const winnerColor = turtle.color;
                        let resultMessage = `<span style="color: ${winnerColor}">${turtle.name} turtle wins!</span>`;
                        
                        // Check prediction if submitted
                        if (predictionSubmitted) {
                            if (userPrediction === winnerColor) {
                                resultMessage += `<br><span class="text-success">Correct prediction! You guessed ${turtleNames[userPrediction]} would win.</span>`;
                            } else {
                                resultMessage += `<br><span class="text-danger">Wrong prediction. You guessed ${turtleNames[userPrediction]} would win.</span>`;
                            }
                        }
                        
                        resultsDiv.innerHTML = resultMessage;
                        clearInterval(raceInterval);
                        raceFinished = true;
                        startButton.disabled = false;
                    }
                }
            }
        });
        
        drawTrack();
    }
    
    // Start the race
    function startRace() {
        if (raceInterval || !predictionSubmitted) {
            if (!predictionSubmitted) {
                resultsDiv.textContent = "Please submit your prediction first!";
                resultsDiv.style.color = "red";
            }
            return;
        }
        
        initTurtles();
        drawTrack();
        resultsDiv.textContent = "Race in progress...";
        resultsDiv.style.color = "black";
        raceFinished = false;
        startButton.disabled = true;
        
        raceInterval = setInterval(updateRace, 50);
    }
    
    // Reset the race
    function resetRace() {
        clearInterval(raceInterval);
        raceInterval = null;
        initTurtles();
        drawTrack();
        resultsDiv.textContent = "";
        raceFinished = false;
        predictionSubmitted = false;
        userPrediction = null;
        startButton.disabled = false;
        
        // Reset prediction UI
        predictionSelect.style.display = "block";
        submitPredictionBtn.style.display = "block";
        document.querySelector('.prediction p')?.remove();
    }
    
    // Submit prediction
    function submitPrediction() {
        userPrediction = predictionSelect.value;
        predictionSubmitted = true;
        
        // Update UI to show prediction
        const predictionDiv = document.querySelector('.prediction');
        predictionDiv.innerHTML = `
            <p>Your prediction: <strong style="color: ${userPrediction}">
                ${turtleNames[userPrediction]} turtle
            </strong></p>
        `;
        
        resultsDiv.textContent = "Prediction submitted! Click Start Race to begin.";
        resultsDiv.style.color = "green";
    }
    
    // Event listeners
    startButton.addEventListener('click', startRace);
    resetButton.addEventListener('click', resetRace);
    submitPredictionBtn.addEventListener('click', submitPrediction);
    
    // Initialize
    initTurtles();
    drawTrack();
});