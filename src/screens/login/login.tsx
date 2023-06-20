import styles from '../App.module.scss';
import  FacebookLogin  from '../../components/facebooklogin/facebookLogin';
import { GoogleLoginButton } from '../../components/facebooklogin/googleLogin';

import './LoginForm.scss';

const LoginForm = () => {
  return (
    <div className="login-form">
      <h2 className="login-form-title">Login</h2>
      <div className="login-form-content">
        <div className="login-buttons">
          <GoogleLoginButton />
          <FacebookLogin />
        </div>
      </div>
    </div>
  );
};




export function Login() {
    return (
        <div >
            <LoginForm/>
        </div>
    );
}

