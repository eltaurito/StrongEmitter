# StrongEmitter

event-driven programming in TypeScript. It provides a reliable mechanism for emitting and handling events while ensuring strict type checking at compile-time.

## Usage example

### Basic Typescript

``` typescript
import { StrongEmitter } from "./models/StrongEmitter";
import { useStrongEmitter } from "./models/useStrongEmitter";
import { Listener } from "./types";
``` 

``` typescript

type EmitterArg = { value: number };

const numberEmitter = StrongEmitter.create<EmitterArg>();

const callback1: Listener<EmitterArg> = (arg: EmitterArg) => {
  console.log(`Received arg on callback1: ${arg.value}`);
};
numberEmitter.on(callback1);
const callback2: Listener<EmitterArg> = (arg: EmitterArg) => {
  console.log(`Received arg on callback2: ${arg.value}`);
};
numberEmitter.on(callback2);

numberEmitter.emit({ value: 10 });

// Received arg on callback1: 10
// Received arg on callback2: 20

numberEmitter.off(callback2);

numberEmitter.emit({ value: 20 });

// Received arg on callback1: 10

```

### React hook

``` typescript
import { useStrongEmitter } from "./hooks/useStrongEmitter";

``` 

``` typescript
type EmitterArg = { value: number };

const numberEmitter = StrongEmitter.create<EmitterArg>();

const App: FC = () => {
  const [count, setCount] = useState(0);

  const cb = useCallback<Listener<EmitterArg>>(
    (arg) => {
      console.log("Arg received from event emitter ", arg);
      const { value } = arg;
      console.log(
        `Count state (${count}) + arg value (${value}) = ${count + value}`
      );
    },
    [count]
  );

  useStrongEmitter(numberEmitter, cb);

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => numberEmitter.emit({ value: 10 })}>
          Emit value 10 with StrongEmitter
        </button>
        <button onClick={() => numberEmitter.emit({ value: 20 })}>
          Emit value 20 with StrongEmitter
        </button>
    </>
  );
};

```

## Next steps

- Single bus for multi event integration
  - StrongEmitterMulti class integration   
  - React hook integration
- offAll method integration
- Npm package publication
- Testing integration
