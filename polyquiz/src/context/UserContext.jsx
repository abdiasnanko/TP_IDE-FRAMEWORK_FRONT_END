import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {

  // Initialise le pseudo depuis localStorage si déjà connecté
  const [pseudo, setPseudo] = useState(() => {
    return localStorage.getItem("pseudo") || null;
  });

  const [bestScore, setBestScore] = useState(() => {
    const savedBestScore = localStorage.getItem("bestScore");
    return savedBestScore ? JSON.parse(savedBestScore) : 0;
  });

  // Sauvegarde le pseudo dans localStorage à chaque changement
  useEffect(() => {
    if (pseudo) {
      localStorage.setItem("pseudo", pseudo);
    } else {
      localStorage.removeItem("pseudo");
    }
  }, [pseudo]);

  useEffect(() => {
    localStorage.setItem("bestScore", JSON.stringify(bestScore));
  }, [bestScore]);

  return (
    <UserContext.Provider
      value={{
        pseudo,
        setPseudo,
        bestScore,
        setBestScore
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;