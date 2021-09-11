import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import { withRouter, BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./UserLogin/Login";
import Register from "./UserLogin/Register";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default withRouter(App);
