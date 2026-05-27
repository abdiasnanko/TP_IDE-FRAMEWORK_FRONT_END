import {
  createContext,
  useEffect,
  useState
} from "react";

export const UserContext =
  createContext();

function UserProvider({ children }) {

  const [pseudo, setPseudo] =
    useState(null);

  const [bestScore, setBestScore] =
    useState(() => {

      const savedBestScore =
        localStorage.getItem(
          "bestScore"
        );

      return savedBestScore
        ? JSON.parse(savedBestScore)
        : 0;
    });

  useEffect(() => {

    localStorage.setItem(
      "bestScore",
      JSON.stringify(bestScore)
    );

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