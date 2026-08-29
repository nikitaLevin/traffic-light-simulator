# 🚦 Traffic Light Simulator

An interactive browser-based simulation comparing fixed-timer vs adaptive traffic light algorithms.

## Demo

[Live Demo](https://nikitaLevin.github.io/traffic-light-simulator)

## About

A real-world problem: traffic lights run on fixed timers regardless of actual traffic load. This simulator demonstrates how an adaptive algorithm — one that reads queue lengths and adjusts green light duration accordingly — reduces average wait time and queue size.

## Features

- 🚗 Real-time car simulation with right-side traffic
- 🔴 Fixed mode — lights switch on a fixed timer
- 🟢 Adaptive mode — lights respond to queue length
- 📊 Live statistics: avg wait time, max queue, cars passed
- 🎮 Traffic intensity control: Low / Medium / High

## Results

Adaptive vs Fixed (High intensity):
- **~3s less** average wait time
- **~3x shorter** max queue

## Tech Stack

- React
- HTML Canvas
- Vanilla JS (simulation logic)

## Run Locally

```bash
git clone https://github.com/nikitaLevin/traffic-light-simulator.git
cd traffic-light-simulator
npm install
npm start
```

## How It Works

**Fixed mode:** each direction gets green for 10 seconds, regardless of traffic.

**Adaptive mode:** monitors queue length on each side. If one direction has 2+ more waiting cars, it gets priority green light.