import React, { useState } from 'react';
import diaryService from '../services/diaryService';
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../types';
import { AxiosError } from 'axios';

interface NewEntryProps {
  entries: DiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  setNotification: (message: string) => void;
}

const NewEntry = ({ entries, setEntries, setNotification }: NewEntryProps) => {
  const [date, setDate] = useState('2023-2-2');
  const [visibility, setVisibility] = useState('best ever');
  const [weather, setWeather] = useState('sunny');
  const [comment, setComment] = useState('night flight but a shaky land');

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewDiaryEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment,
    };
    diaryService
      .addEntry(newEntry)
      .then((addedEntry) => {
        setEntries(entries.concat(addedEntry));
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
      })
      .catch((error: unknown) => {
        if (error instanceof AxiosError) {
          const errorMessage = error.response?.data;
          setNotification(errorMessage);
        } else {
          setNotification('Unknown error');
        }
      });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={entryCreation}>
        <div>
          date{' '}
          <input
            type='text'
            value={date}
            onChange={({ target }) => setDate(target.value)}
          ></input>
        </div>
        <div>
          visibility{' '}
          <input
            type='text'
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          ></input>
        </div>
        <div>
          weather{' '}
          <input
            type='text'
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          ></input>
        </div>
        <div>
          comment{' '}
          <input
            type='text'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          ></input>
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default NewEntry;
