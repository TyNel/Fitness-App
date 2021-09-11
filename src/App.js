import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import { withRouter, BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./UserLogin/Login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default withRouter(App);
