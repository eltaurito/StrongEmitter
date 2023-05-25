export type Listener<T> = (arg: T) => void;

export interface EmitterStructure<T> {
  on: (callback: Listener<T>) => void;
  off: (callback: Listener<T>) => void;
  emit: (payload: T) => void;
}
