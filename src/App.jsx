import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import AudioPlayer from './components/AudioPlayer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';

const Layout = ({ lang, toggleLang }) => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-900 pb-32 overflow-x-hidden">
      <Navbar lang={lang} toggleLang={toggleLang} />
      <AudioPlayer />
      <Outlet context={{ lang, toggleLang }} />
    </div>
  );
};

function App() {
  const [lang, setLang] = useState('pt');

  const toggleLang = () => {
    setLang((prev) => (prev === 'pt' ? 'en' : 'pt'));
  };

  return (
    <Router>
      <Routes>
        <Route element={<Layout lang={lang} toggleLang={toggleLang} />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;