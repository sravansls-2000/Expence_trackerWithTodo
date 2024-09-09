import React from 'react';
import './App.css';
import MainRoute from './Routes/MainRoute';
import { useSelector } from 'react-redux';
import '@fortawesome/fontawesome-svg-core/styles.css';
import DrawerApp from './drawer';

function App() {
  const Togglemode = useSelector((state) => state.theme.mode);

  return (
    <div className={`${Togglemode ? 'bg-[black]' : 'bg-[white]'} some`}>
      <MainRoute />
    </div>
  );
}

export default App;
