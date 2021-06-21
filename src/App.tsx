import { ButtonDefault, ButtonCounter } from "./components/Button";

function App() {
  return (
    <div>
      <ButtonDefault text="sou um botão" />
      <ButtonCounter />
      <ButtonDefault>Sou outro botão</ButtonDefault>
      <ButtonCounter />
    </div>
  );
}

export default App;
