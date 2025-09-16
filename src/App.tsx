import './App.css'

import TabRenderer from './TabRenderer'
import { mary } from './songs/mary';

function App() {
  return <TabRenderer song={mary} />;
}

export default App
