import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Sidebar from './components/organisms/Sidebar';

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
              </Routes>
            </div>
          </div>
        </>
      </BrowserRouter>
    </>
  );
}

export default App;