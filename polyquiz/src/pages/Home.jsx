import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Home() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { setPseudo } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLogin() {

    // Vérification de base
    if (!name.trim()) {
      setError("Entre un pseudo pour commencer !");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo: name })
      });

      const data = await response.json();

      // Stocker le token JWT dans localStorage
      localStorage.setItem("token", data.token);

      // ✅ Correction : c'est data.user.pseudo et non data.pseudo
      setPseudo(data.user.pseudo);

      navigate("/quiz");

    } catch (err) {
      setError("Erreur de connexion au serveur.");
      console.error(err);
    }
  }

  return (
    <div>
      <h1>🎮 PolyQuiz</h1>
      <input
        type="text"
        placeholder="Entre ton pseudo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
      />
      <button onClick={handleLogin}>Commencer</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Home;