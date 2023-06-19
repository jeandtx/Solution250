import { NavBar } from './components/navbar/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './screens/home/home';
import { Plans } from './screens/plans/plans';
import { About } from './screens/about/about';
import { Login } from './screens/login/login';
import { Footer } from './components/footer/footer';

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
            <Footer />
        </Router>
    );
}
export default App;