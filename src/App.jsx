import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import KnittingHome from "./knitting/KnittingHome.jsx";
import Gloves from "./knitting/gloves/Gloves.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/knitting" element={<KnittingHome />} />
      <Route path="/knitting/gloves" element={<Gloves />} />
    </Routes>
  );
}
