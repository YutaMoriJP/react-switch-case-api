import { Switch, Case, Default } from "./switch-case";
import { Counter, useCounter } from "./providers/CounterProvider";

const SwitchExample = () => {
  const { count } = useCounter();
  return (
    <Switch>
      <Case condition={5 > count}>
        <p>Count is less than 5.</p>
      </Case>
      <Case condition={10 > count && count > 5}>
        <p>Count is less than 10 but greater than 5.</p>
      </Case>
      <Case condition={15 > count && count >= 10}>
        <p>Count is less than 15 but greater than 10.</p>
      </Case>
      <Default>
        <p>Count is bigger than 15.</p>
      </Default>
    </Switch>
  );
};

export const App = () => (
  <Counter>
    <Counter.Count />
    <Counter.IncrementButton>increment</Counter.IncrementButton>
    <Counter.DecrementButton>decrement</Counter.DecrementButton>
    <Counter.ResetButton>reset</Counter.ResetButton>

    <SwitchExample />
  </Counter>
);

App.displayName = "App";
