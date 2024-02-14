import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  NativeSelect,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import patientsService from '../../services/patients';
import { useParams } from 'react-router-dom';
import {
  Diagnosis,
  EntryType,
  EntryWithoutId,
  HealthCheckRating,
  Patient,
} from '../../types';
import {
  assertNever,
  parseEntryType,
  parseHealthCheckRating,
} from '../../utils';

const containerStyle = { borderStyle: 'dashed', marginTop: 10, padding: 10 };
const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 500,
    },
  },
};

interface Props {
  setNotification: (message: string) => void;
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  diagnoses: Diagnosis[];
}

const NewEntry = (props: Props) => {
  const params = useParams();
  const patientId = params.id;
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

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
      newEntry.diagnosisCodes = diagnosisCodes;
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
          <div>
            <InputLabel variant='standard' htmlFor='uncontrolled-native'>
              Health Rating
            </InputLabel>
            <NativeSelect onChange={({ target }) => setRating(target.value)}>
              <option value={HealthCheckRating.Healthy}>Healthy</option>
              <option value={HealthCheckRating.LowRisk}>Low Risk</option>
              <option value={HealthCheckRating.HighRisk}>High Risk</option>
              <option value={HealthCheckRating.CriticalRisk}>
                Critical Risk
              </option>
            </NativeSelect>
          </div>
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
            <InputLabel htmlFor='sickleave-start-date'>start</InputLabel>
            <Input
              type='date'
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
            <br />
            <InputLabel htmlFor='sickleave-end-date'>end</InputLabel>
            <Input
              type='date'
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </div>
        );
      case EntryType.Hospital:
        return (
          <div>
            <Typography>Discharge</Typography>
            <InputLabel htmlFor='discharge-date'>Date</InputLabel>
            <Input
              type='date'
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <br />
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

  const handleDiagnosisCodesChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
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
        <InputLabel htmlFor='new-entry-date'>Date</InputLabel>
        <Input
          id='new-entry-datea'
          type='date'
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
        <FormControl sx={{ width: 200 }}>
          <InputLabel htmlFor='diagnosis-codes' id='diagnosis-codes-label'>
            Diagnosis Codes
          </InputLabel>
          <Select
            id='diagnosis-codes'
            labelId='diagnosis-codes-label'
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
            input={<OutlinedInput label='Diagnosis Codes' />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {props.diagnoses.map((d) => {
              return (
                <MenuItem key={d.code} value={d.code}>
                  <Checkbox checked={diagnosisCodes.indexOf(d.code) > -1} />
                  <ListItemText primary={`${d.code} ${d.name}`} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
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
