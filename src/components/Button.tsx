import { useState } from "react";

type ButtonProps = {
  children?: String;
  text?: String;
};

export function ButtonDefault(props: ButtonProps) {
  return <button>{props.text || props.children}</button>;
}

export function ButtonCounter() {
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <button onClick={increment}>
      {counter}
    </button>
  );
}