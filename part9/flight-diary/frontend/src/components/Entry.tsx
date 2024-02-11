import { DiaryEntry } from '../types';

interface DiaryEntryProps {
  entry: DiaryEntry;
}

const Entry = ({ entry }: DiaryEntryProps) => {
  return (
    <div>
      <h2>{entry.date}</h2>
      <div>visibility: {entry.visibility}</div>
      <div>weather: {entry.weather}</div>
    </div>
  );
};

export default Entry;
