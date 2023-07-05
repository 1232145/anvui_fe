import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import Nav from './components/Navbar';
import { useState } from 'react';
import MyHeader from './components/Header';
import Footer from './components/Footer';

function App() {
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  return (
    <Router>
      <div className="App">
        <Nav menuCollapsed={menuCollapsed} />
        <div className={`page-container ${menuCollapsed ? 'collapsed' : ''}`}>
          <MyHeader menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
          <div className='page'>
            <Routes>
              {
                publicRoutes.map((item, index) => {
                  const Page = item.component;
                  return <Route key={index} path={item.path} element={<Page />} />
                })
              }
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
