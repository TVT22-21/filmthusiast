import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import DeleteAccount from './DeleteAccount';
import { jwtToken, userInfo } from '../register/signals';
import {useNavigate} from "react-router-dom";
import { Header } from '../header/Header';

const SettingsPage = ({username= userInfo.value?.private}) => {
  const navigate = useNavigate("");

  function navigateToHomePage(){
    navigate("/");
  }

  return (
    <div className="container">
    {jwtToken.value.length === 0 ? (
      <div>
        <h2>Olet vierailijana</h2>
          <div>
            <button onClick={navigateToHomePage}>Takaisin etusivulle:</button>
          </div>
      </div>
    ) : (
    <div>
      <Header />
      <h2>Käyttäjän {username} asetukset</h2>
      <ChangePassword />
      <ChangeEmail />
      <DeleteAccount />
    </div>
    )}
    </div>
    )
}


export default SettingsPage;