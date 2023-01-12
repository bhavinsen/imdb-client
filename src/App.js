import './App.css';
import MoviesLists from './components/moviesLists';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddMovie from './components/addMovie';
import EditMovie from './components/editMovie';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MoviesLists />} />
        <Route exact path="/add" element={<AddMovie />} />
        <Route exact path="/:id" element={<EditMovie />} />
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
