import { NavBar } from './components/navbar/navbar';
import styles from './App.module.scss';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './screens/home/home';
import { Plans } from './screens/plans/plans';
import { About } from './screens/about/about';
import { Login } from './screens/login/login';
  







function App() {
    return (
        
            <Router>
                <NavBar />
             
                
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/plans" element={<Plans />} />
                    <Route path="/about" element={<About />} />
                    
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        
    );
}
export default App;
