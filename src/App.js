import { Switch, Route } from "react-router-dom";

import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import AdminPanel from "./Components/Admin";

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/admin" component={AdminPanel} />
  </Switch>
);

export default App;
