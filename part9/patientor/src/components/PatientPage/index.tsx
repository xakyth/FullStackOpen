import { useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../../types';
import patientsService from '../../services/patients';
import { useEffect, useState } from 'react';

import { getGenderSymbol } from '../../utils';
import EntryDetails from './EntryDetails';
import NewEntry from './NewEntry';

interface Props {
  diagnoses: Diagnosis[];
  setNotification: (message: string) => void;
}

const PatientPage = (props: Props) => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const { id } = useParams();

  useEffect(() => {
    patientsService.getById(id!).then((response) => setPatient(response));
  }, [id]);

  if (!patient) {
    return null;
  }
  return (
    <div>
      <h2>
        {patient.name} {getGenderSymbol(patient.gender)}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <NewEntry
        setNotification={props.setNotification}
        setPatient={setPatient}
        patient={patient}
        diagnoses={props.diagnoses}
      />
      <h3>entries</h3>
      {patient.entries.map((e) => {
        return (
          <EntryDetails key={e.id} entry={e} diagnoses={props.diagnoses} />
        );
      })}
    </div>
  );
};

export default PatientPage;
