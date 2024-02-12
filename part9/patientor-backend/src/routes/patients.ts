import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient } from '../utils';
import { EntryWithoutId } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const patient = patientsService.findById(id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ error: `Patient with ${id} not found!` });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  const { id } = req.params;
  const newEntry: EntryWithoutId = req.body as EntryWithoutId;

  const addedEntry = patientsService.addEntryToPatient(id, newEntry);

  res.json(addedEntry);
});

export default router;
