import { FILL_QUIZ, FILL_DISTRACTOR, FILL_QUESTION, IGNORE_QUESTION, RUN_QUESTION, RUN_DISTRACTOR, RUN_QUESTIONS_LIST } from "../constants";
import { Location } from "../reducers/GeoReducer";
import { Distractor, Question } from "../reducers/QuizReducer";

  //---------Generic Action
  export interface Action {
    type: string;
    payload?: {};
    params?: {};
  }

 

  /////////FillQuiz
  export interface FillQuizAction extends Action {
    payload: FillQuizPayload;
}
  export interface FillQuizPayload{
    location: Location;
}

  /////////RunDistractor
  export interface RunDistractorAction extends Action {
    payload: RunDistractorPayload;
}
  export interface RunDistractorPayload{
    location: Location;
}

 /////////FillDistractor
 export interface FillDistractorAction extends Action {
    payload: FillDistractorPayload;
}
  export interface FillDistractorPayload{
    distractor: Distractor;
}

/////////FillQuestion
export interface FillQuestionAction extends Action {
  payload: FillQuestionPayload;
}
export interface FillQuestionPayload{
  question: Question;
}
/////
export interface QuestionParams {
  theme: string;
  type: string;
  isDistractor: boolean;
}

export interface RunQuestionAction extends Action {
  params: QuestionParams
}


const ActionCreators = {
  runDistractor: (payload: RunDistractorPayload) => ({ type: RUN_DISTRACTOR, payload: payload}),

    fillQuiz: (payload: FillQuizPayload) => ({ type: FILL_QUIZ, payload: payload}),
    fillDistractors: (payload: FillDistractorPayload) => ({ type: FILL_DISTRACTOR, payload: payload}),
    fillQuestion: (payload: FillQuestionPayload) => ({ type: FILL_QUESTION, payload: payload}),
    ignoreQuestion: () => ({ type: IGNORE_QUESTION}),
    runQuestion: (params:QuestionParams) => ({ type: RUN_QUESTION, params: params}),
    runQuestionsList: () => ({ type: RUN_QUESTIONS_LIST}),
  }

  export default ActionCreators;