import { Gender, NewPatient } from './types';

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('object argument should be a type of an object');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'gender' in object &&
    'occupation' in object &&
    'ssn' in object
  ) {
    const newPatient: NewPatient = {
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      gender: parseGender(object.gender),
      name: parseString(object.name),
      occupation: parseString(object.occupation),
      ssn: parseString(object.ssn),
    };
    return newPatient;
  }

  throw new Error('missing parameters...');
};

const isString = (str: unknown): str is string => {
  return typeof str === 'string' || str instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(gender);
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseString = (str: unknown): string => {
  if (!isString(str)) {
    throw new Error('Incorrect input: ' + str);
  }
  return str;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};
