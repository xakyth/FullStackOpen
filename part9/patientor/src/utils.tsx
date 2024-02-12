import { Diagnosis, Gender } from './types';

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
