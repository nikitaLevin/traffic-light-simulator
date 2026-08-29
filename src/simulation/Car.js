export class Car {
  constructor(direction, canvasSize) {
    this.direction = direction; // 'left' | 'right' | 'up' | 'down'
    this.canvasSize = canvasSize;
    this.speed = 80 + Math.random() * 40; // px/s
    this.width = 20;
    this.height = 12;
    this.waiting = false;
    this.waitTime = 0;
    this.passed = false;

    const center = canvasSize / 2;
    const road = 60;

    switch (direction) {
      case 'right':
        this.x = -this.width;
        this.y = center - road / 2 + 15;
        break;
      case 'left':
        this.x = canvasSize + this.width;
        this.y = center + road / 2 - 15;
        break;
      case 'down':
        this.x = center + road / 2 - 15;
        this.y = -this.height;
        break;
      case 'up':
        this.x = center - road / 2 + 15;
        this.y = canvasSize + this.height;
        break;
      default:
        break;
    }

    // Цвет машины
    const colors = ['#3b82f6', '#ef4444', '#f97316', '#a855f7', '#06b6d4', '#84cc16'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  getStopPosition(canvasSize) {
    const center = canvasSize / 2;
    switch (this.direction) {
      case 'right': return center - 70;
      case 'left': return center + 70;
      case 'down': return center - 70;
      case 'up': return center + 70;
      default: return 0;
    }
  }

  update(delta, isGreen) {
    if (!this.waiting) this.waitTime += delta;

    const stop = this.getStopPosition(this.canvasSize);
    const center = this.canvasSize / 2;

    // Проверка нужно ли остановиться
    if (!isGreen) {
      switch (this.direction) {
        case 'right':
          if (this.x + this.width >= stop && this.x < center) {
            this.waiting = true;
            return;
          }
          break;
        case 'left':
          if (this.x - this.width <= stop && this.x > center) {
            this.waiting = true;
            return;
          }
          break;
        case 'down':
          if (this.y + this.height >= stop && this.y < center) {
            this.waiting = true;
            return;
          }
          break;
        case 'up':
          if (this.y - this.height <= stop && this.y > center) {
            this.waiting = true;
            return;
          }
          break;
        default:
          break;
      }
    }

    this.waiting = false;

    // Движение
    switch (this.direction) {
      case 'right': this.x += this.speed * delta; break;
      case 'left': this.x -= this.speed * delta; break;
      case 'down': this.y += this.speed * delta; break;
      case 'up': this.y -= this.speed * delta; break;
      default: break;
    }
  }

  isOutOfBounds() {
    const s = this.canvasSize;
    return this.x > s + 50 || this.x < -50 || this.y > s + 50 || this.y < -50;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    if (this.direction === 'down' || this.direction === 'up') {
      ctx.rotate(Math.PI / 2);
    }

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.roundRect(-this.width / 2, -this.height / 2, this.width, this.height, 3);
    ctx.fill();

    // Лобовое стекло
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(-this.width / 2 + 3, -this.height / 2 + 2, 6, this.height - 4);

    ctx.restore();
  }
}