import { useParams } from 'react-router-dom';
import { Gender, Patient } from '../types';
import patientsService from '../services/patients';
import { useEffect, useState } from 'react';

const getGenderSymbol = (gender: Gender): string => {
  switch (gender) {
    case Gender.Male:
      return '♂';
    case Gender.Female:
      return '♀';
    case Gender.Other:
      return '⚪';
    default:
      return '';
  }
};

const PatientPage = () => {
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
    </div>
  );
};

export default PatientPage;
