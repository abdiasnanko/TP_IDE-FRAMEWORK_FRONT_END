import {
  useContext,
  useEffect,
  useMemo
} from "react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  UserContext
} from "../context/UserContext";

function Results() {

  const location = useLocation();

  const navigate =
    useNavigate();

  const score =
    location.state?.score || 0;

  const total =
    location.state?.total || 0;

  const {
    pseudo,
    bestScore,
    setBestScore
  } = useContext(UserContext);

  const ratio = useMemo(() => {

    return total > 0
      ? ((score / total) * 100)
          .toFixed(2)
      : 0;

  }, [score, total]);

  useEffect(() => {

    if (score > bestScore) {

      setBestScore(score);
    }

  }, [score]);

  function handleBackHome() {

    navigate("/");
  }

  return (

    <div>

      <h1>Résultats</h1>

      <h2>
        Joueur : {pseudo}
      </h2>

      <h2>
        Score : {score}
      </h2>

      <h2>
        Meilleur Score : {bestScore}
      </h2>

      <h2>
        Ratio : {ratio}%
      </h2>

      <button
        onClick={handleBackHome}
      >
        Retour à l'accueil
      </button>

    </div>
  );
}

export default Results;