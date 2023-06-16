import { NavBar } from './components/navbar/navbar';
import styles from './App.module.scss';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './screens/home/home';
  

function Plans() {
  return (
      <div className={styles.about}>
          <h1>Plans</h1>
      </div>
  );
}

function About() {
    return (
        <div className={styles.about}>
            <h1>About</h1>
        </div>
    );
}
function Login() {
    return (
        <div className={styles.about}>
            <h1>Login</h1>
        </div>
    );
}


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
