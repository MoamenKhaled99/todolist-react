import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./Styles/TodoList.css";
import "./Styles/TodoForm.css";
import "./Styles/TodoItem.css";
import "./Styles/Navbar.css";
import "./Styles/SearchBar.css";
import "./Styles/FilterSelect.css";
import "./Styles/DeleteTodo.css";
import "./Styles/EditTodo.css";
import "./Styles/App.css";
import "./Styles/404.css";
import NotFound from "./Components/404";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
