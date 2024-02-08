import express from 'express';
import { isNumber } from './util';
import { calculateBmi } from './bmiCalculator';
import { ExercisesReport, calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!(isNumber(height) && isNumber(weight))) {
    res.json({
      error: 'malformatted parameters',
    });
  }
  const bmi = calculateBmi(Number(height), Number(weight));
  res.json({
    weight,
    height,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!target || !daily_exercises) {
    res.status(400).json({ error: 'parameters missing' });
  }
  const hoursPerDay: number[] = [];
  try {
    if (isNaN(Number(target))) throw new Error('target is not number');
    (daily_exercises as string[]).forEach((hours) => {
      if (isNaN(Number(hours))) {
        throw new Error('daily exercises is not an array of numbers');
      }
      hoursPerDay.push(Number(hours));
    });
  } catch (error: unknown) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const result: ExercisesReport = calculateExercises(
    hoursPerDay,
    Number(target)
  );
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
