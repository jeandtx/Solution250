import { NavBar } from './components/navbar/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './screens/home/home';
import { Plans } from './screens/plans/plans';
import { About } from './screens/about/about';
import { Login } from './screens/login/login';
import { Footer } from './components/footer/footer';
import styles from './App.module.scss';
import { Scrapping } from './screens/scrapping/scrapping';

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
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}
export default App;
