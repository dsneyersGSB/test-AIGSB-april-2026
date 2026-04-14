export type QuestionCategory = 'behavioral' | 'case' | 'situational';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type AnswerMode = 'freeform' | 'multiple-choice';

export interface UserProfile {
  industry: string;
  experienceLevel: string;
  careerGoals: string;
}

export interface GenerateQuestionRequest {
  category: QuestionCategory;
  difficulty: Difficulty;
  answerMode: AnswerMode;
  jobDescription?: string;
  userProfile?: UserProfile;
}

export interface GeneratedQuestion {
  question: string;
  context: string | null;
  options: string[] | null;
  category: QuestionCategory;
  difficulty: Difficulty;
}

export interface EvaluateAnswerRequest {
  question: GeneratedQuestion;
  answer: string;
  answerMode: AnswerMode;
  userProfile?: UserProfile;
  jobDescription?: string;
}

export interface StarEvaluation {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface Feedback {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  starEvaluation: StarEvaluation | null;
  sampleAnswer: string;
}

export interface InterviewResult {
  question: GeneratedQuestion;
  answer: string;
  answerMode: AnswerMode;
  feedback: Feedback;
}
