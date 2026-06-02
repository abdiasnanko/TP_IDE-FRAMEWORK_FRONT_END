import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/users/leaderboard")
      .then((r) => r.json())
      // ✅ Correction : on lit data.leaderboard et non data directement
      .then((data) => {
        setScores(data.leaderboard || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur leaderboard :", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h1>Chargement du classement...</h1>;

  return (
    <div>
      <h1>🏆 Classement général</h1>
      {scores.length === 0 ? (
        <p>Aucun score enregistré pour le moment.</p>
      ) : (
        scores.map((entry, index) => (
          <div key={index}>
            <span>{index + 1}. {entry.pseudo}</span>
            <span> — {entry.bestScore} pts</span>
          </div>
        ))
      )}
      <button onClick={() => navigate("/")}>
        Retour à l'accueil
      </button>
    </div>
  );
}

export default Leaderboard;