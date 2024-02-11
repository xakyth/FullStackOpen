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
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

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
            type='date'
            value={date}
            onChange={({ target }) => setDate(target.value)}
          ></input>
        </div>
        <div>
          visibility:{' '}
          {Object.values(Visibility).map((v) => {
            return (
              <React.Fragment key={v.toString()}>
                {' '}
                {v.toString()}
                <input
                  type='radio'
                  name='visibility'
                  onChange={({ target }) => setVisibility(target.value)}
                  value={v.toString()}
                />
              </React.Fragment>
            );
          })}
        </div>
        <div>
          weather{': '}
          {Object.values(Weather).map((v) => {
            return (
              <React.Fragment key={v.toString()}>
                {' '}
                {v.toString()}
                <input
                  type='radio'
                  name='weather'
                  value={v.toString()}
                  onChange={({ target }) => setWeather(target.value)}
                />
              </React.Fragment>
            );
          })}
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
