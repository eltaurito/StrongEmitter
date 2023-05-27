// type FunctionType = <EventType, Payload>(
//   eventType: EventType,
//   callback: (payload: Payload) => void
// ) => void;

// interface StrongEmitterBusStructure {
//   on: FunctionType;
// }

type StrongEmitterBusItem<ItemType, ItemPayload> = {
  type: ItemType;
  payload: ItemPayload;
};

export class StrongEmitterBus<
  T extends StrongEmitterBusItem<T["type"], T["payload"]>
> {
  emit<ItemType extends T["type"]>(eventType: ItemType) {
    console.log(eventType);
  }

  on<ItemType extends T["type"]>(
    eventType: ItemType,
    cb: (payload: Extract<T, { type: ItemType }>["payload"]) => void
  ) {
    console.log(eventType, cb);
  }
}

type StrongEmitterBusItems =
  | StrongEmitterBusItem<"onNumberEmitted", number>
  | StrongEmitterBusItem<"onStringEmitted", string>;

const strongEmitterBus = new StrongEmitterBus<StrongEmitterBusItems>();
strongEmitterBus.on("onNumberEmitted", (payload) => {});
strongEmitterBus.on("onStringEmitted", (payload) => {});
strongEmitterBus.emit("");

type CustomPayload = {
  value1: number;
  value2: string;
};
strongEmitterBus.on("onCustomPayloadEmitted", (value: CustomPayload) => {});
