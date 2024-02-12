import {
  Entry,
  EntryWithoutId,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../types';
import { v1 as uuid } from 'uuid';

import patients from '../../data/patientsFull';

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

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

const addPatient = (newPatient: NewPatient): Patient => {
  const patient: Patient = {
    id: uuid(),
    ...newPatient,
  };
  patients.push(patient);
  return patient;
};

const addEntryToPatient = (
  id: string,
  newEntry: EntryWithoutId
): Entry | undefined => {
  const patient = findById(id);
  if (!patient) return undefined;

  const addedEntry = {
    id: uuid(),
    ...newEntry,
  };
  patient.entries.push(addedEntry);

  return addedEntry;
};

const updatePatient = (updatedPatient: Patient): Patient => {
  const index = patients.findIndex((p) => p.id === updatedPatient.id);
  if (index != -1) {
    delete patients[index];
  }
  patients.push(updatedPatient);
  return updatedPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  updatePatient,
  addEntryToPatient,
};
