import { NavBar } from './components/navbar/navbar';
import styles from './App.module.scss';
import { TextInput } from './components/text-input/text-input';
import { WelcomePage } from './components/welcomepage/welcomepage';

function App() {
    return (
        <div className={styles.App}>
            {/* 
            ATTENTION DO NOT CODE IN THIS FILE
            JUST USE IT TO IMPORT COMPONENTS AND TEST THEM
            */}
            <WelcomePage />
            <NavBar />
            <TextInput />
        </div>
    );
}
export default App;
