import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import MDashBoard from "./MobileDashboard/DashBoard"
import { withRouter, BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./UserLogin/Login";
import Register from "./UserLogin/Register";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/Dashboard/:id" exact={true} component={Dashboard} />
        <Route path="/Register" component={Register} />
        <Route path="/Dashboard/mobile/:id" exact={true} component={MDashBoard} />
      </Switch>
    </BrowserRouter>
  );
}

export default withRouter(App);
