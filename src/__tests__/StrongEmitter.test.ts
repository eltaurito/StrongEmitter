import { StrongEmitter } from "../models/StrongEmitter";

describe("StrongEmitter", () => {
  it("should call a callback on event emit", () => {
    const numberEmitter = StrongEmitter.create<number>();

    const cb1 = jest.fn();

    numberEmitter.on(cb1);
    numberEmitter.emit(1);

    expect(cb1).toBeCalled();
  });

  it("should call two callbacks on event emit", () => {
    const numberEmitter = StrongEmitter.create<number>();

    const cb1 = jest.fn();
    const cb2 = jest.fn();

    numberEmitter.on(cb1);
    numberEmitter.on(cb2);

    numberEmitter.emit(1);

    expect(cb1).toBeCalled();
    expect(cb2).toBeCalled();
  });

  it("should call two callbacks then only one on event emit", () => {
    const numberEmitter = StrongEmitter.create<number>();

    const cb1 = jest.fn();
    const cb2 = jest.fn();

    numberEmitter.on(cb1);
    numberEmitter.on(cb2);

    numberEmitter.emit(1);

    numberEmitter.off(cb2);

    numberEmitter.emit(1);

    expect(cb1).toBeCalledTimes(2);
    expect(cb2).toBeCalledTimes(1);
  });

  it("should remove all listeners", () => {
    const numberEmitter = StrongEmitter.create<number>();

    const cb1 = jest.fn();
    const cb2 = jest.fn();

    numberEmitter.on(cb1);
    numberEmitter.on(cb2);

    numberEmitter.emit(1);

    numberEmitter.offAll();

    expect(cb1).toBeCalledTimes(1);
    expect(cb2).toBeCalledTimes(1);
  });

  it("should call a callback once on event emit", () => {
    const numberEmitter = StrongEmitter.create<number>();

    const cb1 = jest.fn();

    numberEmitter.once(cb1);
    numberEmitter.emit(1);
    numberEmitter.emit(1);

    expect(cb1).toBeCalledTimes(1);
  });
});
