import { useEffect, useState } from 'react';
import Entry from './components/Entry';
import { DiaryEntry } from './types';
import diaryService from './services/diaryService';
import NewEntry from './components/NewEntry';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getEntries().then((res) => setEntries(res));
  }, []);

  return (
    <div>
      <NewEntry entries={entries} setEntries={setEntries} />
      {entries.map((e) => (
        <Entry key={e.id} entry={e} />
      ))}
    </div>
  );
}

export default App;
