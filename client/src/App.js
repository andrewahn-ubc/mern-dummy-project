import { BrowserRouter, Routes, Route } from 'react-router-dom'
// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      {/* BrowerRouter must wrap around everything that uses the router system.*/}
      <BrowserRouter>
        {/* we want the navbar in every page so we keep it outside "pages", but still inside BrowserRouter */}
        <Navbar />

        <div className="pages">
          <Routes>
            <Route 
            path="/"
            element={<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
