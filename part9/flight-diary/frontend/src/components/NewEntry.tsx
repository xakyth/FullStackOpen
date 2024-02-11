import React, { useState } from 'react';
import diaryService from '../services/diaryService';
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../types';

interface NewEntryProps {
  entries: DiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}

const NewEntry = ({ entries, setEntries }: NewEntryProps) => {
  const [date, setDate] = useState('2023-2-2');
  const [visibility, setVisibility] = useState('best ever');
  const [weather, setWeather] = useState('sunny');
  const [comment, setComment] = useState('night flight but a shaky land');

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewDiaryEntry = {
      date,
      visibility: Visibility.Great,
      weather: Weather.Cloudy,
      comment,
    };
    diaryService.addEntry(newEntry).then((addedEntry) => {
      setEntries(entries.concat(addedEntry));
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
