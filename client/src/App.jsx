import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/header';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <>
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />

          <Route path='/login' element={<Login />} />

          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </Router>

    </>
  )
}

export default App
