import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Resume() {
  const [resume, setResume] = useState(null);

  const handleUpload = (e) => {
    setResume(e.target.files[0]);
  };

  return (
    <div>
      <Navbar />
      <h2>Resume Management</h2>

      <input type="file" accept=".pdf,.doc,.docx" onChange={handleUpload} />

      {resume && (
        <div style={{ marginTop: "15px" }}>
          <p><strong>Uploaded Resume:</strong></p>
          <p>{resume.name}</p>
        </div>
      )}
    </div>
  );
}
