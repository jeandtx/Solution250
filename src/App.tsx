import { NavBar } from './components/navbar/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './screens/home/home';
import { Plans } from './screens/plans/plans';
import { About } from './screens/about/about';
import { Login } from './screens/login/login';
import { Privacy } from './screens/privacy/privacy';
import { Footer } from './components/footer/footer';
import styles from './App.module.scss';
import { Scrapping } from './components/scrapping/scrapping';

function App() {
    return (
        <div className={styles.App}>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/plans" element={<Plans />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/scrapp" element={<Scrapping />} />
                    <Route path="/privacy" element={<Privacy />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}
export default App;
