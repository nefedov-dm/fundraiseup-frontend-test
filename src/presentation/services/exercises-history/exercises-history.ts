import { ExercisesGroupEntity, ExercisesGroupState } from "@domain";

type ExercisesHistoryState = {
  exercisesGroup: ExercisesGroupState;
};

export class ExercisesHistoryService {
  constructor() {}

  push(exercisesGroup: ExercisesGroupEntity): void {
    window.history.pushState({ exercisesGroup: exercisesGroup.toState() }, "");
  }

  replace(exercisesGroup: ExercisesGroupEntity): void {
    window.history.replaceState(
      { exercisesGroup: exercisesGroup.toState() },
      "",
    );
  }

  get(): ExercisesGroupEntity {
    const { exercisesGroup } = window.history.state as ExercisesHistoryState;
    return ExercisesGroupEntity.fromState(exercisesGroup);
  }
}
