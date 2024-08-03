export interface QuizQuestion {
  questionType: string;
  question: string;
  word: string;
  options: string[];
  answer: string;
  audioUrl: string;
}

export interface Section {
  sectionDescription: string;
  questions: QuizQuestion[];
}

export interface Category {
  [key: string]: any;
  beginner: Section;
  intermediate: Section;
  advanced: Section;
}

export interface Categories {
  [key: string]: Category;
  vocabulary: Category;
  sentenceBuilding: Category;
  dialogueSimulation: Category;
}
