import { isNumber } from './util';

interface HeightWeight {
  height: number;
  weight: number;
}

const parseArgs = (): HeightWeight => {
  if (process.argv.length < 4) throw new Error('too few arguments');
  if (process.argv.length > 4) throw new Error('too many arguments');

  if (!isNumber(process.argv[2]) || !isNumber(process.argv[3]))
    throw new Error('provided arguments were not numbers');

  return {
    height: Number(process.argv[2]),
    weight: Number(process.argv[3]),
  };
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters: number = height / 100;

  const bmi: number = weight / Math.pow(heightInMeters, 2);

  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 16.9) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.4) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 24.9) {
    return 'Normal (healthy weight)';
  } else if (bmi < 29.9) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 34.9) {
    return 'Obese (Class I)';
  } else if (bmi < 39.9) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

try {
  const { height, weight } = parseArgs();
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  4;
  console.log(errorMessage);
}
