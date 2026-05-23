import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Plan from "@/pages/Plan";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan" element={<Plan />} />
      </Routes>
    </Router>
  );
}
