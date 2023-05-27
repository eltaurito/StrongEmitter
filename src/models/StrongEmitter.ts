import { EmitterStructure, Listener } from "../types";

export class StrongEmitter<T> implements EmitterStructure<T> {
  listeners: Listener<T>[] = [];
  listenersOnce: Listener<T>[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  on(callback: Listener<T>) {
    this.listeners.push(callback);
  }

  once(callback: Listener<T>) {
    this.listenersOnce.push(callback);
  }

  off(callback: Listener<T>) {
    this.listeners.splice(this.listeners.indexOf(callback), 1);
  }
  emit(payload: T) {
    this.listeners.forEach((listener) => listener(payload));
    if (this.listenersOnce.length > 0) {
      this.listenersOnce.forEach((listener) => listener(payload));
      this.listenersOnce = [];
    }
  }
  offAll() {
    this.listeners = [];
  }

  static create<T>(): StrongEmitter<T> {
    return new StrongEmitter<T>();
  }
}
