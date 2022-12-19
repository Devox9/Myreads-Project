import "./App.css";
import SearchBooks from "./pages/SearchBooks";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/search" element={<SearchBooks />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
