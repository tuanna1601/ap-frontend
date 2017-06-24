import React from 'react';
import * as _ from 'lodash';

const RBAC = ({ isLoggedIn, user, children, requiredPermissions }) => {
  if (isLoggedIn && _.intersection(user.scope, requiredPermissions).length) {
    return children;
  }
  return false;
};

RBAC.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object.isRequired,
  requiredPermissions: React.PropTypes.array.isRequired,
  children: React.PropTypes.element.isRequired,
};

export default RBAC;
