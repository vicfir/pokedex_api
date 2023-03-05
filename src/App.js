import './App.scss';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import { Main } from './components/Main'
import { Liste } from './components/Liste';
import { Selected } from './components/Selected';
import { useState } from 'react';

function App() {
  const [selectedPok, setSelectedPok]=useState("");

  const selectPok = (pokemon) => {
    setSelectedPok(pokemon);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}>
            <Route index element={<Liste selectPok={selectPok}/>} />
            <Route path='pokemon' element={<Selected selectedPok={selectedPok}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
