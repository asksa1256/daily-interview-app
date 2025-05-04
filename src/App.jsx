import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Review from "./pages/Review";
import HiddenQuestions from "./pages/HiddenQuestions";
import "./reset.css";
import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review />} />
        <Route path="/hidden" element={<HiddenQuestions />} />
      </Routes>
    </Router>
  );
}

export default App;
