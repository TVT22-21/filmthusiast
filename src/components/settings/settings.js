import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import DeleteAccount from './DeleteAccount';
import { jwtToken, userInfo } from '../register/signals';
import {useNavigate} from "react-router-dom";
import './settings.css';
import { Header } from "../header/Header";
import { Footer } from '../footer/footer';

const SettingsPage = ({username= userInfo.value?.private}) => {
  const navigate = useNavigate("");

  function navigateToHomePage(){
    navigate("/");
  }

  return (
    <div className='settings'>
      <Header />
      <div className="settings-container">
        {jwtToken.value.length === 0 ? (
          <div>
            <h2>Olet vierailijana</h2>
              <div>
                <button className="settings-btn" onClick={navigateToHomePage}>Takaisin etusivulle</button>
              </div>
          </div>
        ) : (
        <div>
          <h2>Käyttäjän {username} asetukset</h2>
          <br/>
          <ChangePassword />
          <br/>
          <ChangeEmail />
          <br/>
          <DeleteAccount />
        </div>
        )}
      </div>
    </div>
    )
}


export default SettingsPage;