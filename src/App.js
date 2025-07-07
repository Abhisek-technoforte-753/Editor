import { Routes } from 'react-router-dom';
import './App.css';
import Tiptap from './components/Tiptap';
import Dummy from './Dummy';
import { Link, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* Styled Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">Editor Clone</div>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Tiptap</Link>
          <Link to="/dummy" className="nav-link">Dummy</Link>
        </div>
      </nav>
      {/* Routes below navbar */}
      <Routes>
        <Route path="/" element={<Tiptap />} />
        <Route path="/dummy" element={<Dummy />} />
      </Routes>
      {console.log('App component rendered')}
       </div>
  );
}

export default App;