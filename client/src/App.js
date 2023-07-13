import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/signin'} element={<SignIn />} />
          <Route path={'/signup'} element={<SignUp />} />
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
