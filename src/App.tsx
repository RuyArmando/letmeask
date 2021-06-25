import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AuthContexProvider } from "./contexts/AuthContext";

import { AdminRoom } from "./pages/AdminRoom";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

function App() {
  return (
    <BrowserRouter>
      <AuthContexProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
          <Route path="*" exact component={Home} />
        </Switch>
      </AuthContexProvider>
    </BrowserRouter>
  );
}

export default App;
