import { ExercisesGroupRepository } from "@domain";

export class WordsRepository implements ExercisesGroupRepository {
  constructor() {}

  public fetchAll(): string[] {
    return [
      "apple",
      "function",
      "timeout",
      "task",
      "application",
      "data",
      "tragedy",
      "sun",
      "symbol",
      "button",
      "software",
    ];
  }
}
