import { EmitterStructure, Listener } from "../types";

export class StrongEmitter<T> implements EmitterStructure<T> {
  listeners: Listener<T>[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  on(callback: Listener<T>) {
    this.listeners.push(callback);
  }
  off(callback: Listener<T>) {
    this.listeners.splice(this.listeners.indexOf(callback), 1);
  }
  emit(payload: T) {
    this.listeners.forEach((listener) => listener(payload));
  }

  static create<T>(): StrongEmitter<T> {
    return new StrongEmitter<T>();
  }
}
