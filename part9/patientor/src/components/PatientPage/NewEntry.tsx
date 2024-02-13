import {
  Box,
  Button,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import patientsService from '../../services/patients';
import { useParams } from 'react-router-dom';
import { EntryType, EntryWithoutId, Patient } from '../../types';
import {
  assertNever,
  parseEntryType,
  parseHealthCheckRating,
} from '../../utils';

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
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);

  const [rating, setRating] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  if (!patientId) return null;

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    let newEntry: EntryWithoutId;
    switch (entryType) {
      case EntryType.HealthCheck:
        newEntry = {
          description,
          date,
          specialist,
          type: entryType,
          healthCheckRating: parseHealthCheckRating(rating),
        };
        break;
      case EntryType.OccupationalHealthcare:
        newEntry = {
          description,
          date,
          specialist,
          type: entryType,
          employerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        };
        break;
      case EntryType.Hospital:
        newEntry = {
          description,
          date,
          specialist,
          type: entryType,
          discharge: {
            criteria: dischargeCriteria,
            date: dischargeDate,
          },
        };
        break;
      default:
        return assertNever(entryType);
    }

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

  const getFieldsBasedOnEntryType = () => {
    switch (entryType) {
      case EntryType.HealthCheck:
        return (
          <TextField
            label='Healthcheck rating'
            variant='standard'
            value={rating}
            onChange={({ target }) => setRating(target.value)}
          />
        );
      case EntryType.OccupationalHealthcare:
        return (
          <div>
            <TextField
              label='Employer name'
              variant='standard'
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <Typography>Sickleave</Typography>
            <TextField
              label='start'
              variant='standard'
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
            <br />
            <TextField
              label='end'
              variant='standard'
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </div>
        );
      case EntryType.Hospital:
        return (
          <div>
            <Typography>Sickleave</Typography>
            <TextField
              label='Date'
              variant='standard'
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label='Criteria'
              variant='standard'
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </div>
        );
      default:
        assertNever(entryType);
    }
  };

  return (
    <div style={containerStyle}>
      <h3>New entry</h3>
      <div>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Entry Type
        </InputLabel>
        <NativeSelect
          onChange={(event) => setEntryType(parseEntryType(event.target.value))}
        >
          <option value={EntryType.HealthCheck}>Health Check</option>
          <option value={EntryType.OccupationalHealthcare}>
            Occuapational Healthcare
          </option>
          <option value={EntryType.Hospital}>Hospital</option>
        </NativeSelect>
      </div>
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
          label='Diagnosis codes'
          variant='standard'
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <br />
        {getFieldsBasedOnEntryType()}
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
