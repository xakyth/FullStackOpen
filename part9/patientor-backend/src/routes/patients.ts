/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedPatient = patientsService.addPatient(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  );
  if (addedPatient) {
    res.json(addedPatient);
  } else {
    res.sendStatus(400);
  }
});

export default router;
