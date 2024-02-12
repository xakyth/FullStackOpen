/* eslint-disable @typescript-eslint/no-unused-vars */
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Diagnosis, Entry, HealthCheckRating } from '../../types';
import { assertNever, getDiagnosisName } from '../../utils';

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const inlineStyle = {
  border: 'solid',
  marginBottom: '10px',
  borderRadius: '5px',
  paddingLeft: '10px',
  paddingBlockStart: '10px',
  paddingBlockEnd: '10px',
};

const HealthCheckEntry = ({ entry }: EntryProps) => {
  if (entry.type !== 'HealthCheck') return null;
  let heartColor = 'black';
  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy:
      heartColor = 'green';
      break;
    case HealthCheckRating.LowRisk:
      heartColor = 'yellow';
      break;
    case HealthCheckRating.HighRisk:
      heartColor = 'red';
      break;
    case HealthCheckRating.CriticalRisk:
      heartColor = 'black';
      break;
    default:
      assertNever(entry.healthCheckRating);
  }

  return (
    <div style={inlineStyle}>
      <div>
        {entry.date} <MedicalServicesIcon />
      </div>
      <i>{entry.description}</i>
      <div>
        <FavoriteIcon htmlColor={heartColor} />
      </div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

const OccupationalHealthcareEntry = ({ entry, diagnoses }: EntryProps) => {
  if (entry.type !== 'OccupationalHealthcare') return null;

  return (
    <div style={inlineStyle}>
      {entry.date} <WorkIcon /> {entry.employerName}
      <div>
        <i>{entry.description}</i>
      </div>
      <div>diagnose by {entry.specialist}</div>
      <br />
      {entry.sickLeave && (
        <div>
          sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
        </div>
      )}
    </div>
  );
};

const HospitalEntry = ({ entry, diagnoses }: EntryProps) => {
  if (entry.type !== 'Hospital') return null;

  return (
    <div style={inlineStyle}>
      {entry.date} <LocalHospitalIcon />
      <div>
        <i>{entry.description}</i>
      </div>
      <div>diagnose by {entry.specialist}</div>
      <br />
      {entry.discharge && (
        <div>
          discharge: {entry.date} <i>{entry.discharge.criteria}</i>
        </div>
      )}
    </div>
  );
};

const EntryDetails = ({ entry, diagnoses }: EntryProps) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
      );
    case 'Hospital':
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
