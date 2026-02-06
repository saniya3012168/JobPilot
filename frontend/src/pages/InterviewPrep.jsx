import { useState } from "react";
import Navbar from "../components/Navbar";

export default function InterviewPrep() {
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  const handleSave = () => {
    if (!notes.trim()) return;
    setSavedNotes([...savedNotes, notes]);
    setNotes("");
  };

  return (
    <div>
      <Navbar />
      <h2>Interview Preparation</h2>

      <textarea
        placeholder="Write interview questions, tips, or preparation notes..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={5}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={handleSave}>Save Note</button>

      <ul>
        {savedNotes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
}
