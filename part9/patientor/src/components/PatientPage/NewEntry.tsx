import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import patientsService from '../../services/patients';
import { useParams } from 'react-router-dom';
import { EntryWithoutId, Patient } from '../../types';
import { parseHealthCheckRating } from '../../utils';

const containerStyle = { borderStyle: 'dashed', marginTop: 10, padding: 10 };

interface Props {
  setNotification: (message: string) => void;
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

const NewEntry = (props: Props) => {
  const params = useParams();
  const patientId = params.id;
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  if (!patientId) return null;

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry: EntryWithoutId = {
      type: 'HealthCheck',
      description,
      date,
      specialist,
      healthCheckRating: parseHealthCheckRating(rating),
    };
    if (diagnosisCodes.length > 0) {
      newEntry.diagnosisCodes = diagnosisCodes.split(', ');
    }

    patientsService
      .addEntry(patientId, newEntry)
      .then((addedEntry) => {
        const updatedPatient = { ...props.patient };
        updatedPatient.entries.push(addedEntry);
        props.setPatient(updatedPatient);
      })
      .catch((error) => {
        let errorMessage = '';
        if (error instanceof Error) {
          errorMessage += error.message;
        }
        props.setNotification(errorMessage);
      });
  };

  return (
    <div style={containerStyle}>
      <h3>New HealthCheck entry</h3>
      <form onSubmit={entryCreation}>
        <TextField
          label='Description'
          variant='standard'
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <br />
        <TextField
          label='Date'
          variant='standard'
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <br />
        <TextField
          label='Specialist'
          variant='standard'
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <br />
        <TextField
          label='Healthcheck rating'
          variant='standard'
          value={rating}
          onChange={({ target }) => setRating(target.value)}
        />
        <br />
        <TextField
          label='Diagnosis codes'
          variant='standard'
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <Box
          display='flex'
          justifyContent='space-between'
          marginBlockStart='20px'
        >
          <Button type='reset' variant='contained' color='error'>
            cancel
          </Button>
          <Button type='submit' variant='contained'>
            add
          </Button>
        </Box>
        <div></div>
      </form>
    </div>
  );
};

export default NewEntry;
