import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

const AppContainer = ({ history, routes, store }) => (
  <Provider store={store}>
    <div style={{ height: '100%' }}>
      <Router history={history} children={routes} />
    </div>
  </Provider>
);

AppContainer.propTypes = {
  history: React.PropTypes.object.isRequired,
  routes: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired,
};

export default AppContainer;
