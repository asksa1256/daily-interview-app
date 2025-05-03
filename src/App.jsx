import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Review from "./pages/Review";
import "./reset.css";
import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;
