interface ExercisesReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  hoursPerDay: number[],
  targetAverageHoursPerDay: number
): ExercisesReport => {
  const average =
    hoursPerDay.reduce((acc, h) => (acc += h), 0) / hoursPerDay.length;

  let rating = (average / targetAverageHoursPerDay) * 3;
  if (rating > 3) rating = 3;
  if (rating < 1) rating = 1;

  let ratingDescription = null;
  if (rating <= 1) ratingDescription = 'did you even try?';
  else if (rating < 2)
    ratingDescription = "it's hard, but you can do it better next time";
  else if (rating < 3) ratingDescription = 'not too bad but could be better';
  else ratingDescription = 'congratulations you reach the goal';

  let result: ExercisesReport = {
    periodLength: hoursPerDay.length,
    trainingDays: hoursPerDay.reduce(
      (acc, hours) => (acc += hours > 0 ? 1 : 0),
      0
    ),
    success: average >= targetAverageHoursPerDay,
    rating,
    ratingDescription,
    target: targetAverageHoursPerDay,
    average,
  };

  return result;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
