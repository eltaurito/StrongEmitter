import { FC, useCallback, useState } from "react";
import "./App.css";
import { StrongEmitter } from "./models/StrongEmitter";
import { useStrongEmitter } from "./models/useStrongEmitter";
import { Listener } from "./types";

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
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;
