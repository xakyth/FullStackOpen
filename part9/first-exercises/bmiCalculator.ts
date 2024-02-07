const calculateBmi = (height: number, weight: number): string => {
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

console.log(calculateBmi(179, 66));
