import "./App.css";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Notes />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
