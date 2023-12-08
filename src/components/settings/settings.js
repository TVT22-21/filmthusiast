import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import DeleteAccount from './DeleteAccount';

const SettingsPage = () => {
  return (
    <div>
      <h2>Käyttäjäasetukset</h2>
      <ChangePassword />
      <ChangeEmail />
      <DeleteAccount />
    </div>
  );
};

export default SettingsPage;