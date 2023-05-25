import { FC, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { StrongEmitter } from "./models/StrongEmitter";

type EmitterArg = { value: number };

const strongEmitter = StrongEmitter.create<EmitterArg>();

const App: FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const cb = (arg: EmitterArg) => {
      console.log(`Arg received from emitter ${arg}`);
      const { value } = arg;
      console.log(`Count (${count}) + Arg (${value}) =  ${count + value}`);
    };
    strongEmitter.on(cb);

    return () => {
      strongEmitter.off(cb);
    };
  }, [count]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => strongEmitter.emit({ value: Math.random() })}>
          Emit event
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
