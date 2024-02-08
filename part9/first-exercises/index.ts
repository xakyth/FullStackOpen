import express from 'express';
import { isNumber } from './util';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  let { height, weight } = req.query;
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
