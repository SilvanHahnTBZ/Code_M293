import { AppHeader } from '../header';
import LoginButton from '../components/loginButton';
import Profile from '../components/profile';

export const HomePage = () => {
  return (
    <div>
      <AppHeader />
      <LoginButton />
      <Profile />
    </div>
  );
};
