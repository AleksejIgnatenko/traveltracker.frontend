import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Sidebar from './components/organisms/Sidebar';
import Cities from './pages/Cities';
import TravelExpenseTypes from './pages/TravelExpenseTypes';

function App() {
  return (
    <>
      <BrowserRouter>
        <>
          <Sidebar />
          <div className="App">
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/cities" element={<Cities />} />
                <Route path="/travel-expense-types" element={<TravelExpenseTypes />} />
              </Routes>
            </div>
          </div>
        </>
      </BrowserRouter>
    </>
  );
}

export default App;