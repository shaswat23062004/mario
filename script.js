const player = document.querySelector('.player');
const game = document.querySelector('.game');

let playerX = 5;
let direction = 0;
let playerY = 50;
let jumpVelocity = 0;
let isJumping = false;

const gravity = 0.8;
const jumpStrength = 18;
const standingImage = 'url("staandingmario.png")';
const runningImage = 'url("mario.webp")';

function setMarioImage(image) {
	player.style.backgroundImage = image;
}

function runMario() {
	playerX += direction * 5;

	if (isJumping) {
		playerY += jumpVelocity;
		jumpVelocity -= gravity;

		if (playerY <= 50) {
			playerY = 50;
			jumpVelocity = 0;
			isJumping = false;
		}
	}

	const maxX = game.clientWidth - player.offsetWidth;
	playerX = Math.max(0, Math.min(playerX, maxX));
	player.style.left = `${playerX}px`;
	player.style.bottom = `${playerY}px`;

	requestAnimationFrame(runMario);
}

document.addEventListener('keydown', (event) => {
	if (event.key === 'ArrowRight' || event.key === 'D' ) {
		direction = 1;
		setMarioImage(runningImage);
	}

	if (event.key === 'ArrowUp' || event.key === ' ') {
		event.preventDefault();

		if (!isJumping) {
			isJumping = true;
			jumpVelocity = jumpStrength;
		}
	}

});

document.addEventListener('keyup', (event) => {
	if (event.key === 'ArrowRight' || event.key === 'D') {
		direction = 0;
		if(playerY===50){
		setMarioImage(standingImage);}
	}
});

setMarioImage(standingImage);
runMario();
