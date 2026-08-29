export class Car {
  constructor(direction, canvasSize) {
    this.direction = direction;
    this.canvasSize = canvasSize;
    this.speed = 80 + Math.random() * 40;
    this.width = 20;
    this.height = 12;
    this.waiting = false;
    this.waitTime = 0;
    this.passed = false;
    this.onIntersection = false;

    const center = canvasSize / 2;
    const road = 60;

    // Правостороннее движение — машины едут по правой полосе
    switch (direction) {
      case 'right':
        this.x = -this.width;
        this.y = center + road / 2 - 15; // нижняя полоса горизонтали
        break;
      case 'left':
        this.x = canvasSize + this.width;
        this.y = center - road / 2 + 15; // верхняя полоса горизонтали
        break;
      case 'down':
        this.x = center + road / 2 - 15; // правая полоса вертикали
        this.y = -this.height;
        break;
      case 'up':
        this.x = center - road / 2 + 15; // левая полоса вертикали
        this.y = canvasSize + this.height;
        break;
      default:
        break;
    }

    const colors = ['#3b82f6', '#ef4444', '#f97316', '#a855f7', '#06b6d4', '#84cc16'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  getStopLine(canvasSize) {
    const center = canvasSize / 2;
    const road = 60;
    switch (this.direction) {
      case 'right': return center - road - 5;
      case 'left': return center + road + 5;
      case 'down': return center - road - 5;
      case 'up': return center + road + 5;
      default: return 0;
    }
  }

  isOnIntersection() {
    const center = this.canvasSize / 2;
    const road = 60;
    return (
      this.x > center - road &&
      this.x < center + road &&
      this.y > center - road &&
      this.y < center + road
    );
  }

  update(delta, isGreen, carsAhead) {
    if (!this.waiting) this.waitTime += delta;

    const stop = this.getStopLine(this.canvasSize);

    // Если машина уже на перекрёстке — едет до конца без остановки
    if (this.isOnIntersection()) {
      this.onIntersection = true;
    }

    // Дистанция до ближайшей машины впереди
    const minGap = this.width + 5;
    let blockedBycar = false;

    if (carsAhead.length > 0) {
      for (const other of carsAhead) {
        let dist;
        switch (this.direction) {
          case 'right': dist = other.x - this.x; break;
          case 'left': dist = this.x - other.x; break;
          case 'down': dist = other.y - this.y; break;
          case 'up': dist = this.y - other.y; break;
          default: dist = Infinity;
        }
        if (dist > 0 && dist < minGap + 5) {
          blockedBycar = true;
          break;
        }
      }
    }

    // Остановка на красный (только если не на перекрёстке)
    if (!isGreen && !this.onIntersection) {
      switch (this.direction) {
        case 'right':
          if (this.x + this.width / 2 >= stop) {
            this.waiting = true;
            return;
          }
          break;
        case 'left':
          if (this.x - this.width / 2 <= stop) {
            this.waiting = true;
            return;
          }
          break;
        case 'down':
          if (this.y + this.height / 2 >= stop) {
            this.waiting = true;
            return;
          }
          break;
        case 'up':
          if (this.y - this.height / 2 <= stop) {
            this.waiting = true;
            return;
          }
          break;
        default:
          break;
      }
    }

    // Остановка за машиной впереди
    if (blockedBycar) {
      this.waiting = true;
      return;
    }

    this.waiting = false;

    // Если уехал с перекрёстка
    // if (this.onIntersection && !this.isOnIntersection()) {
    //   this.onIntersection = false;
    // }

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

    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(-this.width / 2 + 3, -this.height / 2 + 2, 6, this.height - 4);

    ctx.restore();
  }
}