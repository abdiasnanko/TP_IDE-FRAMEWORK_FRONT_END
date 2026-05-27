import {
  useContext,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  UserContext
} from "../context/UserContext";

function Home() {

  const [name, setName] =
    useState("");

  const { setPseudo } =
    useContext(UserContext);

  const navigate =
    useNavigate();

  function handleLogin() {

    setPseudo(name);

    navigate("/quiz");
  }

  return (

    <div>

      <h1>PolyQuiz</h1>

      <input
        type="text"
        placeholder="Pseudo"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <button onClick={handleLogin}>
        Commencer
      </button>

    </div>
  );
}

export default Home;