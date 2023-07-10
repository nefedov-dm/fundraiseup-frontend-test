export type ExerciseEntityState = {
  word: string;
  anwserLetters: string[];
  questionLetters: string[];
  errorCount: number;
  errorLimit: number;
};

export class ExerciseEntity {
  private word: string;

  private anwserLetters: string[];
  private questionLetters: string[];

  private errorCount = 0;
  private errorLimit: number;

  private constructor(state: ExerciseEntityState) {
    this.word = state.word;

    this.anwserLetters = state.anwserLetters;
    this.questionLetters = state.questionLetters;

    this.errorCount = state.errorCount;
    this.errorLimit = state.errorLimit;
  }

  static create(word: string, errorLimit: number): ExerciseEntity {
    return new ExerciseEntity({
      word: word,
      anwserLetters: [],
      questionLetters: [...word].sort(() => Math.random() - Math.random()),
      errorCount: 0,
      errorLimit: errorLimit,
    });
  }

  static fromState(state: ExerciseEntityState): ExerciseEntity {
    return new ExerciseEntity(state);
  }

  public getWord(): string {
    return this.word;
  }

  public getWordLetters(): string[] {
    return [...this.word];
  }

  public getAnswerLetters(): string[] {
    return this.anwserLetters;
  }

  public getQuestionLetters(): string[] {
    return this.questionLetters;
  }

  public getErrorsCount(): number {
    return this.errorCount;
  }

  public isSuccessed(): boolean {
    return this.anwserLetters.length === this.word.length;
  }

  public isFailed(): boolean {
    return this.errorCount >= this.errorLimit;
  }

  public isDone(): boolean {
    return this.isFailed() || this.isSuccessed();
  }

  public inputLetter(questionIndex: number): boolean {
    const inputLetter = this.questionLetters[questionIndex];
    const testedLetter = this.word[this.anwserLetters.length];

    if (this.isSuccessed() || this.isFailed()) {
      console.warn("Excersice already comletted");
      return false;
    }

    if (!testedLetter) {
      console.warn("Invalid attemp", this.word, testedLetter, inputLetter);
      return false;
    }

    if (testedLetter.toLowerCase() !== inputLetter?.toLowerCase()) {
      this.errorCount += 1;
      return false;
    }

    this.anwserLetters.push(inputLetter);
    this.questionLetters = this.questionLetters.filter(
      (_, index) => index !== questionIndex,
    );
    return true;
  }

  public toState(): ExerciseEntityState {
    return {
      word: this.word,
      anwserLetters: this.anwserLetters,
      questionLetters: this.questionLetters,
      errorCount: this.errorCount,
      errorLimit: this.errorLimit,
    };
  }
}
