
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400; 

// Ball properties
const ballRadius = 20;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Score
let score = 0;

// Function to draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#3498db';
  ctx.fill();
  ctx.closePath();
}

// Function to update the game state
function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce off the walls
  if (ballX - ballRadius < 0 || ballX + ballRadius > canvas.width) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

// Function to render the game
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
}

// Function to handle mouse click event
function handleClick(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Check if the click is within the ball
  const distance = Math.sqrt((mouseX - ballX)**2 + (mouseY - ballY)**2);
  if (distance < ballRadius) {
    increaseScore();
    resetBall();
  }
}

// Function to reset the ball to a random position
function resetBall() {
  ballX = Math.random() * (canvas.width - 2 * ballRadius) + ballRadius;
  ballY = Math.random() * (canvas.height - 2 * ballRadius) + ballRadius;
}

// Function to increase the score
function increaseScore() {
  score++;
  updateScore();
}

// Function to update the displayed score
function updateScore() {
  document.getElementById('score').textContent = `Score: ${score}`;
}

// Event listener for mouse click
canvas.addEventListener('click', handleClick);

// Game loop
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
