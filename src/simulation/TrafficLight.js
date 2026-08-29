export class TrafficLight {
  constructor(direction) {
    this.direction = direction; // 'horizontal' | 'vertical'
    this.state = direction === 'horizontal' ? 'green' : 'red';
    this.timer = 0;
    this.greenDuration = 10; // секунд
    this.yellowDuration = 2;
    this.redDuration = 10;
  }

  update(delta) {
    this.timer += delta;

    if (this.state === 'green' && this.timer >= this.greenDuration) {
      this.state = 'yellow';
      this.timer = 0;
    } else if (this.state === 'yellow' && this.timer >= this.yellowDuration) {
      this.state = 'red';
      this.timer = 0;
    } else if (this.state === 'red' && this.timer >= this.redDuration) {
      this.state = 'green';
      this.timer = 0;
    }
  }

  setGreenDuration(seconds) {
    this.greenDuration = seconds;
  }

  isGreen() {
    return this.state === 'green';
  }

  draw(ctx, x, y) {
    const colors = {
      red: { red: '#ff4444', yellow: '#333', green: '#333' },
      yellow: { red: '#333', yellow: '#facc15', green: '#333' },
      green: { red: '#333', yellow: '#333', green: '#4ade80' },
    };

    const c = colors[this.state];

    // Корпус
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.roundRect(x - 10, y - 30, 20, 60, 4);
    ctx.fill();

    // Огни
    [c.red, c.yellow, c.green].forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y - 20 + i * 20, 7, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}