import React from 'react';
import { Link, IndexLink, withRouter } from 'react-router';

class SidebarItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };
  }

  componentWillMount() {
    const { router, to, treeId } = this.props;
    const isActive = router.isActive(to, true);
    if (isActive) {
      this.props.updateSidebarItem(treeId);
      this.setState({
        isActive: true
      });
    } else if (this.state.isActive) {
      this.setState({
        isActive: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { router, to, treeId } = nextProps;
    const isActive = router.isActive(to, true);
    if (isActive) {
      nextProps.updateSidebarItem(treeId);
      this.setState({
        isActive: true
      });
    } else if (this.state.isActive) {
      this.setState({
        isActive: false
      });
    }
  }

  render() {
    const { index, to, children } = this.props;
    const LinkComponent = index ? IndexLink : Link;
    const isActive = this.state.isActive;
    const activeClasses = 'active child-item-active';
    return (
      <li className={isActive ? activeClasses : ''}>
        <LinkComponent to={to}>{children}</LinkComponent>
      </li>
    );
  }
}

SidebarItem.propTypes = {
  children: React.PropTypes.array.isRequired,
  active: React.PropTypes.bool,
  to: React.PropTypes.string.isRequired,
  treeId: React.PropTypes.string.isRequired,
  index: React.PropTypes.bool,
  router: React.PropTypes.object.isRequired,
  updateSidebarItem: React.PropTypes.func.isRequired
};

export default withRouter(SidebarItem);
