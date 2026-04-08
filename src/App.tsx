import { ThemeProvider } from './contexts/ThemeContext';
import { WallCalendar } from './components/calender/WallCalendar';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <WallCalendar />
    </ThemeProvider>
  );
}

export default App;
