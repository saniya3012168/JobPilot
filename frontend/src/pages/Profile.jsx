import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: ""
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Profile saved (connect backend later)");
  };

  return (
    <div>
      <Navbar />
      <h2>Profile</h2>

      <input
        name="name"
        placeholder="Name"
        value={profile.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={profile.email}
        onChange={handleChange}
      />

      <textarea
        name="bio"
        placeholder="Short bio"
        value={profile.bio}
        onChange={handleChange}
      />

      <button onClick={handleSave}>Save Profile</button>
    </div>
  );
}
