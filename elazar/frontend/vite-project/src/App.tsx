import Home from "./Home";
import SignIn from "./pages/SignIn";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <h1>
                  <NavLink to="/SignIn"> Press</NavLink>
                </h1>
              }
            />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/Home" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

/*
 
*/
