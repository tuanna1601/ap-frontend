import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';

import {
  unloadConfirmation, routeLeaveConfirmation
} from '@/helpers/helper';

const navConfirm = (WrappedComponent) => {
  class EnhancedComponent extends Component {
    componentDidMount() {
      window.onbeforeunload = (event) => unloadConfirmation(event, this.props.pristine);
      const { router, route } = this.props;
      this.leaveHook = router.setRouteLeaveHook(route,
        () => routeLeaveConfirmation(this.props.pristine));
    }

    componentWillUnmount() {
      if (this.leaveHook) {
        this.leaveHook();
      }
      window.onbeforeunload = () => null;
    }

    render() {
      return (
        <div>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }

  EnhancedComponent.propTypes = {
    router: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    pristine: PropTypes.bool.isRequired,
  };

  return withRouter(EnhancedComponent);
};

export default navConfirm;
