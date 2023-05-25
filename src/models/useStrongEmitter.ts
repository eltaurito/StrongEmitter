import { useEffect } from "react";
import { Listener } from "../types";
import { StrongEmitter } from "./StrongEmitter";

export const useStrongEmitter = <T>(
  emitter: StrongEmitter<T>,
  cb: Listener<T>
) => {
  useEffect(() => {
    emitter.on(cb);

    return () => {
      emitter.off(cb);
    };
  }, [cb, emitter]);
};
