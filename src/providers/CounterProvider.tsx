import * as React from "react";

const CounterContext = React.createContext<
  (Record<"increment" | "decrement" | "reset", () => void> & { count: number }) | null
>(null);

type CounterProps = React.PropsWithChildren<{ defaultCount?: number }>;

export const useCounter = () => {
  const counterContext = React.useContext(CounterContext);

  if (counterContext == null) {
    throw new Error("useCounter must be used within Counter");
  }

  return counterContext;
};

export const Counter = ({ children, defaultCount = 0 }: CounterProps) => {
  const [count, setCount] = React.useState(defaultCount);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(defaultCount);

  return <CounterContext.Provider value={{ count, increment, decrement, reset }}>{children}</CounterContext.Provider>;
};

const Count = () => {
  const { count } = useCounter();

  return <h1>Count: {count}</h1>;
};

const CountIncrementButton = ({ children }: React.PropsWithChildren) => {
  const { increment } = useCounter();

  return <button onClick={increment}>{children}</button>;
};

const CounterDecrementButton = ({ children }: React.PropsWithChildren) => {
  const { decrement } = useCounter();

  return <button onClick={decrement}>{children}</button>;
};

const CounterResetButton = ({ children }: React.PropsWithChildren) => {
  const { reset } = useCounter();

  return <button onClick={reset}>{children}</button>;
};

Counter.Count = Count;
Counter.IncrementButton = CountIncrementButton;
Counter.DecrementButton = CounterDecrementButton;
Counter.ResetButton = CounterResetButton;
