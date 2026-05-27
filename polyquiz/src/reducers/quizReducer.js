export const initialState = {

  currentQuestion: 0,

  score: 0,

  finished: false
};

export function quizReducer(
  state,
  action
) {

  switch (action.type) {

    case "ANSWER_QUESTION":

      const isCorrect =
        action.payload.answer ===
        action.payload.correct;

      return {

        ...state,

        score: isCorrect
          ? state.score + 1
          : state.score,

        currentQuestion:
          state.currentQuestion + 1
      };

    case "FINISH_QUIZ":

      return {

        ...state,

        finished: true
      };

    default:

      return state;
  }
}