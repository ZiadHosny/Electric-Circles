document.querySelector('body').style.margin = 0;
const canvasDOM = document.querySelector('canvas');
const WIDTH = (canvasDOM.width = innerWidth);
const HEIGHT = (canvasDOM.height = innerHeight);
const canvas = canvasDOM.getContext('2d');

const CircleArray = [];
const gradientCircle = canvas.createLinearGradient(0, 0, 0, HEIGHT);

for (let i = 0; i <= 10; i++) {
  if (i % 2 == 0) {
    gradientCircle.addColorStop(i / 10, '#EB1D36');
  } else {
    gradientCircle.addColorStop(i / 10, '#0F0E0E');
  }
}

const background = () => {
  const gradientBackground = canvas.createLinearGradient(0, 0, 0, HEIGHT);

  for (let i = 0; i <= 10; i++) {
    if (i == 5) {
      gradientBackground.addColorStop(i / 10, 'aqua');
    } else if (i % 2 == 0) {
      gradientBackground.addColorStop(i / 10, '#0F0E0E');
    } else {
      gradientBackground.addColorStop(i / 10, '#EB1D36');
    }
  }

  canvas.fillStyle = gradientBackground;
  canvas.fillRect(0, 0, WIDTH, HEIGHT);
};

const backgroundRadialGradient = () => {
  const BackgroundRadialGradient = canvas.createRadialGradient(
    WIDTH / 2,
    HEIGHT / 2,
    400,
    WIDTH / 2,
    HEIGHT / 2,
    30
  );

  for (let i = 0; i <= 10; i++) {
    if (i % 2 == 0) {
      BackgroundRadialGradient.addColorStop(i / 10, 'aqua');
    } else {
      BackgroundRadialGradient.addColorStop(i / 10, '#0F0E0E');
    }
  }

  canvas.fillStyle = BackgroundRadialGradient;
  canvas.fillRect(0, 0, WIDTH, HEIGHT);
};

class Circle {
  constructor(x, y, r, dx, dy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
  }

  draw() {
    canvas.beginPath();
    canvas.fillStyle = gradientCircle;
    canvas.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    canvas.fill();
    if (this.x + this.r >= WIDTH || this.x - this.r <= 0) {
      backgroundRadialGradient();
      this.dx = -this.dx;
    }

    if (this.y + this.r > HEIGHT || this.y - this.r < 0) {
      backgroundRadialGradient();
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  }
}

const animation = () => {
  background();
  for (i = 0; i < CircleArray.length; i += 1) {
    CircleArray[i].draw();
  }
  requestAnimationFrame(animation);
};

for (i = 0; i < 20; i += 1) {
  const r = Math.random() * 35 + 5;
  const dx = Math.random() * 3 + 1;
  const dy = Math.random() * 2 + 1;
  const x = Math.random() * (WIDTH - 2 * r) + r;
  const y = Math.random() * (HEIGHT - 2 * r) + r;
  CircleArray.push(new Circle(x, y, r, dx, dy));
}
requestAnimationFrame(animation);
