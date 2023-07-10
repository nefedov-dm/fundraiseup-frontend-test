import { ExerciseEntity, ExerciseEntityState } from "@domain";

export interface ExercisesGroupRepository {
  fetchAll: () => string[];
}

export type ExercisesGroupState = {
  exercises: ExerciseEntityState[];
  currentIndex: number;
};

type ExercisesGroupParams = {
  repository: ExercisesGroupRepository;
  size: number;
  errorLimit: number;
};

export class ExercisesGroupEntity {
  private exercises: ExerciseEntity[] = [];
  private currentIndex = 0;

  private constructor(exercises: ExerciseEntity[], currentIndex: number) {
    this.exercises = exercises;
    this.currentIndex = currentIndex;
  }

  static create(params: ExercisesGroupParams): ExercisesGroupEntity {
    const exercises = params.repository
      .fetchAll()
      .sort(() => Math.random() - Math.random())
      .slice(0, params.size)
      .map((word) => ExerciseEntity.create(word, params.errorLimit));
    return new ExercisesGroupEntity(exercises, 0);
  }

  static fromState(state: ExercisesGroupState): ExercisesGroupEntity {
    const exercises = state.exercises.map((exercise) =>
      ExerciseEntity.fromState(exercise),
    );
    return new ExercisesGroupEntity(exercises, state.currentIndex);
  }

  public getCurrentExercise(): ExerciseEntity {
    return this.exercises[this.currentIndex];
  }

  public getCurrentExerciseNumber(): number {
    return this.currentIndex + 1;
  }

  public getSize(): number {
    return this.exercises.length;
  }

  public getSuccessedExercisesWithoutErrors(): ExerciseEntity[] {
    return this.exercises.filter(
      (exercise) => exercise.isSuccessed() && exercise.getErrorsCount() === 0,
    );
  }

  public getSuccessedExercisesWithoutErrorsCount(): number {
    return this.getSuccessedExercisesWithoutErrors().length;
  }

  public getErrorsCount(): number {
    return this.exercises.reduce(
      (acc, exercise) => (acc += exercise.getErrorsCount()),
      0,
    );
  }

  public getExerciseWithMostErrorsCount(): ExerciseEntity | undefined {
    return this.exercises.reduce<ExerciseEntity | undefined>(
      (acc, exercise) => {
        if (!acc && exercise.getErrorsCount() > 0) {
          return exercise;
        }
        if (acc && acc.getErrorsCount() < exercise.getErrorsCount()) {
          return exercise;
        }
        return acc;
      },
      undefined,
    );
  }

  public isDone(): boolean {
    return this.exercises.every((exercise) => exercise.isDone());
  }

  public nextExercise(): ExerciseEntity | undefined {
    this.currentIndex += 1;
    return this.exercises[this.currentIndex];
  }

  public toExercise(number: number): ExerciseEntity | undefined {
    this.currentIndex = number - 1;
    return this.exercises[this.currentIndex];
  }

  public toState(): ExercisesGroupState {
    return {
      exercises: this.exercises.map((exercise) => exercise.toState()),
      currentIndex: this.currentIndex,
    };
  }
}
