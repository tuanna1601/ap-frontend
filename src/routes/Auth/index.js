import LoginContainer from './components/LoginContainer';
import ChangePassword from './components/ChangePasswordContainer';

export default () => ({
  path: 'auth',
  indexRoute: {
    component: LoginContainer,
  },
  childRoutes: [
    {
      path: 'change-password',
      component: ChangePassword,
    },
  ],
});
