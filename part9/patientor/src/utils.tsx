import { Diagnosis, Gender, HealthCheckRating } from './types';

export const getGenderSymbol = (gender: Gender): string => {
  switch (gender) {
    case Gender.Male:
      return '♂';
    case Gender.Female:
      return '♀';
    case Gender.Other:
      return '⚪';
    default:
      return '';
  }
};

export const getDiagnosisName = (code: string, diagnoses: Diagnosis[]) => {
  const diagnosisName = diagnoses.find((d) => d.code === code);
  if (!diagnosisName) return '';
  return diagnosisName.name;
};

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isHealthCheckRating = (obj: unknown): obj is HealthCheckRating => {
  return (
    Boolean(Number(obj)) ||
    Object.values(HealthCheckRating).includes(Number(obj))
  );
};

export const parseHealthCheckRating = (object: unknown): HealthCheckRating => {
  if (!object) throw new Error('Incorrect health check rating: ' + object);
  if (isString(object)) object = Number(object);
  if (!isHealthCheckRating(object)) {
    throw new Error('Incorrect health check rating: ' + object);
  }

  return object;
};
