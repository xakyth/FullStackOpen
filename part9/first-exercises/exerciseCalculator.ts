import { isNumber } from './util';

export interface ExercisesReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExercisesData {
  targetAverageHoursPerDay: number;
  hoursPerDay: number[];
}

const parseArgs = (): ExercisesData => {
  if (process.argv.length < 4) throw new Error('too few arguments!');

  if (!isNumber(process.argv[2]))
    throw new Error('target average hours per day should be a number!');
  const targetAverageHoursPerDay = Number(process.argv[2]);

  const hoursPerDay: number[] = [];
  for (let i = 3; i < process.argv.length; i++) {
    if (!isNumber(process.argv[i]))
      throw new Error('hours per day should be a number');
    hoursPerDay.push(Number(process.argv[i]));
  }
  return {
    targetAverageHoursPerDay,
    hoursPerDay,
  };
};

export const calculateExercises = (
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

  const result: ExercisesReport = {
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

try {
  const { targetAverageHoursPerDay, hoursPerDay } = parseArgs();
  console.log(calculateExercises(hoursPerDay, targetAverageHoursPerDay));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}
