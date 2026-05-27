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

  const {
    data: questions,
    loading,
    error
  } = useFetch("/questions.json");

  const [state, dispatch] =
    useReducer(
      quizReducer,
      initialState
    );

  const [timeLeft, setTimeLeft] =
    useState(60);

  const intervalRef = useRef(null);

  const navigate =
    useNavigate();

  useEffect(() => {

    intervalRef.current =
      setInterval(() => {

        setTimeLeft((prev) => {

          if (prev <= 1) {

            clearInterval(
              intervalRef.current
            );

            dispatch({
              type: "FINISH_QUIZ"
            });
      navigate("/resultats", {
        state: {
          score: state.score,
          total: questions.length
        }
      });
            return 0;
          }

          return prev - 1;
        });

      }, 1000);

    return () =>
      clearInterval(intervalRef.current);

  }, []);

  if (loading)
    return <h1>Chargement...</h1>;

  if (error)
    return <h1>{error}</h1>;

  const question =
    questions[state.currentQuestion];

  if (!question) {

  navigate("/resultats", {
    state: {
      score: state.score,
      total: questions.length
    }
  });

  return null;
}

  function handleAnswer(option) {

    dispatch({
      type: "ANSWER_QUESTION",
      payload: {
        answer: option,
        correct:
          question.bonne_reponse
      }
    });
  }

  return (

    <div>

      <h1>Temps : {timeLeft}</h1>

      <h2>{question.libelle}</h2>

      {
        question.options.map(
          (option) => (

            <button
              key={option}
              onClick={() =>
                handleAnswer(option)
              }
            >
              {option}
            </button>
          )
        )
      }

    </div>
  );
}

export default QuizEngine;