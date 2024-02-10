import { NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const addPatient = (
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
): Patient | undefined => {
  const newPatient: Patient = {
    id: uuid(),
    dateOfBirth,
    gender,
    name,
    occupation,
    ssn,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
};
