import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Sidebar from './components/organisms/Sidebar';

import AdvanceReports from './pages/AdvanceReports';
import Employees from './pages/Employees';
import Cities from './pages/Cities';
import Commands from './pages/Commands';  
import TripCertificates from './pages/TripCertificates';

import TripExpenses from './pages/TripExpenses';
import TripExpenseTypes from './pages/TripExpenseTypes';

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
                <Route path="/commands" element={<Commands />} />
                <Route path="/trip-certificates/:type?/:id?" element={<TripCertificates />} />
                <Route path="/advance-reports/:type?/:id?" element={<AdvanceReports />} />
                <Route path="/trip-expenses/:type?/:id?" element={<TripExpenses />} />
                <Route path="/trip-expense-types" element={<TripExpenseTypes />} />
              </Routes>
            </div>
          </div>
        </>
      </BrowserRouter>
    </>
  );
}

export default App;