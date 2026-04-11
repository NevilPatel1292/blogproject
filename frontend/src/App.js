import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogComponent from "./BlogComponent";
import Login from "./Login";
import Navbar from "./Navbar";
import BlogDetails from "./BlogDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<BlogComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog/:id" element={<BlogDetails />} /> {/* NEW */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;