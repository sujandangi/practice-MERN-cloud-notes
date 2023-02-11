import "./App.css";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import {Routes, Route, BrowserRouter} from "react-router-dom";


function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Notes />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
