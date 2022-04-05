import logo from "./logo.svg";
import "./App.css";
//import Productview from "./Components/Productview";
import Login from "./Components/Login";
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Register from "./Components/Register";
import Productview from "./Components/Productview";
import Cartlist from "./Components/Cartlist";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/productview" exact component={Productview} />
            <Route path="/cartlist" exact component={Cartlist} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
