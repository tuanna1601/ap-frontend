import { requireAuth } from '@/routes';
import HomeView from './components/HomeView';

export default (store) => ({
  component: HomeView,
  onEnter: (nextState, replace, callback) => requireAuth(store, callback),
});
