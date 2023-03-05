import './App.scss';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import { Main } from './components/Main'
import { Liste } from './components/Liste';
import { Selected } from './components/Selected';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}>
            <Route index element={<Liste />} />
            <Route path='/pokemon' element={<Selected />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
