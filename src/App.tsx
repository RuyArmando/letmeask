
import { BrowserRouter, Route } from "react-router-dom";

import { AuthContexProvider } from "./contexts/AuthContext";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

function App() {
  return (
    <BrowserRouter>
      <AuthContexProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContexProvider>
    </BrowserRouter>
  );
}

export default App;
