import { GO_NEXT_QUESTION, START_QUIZ, END_QUIZ, SHOW_QUIZ, EMPTY_ACTION, SHOW_RESULT_PANEL, FILL_BADGES, START_APP } from "../constants";
import { Uanswer, Badge} from '../reducers/UquizReducer';
import { Quiz } from "../reducers/QuizReducer";

  //---------Generic Action
  export interface Action {
    type: string;
    payload?: {};
    params?: {};
  }

    /////////Start Quiz
    export interface StartQuizAction extends Action {
      payload: StartQuizPayload;
  }
    export interface StartQuizPayload{
      quiz: Quiz;
  }
    /////////End Quiz
    export interface EndQuizAction extends Action {
      payload: EndQuizPayload;
  }
    export interface EndQuizPayload{
      quiz: Quiz;
      countryImg: string
  }
    /////////GoNextQuestion
    export interface GoNextQuestionAction extends Action {
      payload: GoNextQuestionPayload;
  }
    export interface GoNextQuestionPayload{
      uAnswer: Uanswer;
  }

   /////////ShowQuiz
   export interface ShowQuizAction extends Action {
    payload: boolean;
}

  /////////ShowResultPanel
  export interface ShowResultPanelAction extends Action {
    payload: boolean;
}


///////// Fill Badges ///////
export interface FillbadgesAction extends Action {
  payload: FillbadgesPayload;
}
export interface FillbadgesPayload{
  badges: Badge[];
}


const ActionCreators = {
  goNextQuestion: (payload: GoNextQuestionPayload) => ({ type: GO_NEXT_QUESTION, payload: payload}),
  emptyAction: () => ({ type: EMPTY_ACTION }),
  startQuiz: () => ({ type: START_QUIZ }),
  endQuiz: (payload: EndQuizPayload) => ({ type: END_QUIZ, payload: payload}),
  showQuiz: (payload: boolean) => ({ type: SHOW_QUIZ, payload: payload}),
  showResultPanel: (payload: boolean) => ({ type: SHOW_RESULT_PANEL, payload: payload}),
  fillbadges: (payload:FillbadgesPayload) => ({ type: FILL_BADGES, payload: payload}),
  startApp: () => ({ type: START_APP }),
}

  export default ActionCreators;