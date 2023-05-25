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

// type PayloadNumber = { value: number };

// const numberEmitter = new StrongEmitter<PayloadNumber>();

// const cb1 = (payload: PayloadNumber) => {
//   console.log(payload + "from cb1");
// };

// const cb2 = (payload: PayloadNumber) => {
//   console.log(payload + "from cb1");
// };

// numberEmitter.on(cb1);
// numberEmitter.on(cb2);
// numberEmitter.emit({ value: 3 });
// numberEmitter.off(cb1);
// numberEmitter.emit({ value: 4 });
// numberEmitter.off(cb2);
