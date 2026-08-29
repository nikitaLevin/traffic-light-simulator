export class Intersection {
  constructor(size) {
    this.size = size;
    this.stats = { avgWaitTime: 0, maxQueue: 0, carsPassedThrough: 0 };
  }

  update(delta, mode, intensity) {}

  draw(ctx) {
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, this.size, this.size);

    // Дороги
    ctx.fillStyle = '#333';
    ctx.fillRect(0, this.size / 2 - 60, this.size, 120); // горизонталь
    ctx.fillRect(this.size / 2 - 60, 0, 120, this.size); // вертикаль

    // Разметка
    ctx.strokeStyle = '#facc15';
    ctx.setLineDash([20, 20]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, this.size / 2);
    ctx.lineTo(this.size, this.size / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.size / 2, 0);
    ctx.lineTo(this.size / 2, this.size);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  getStats() {
    return this.stats;
  }
}