import { TrafficLight } from './TrafficLight';
import { Car } from './Car';

const INTENSITY_RATES = {
  low: 0.3,
  medium: 0.8,
  high: 2.0,
};

export class Intersection {
  constructor(size) {
    this.size = size;
    this.cars = [];
    this.spawnTimer = 0;

    this.lights = {
      horizontal: new TrafficLight('horizontal'),
      vertical: new TrafficLight('vertical'),
    };

    this.stats = {
      avgWaitTime: 0,
      maxQueue: 0,
      carsPassedThrough: 0,
      totalWaitTime: 0,
      waitingSamples: 0,
    };
  }

  spawnCar(intensity) {
    const rate = INTENSITY_RATES[intensity] || 0.8;
    this.spawnTimer += rate * 0.016;

    if (this.spawnTimer >= 1) {
      this.spawnTimer = 0;
      const directions = ['right', 'left', 'up', 'down'];
      const dir = directions[Math.floor(Math.random() * directions.length)];
      this.cars.push(new Car(dir, this.size));
    }
  }

  isGreenFor(direction) {
    if (direction === 'right' || direction === 'left') {
      return this.lights.horizontal.isGreen();
    }
    return this.lights.vertical.isGreen();
  }

  updateAdaptive() {
    const hQueue = this.cars.filter(
      c => (c.direction === 'right' || c.direction === 'left') && c.waiting
    ).length;

    const vQueue = this.cars.filter(
      c => (c.direction === 'up' || c.direction === 'down') && c.waiting
    ).length;

    if (hQueue > vQueue + 2 && !this.lights.horizontal.isGreen()) {
      this.lights.horizontal.state = 'green';
      this.lights.horizontal.timer = 0;
      this.lights.vertical.state = 'red';
      this.lights.vertical.timer = 0;
    } else if (vQueue > hQueue + 2 && !this.lights.vertical.isGreen()) {
      this.lights.vertical.state = 'green';
      this.lights.vertical.timer = 0;
      this.lights.horizontal.state = 'red';
      this.lights.horizontal.timer = 0;
    }
  }

  update(delta, mode, intensity) {
    // Обновляем светофоры
    this.lights.horizontal.update(delta);
    this.lights.vertical.update(delta);

    if (mode === 'adaptive') {
      this.updateAdaptive();
    }

    // Спавним машины
    this.spawnCar(intensity);

    // Обновляем машины
    this.cars.forEach(car => {
      const green = this.isGreenFor(car.direction);
      car.update(delta, green);

      if (car.waiting) {
        this.stats.totalWaitTime += delta;
        this.stats.waitingSamples++;
      }

      if (car.isOutOfBounds() && !car.passed) {
        car.passed = true;
        this.stats.carsPassedThrough++;
      }
    });

    // Удаляем машины которые уехали
    this.cars = this.cars.filter(c => !c.isOutOfBounds());

    // Обновляем статистику
    const waiting = this.cars.filter(c => c.waiting).length;
    if (waiting > this.stats.maxQueue) this.stats.maxQueue = waiting;
    if (this.stats.waitingSamples > 0) {
      this.stats.avgWaitTime = this.stats.totalWaitTime / this.stats.waitingSamples;
    }
  }

  draw(ctx) {
    const s = this.size;
    const center = s / 2;
    const road = 60;

    // Фон
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, s, s);

    // Трава
    ctx.fillStyle = '#14532d';
    ctx.fillRect(0, 0, center - road, center - road);
    ctx.fillRect(center + road, 0, center - road, center - road);
    ctx.fillRect(0, center + road, center - road, center - road);
    ctx.fillRect(center + road, center + road, center - road, center - road);

    // Дороги
    ctx.fillStyle = '#374151';
    ctx.fillRect(0, center - road, s, road * 2);
    ctx.fillRect(center - road, 0, road * 2, s);

    // Разметка горизонталь
    ctx.strokeStyle = '#facc15';
    ctx.setLineDash([20, 20]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, center);
    ctx.lineTo(center - road, center);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(center + road, center);
    ctx.lineTo(s, center);
    ctx.stroke();

    // Разметка вертикаль
    ctx.beginPath();
    ctx.moveTo(center, 0);
    ctx.lineTo(center, center - road);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(center, center + road);
    ctx.lineTo(center, s);
    ctx.stroke();
    ctx.setLineDash([]);

    // Зебра
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(center - road + 5, center - road - 20 + i * 8, road * 2 - 10, 4);
      ctx.fillRect(center - road + 5, center + road + 4 + i * 8, road * 2 - 10, 4);
      ctx.fillRect(center - road - 20 + i * 8, center - road + 5, 4, road * 2 - 10);
      ctx.fillRect(center + road + 4 + i * 8, center - road + 5, 4, road * 2 - 10);
    }

    // Машины
    this.cars.forEach(car => car.draw(ctx));

    // Светофоры
    this.lights.horizontal.draw(ctx, center - road - 15, center - road - 15);
    this.lights.horizontal.draw(ctx, center + road + 15, center + road + 15);
    this.lights.vertical.draw(ctx, center + road + 15, center - road - 15);
    this.lights.vertical.draw(ctx, center - road - 15, center + road + 15);
  }

  getStats() {
    return {
      avgWaitTime: this.stats.avgWaitTime,
      maxQueue: this.stats.maxQueue,
      carsPassedThrough: this.stats.carsPassedThrough,
    };
  }
}