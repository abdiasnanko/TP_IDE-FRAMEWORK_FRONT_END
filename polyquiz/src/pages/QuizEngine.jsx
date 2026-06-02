import {
  useEffect,
  useReducer,
  useRef,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import useFetch
  from "../hooks/useFetch";

import {
  initialState,
  quizReducer
} from "../reducers/quizReducer";

function QuizEngine() {

  // ✅ On récupère data brut depuis l'API
  const { data, loading, error } = useFetch("http://localhost:5000/api/questions");

  // ✅ Correction : on extrait le tableau questions depuis data.questions
  const questions = data?.questions || [];

  const [state, dispatch] =
    useReducer(quizReducer, initialState);

  const [timeLeft, setTimeLeft] =
    useState(60);

  const intervalRef = useRef(null);

  const navigate = useNavigate();

  // Fonction qui envoie le score au back-end puis redirige
  async function finishQuiz(finalScore) {

    const token = localStorage.getItem("token");

    try {
      await fetch("http://localhost:5000/api/users/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ score: finalScore })
      });
    } catch (err) {
      console.error("Erreur envoi du score :", err);
    }

    navigate("/resultats", {
      state: {
        score: finalScore,
        total: questions.length
      }
    });
  }

  useEffect(() => {

    intervalRef.current = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {

          clearInterval(intervalRef.current);

          dispatch({ type: "FINISH_QUIZ" });

          finishQuiz(state.score);

          return 0;
        }

        return prev - 1;
      });

    }, 1000);

    return () => clearInterval(intervalRef.current);

  }, []);

  if (loading) return <h1>Chargement des questions...</h1>;

  if (error) return <h1>Erreur : {error}</h1>;

  // ✅ Si questions est encore vide (API pas encore prête)
  if (questions.length === 0) return <h1>Chargement des questions...</h1>;

  const question = questions[state.currentQuestion];

  if (!question) {
    // Toutes les questions répondues → on termine
    finishQuiz(state.score);
    return null;
  }

  function handleAnswer(option) {

    dispatch({
      type: "ANSWER_QUESTION",
      payload: {
        answer: option,
        correct: question.correctAnswer
      }
    });
  }

  return (

    <div>

      <h1>⏱️ Temps : {timeLeft}s</h1>

      <h2>
        Question {state.currentQuestion + 1} / {questions.length}
      </h2>

      <h2>{question.text}</h2>

      {
        question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))
      }

    </div>
  );
}

export default QuizEngine;