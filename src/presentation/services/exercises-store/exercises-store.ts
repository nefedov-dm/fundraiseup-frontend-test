import { ExercisesGroupEntity } from "@domain";

export class ExercisesStoreService {
  private wasRemoved = false;

  constructor() {}

  set(exercisesGroup: ExercisesGroupEntity): void {
    if (!this.wasRemoved) {
      localStorage.setItem(
        "exercisesGroup",
        JSON.stringify(exercisesGroup.toState()),
      );
    }
  }

  get(): ExercisesGroupEntity | undefined {
    const exercisesGroupState = localStorage.getItem("exercisesGroup");
    if (!exercisesGroupState) {
      return;
    }
    return ExercisesGroupEntity.fromState(JSON.parse(exercisesGroupState));
  }

  remove() {
    this.wasRemoved = true;
    localStorage.removeItem("exercisesGroup");
  }
}
