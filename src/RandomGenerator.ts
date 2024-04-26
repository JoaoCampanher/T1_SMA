const A = 1664525;
const C = 1013904223;
const M = Math.pow(2, 32);

export default class RandomGenerator {
  private limit: number;
  private current: number;
  private count: number;

  constructor(limit: number, seed: number) {
    this.count = 0;
    this.limit = limit;
    this.current = seed;
  }

  hasNext(): boolean {
    return this.count < this.limit;
  }

  next(): number {
    this.current = (A * this.current + C) % M;
    ++this.count;
    return Number(this.current) / M;
  }

  nextInRange(min: number, max: number): number {
    let next: number = this.next();
    next = (max - min) * next + min;
    return next;
  }
}
