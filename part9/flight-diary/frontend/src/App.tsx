import { useEffect, useState } from 'react';
import Entry from './components/Entry';
import { DiaryEntry } from './types';
import diaryService from './services/diaryService';
import NewEntry from './components/NewEntry';
import Notification from './components/Notification';

function App() {
  const [notification, setNotification] = useState('');
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getEntries().then((res) => setEntries(res));
  }, []);

  const notifyWith = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  return (
    <div>
      <Notification message={notification} />
      <NewEntry
        entries={entries}
        setEntries={setEntries}
        setNotification={notifyWith}
      />
      {entries.map((e) => (
        <Entry key={e.id} entry={e} />
      ))}
    </div>
  );
}

export default App;
