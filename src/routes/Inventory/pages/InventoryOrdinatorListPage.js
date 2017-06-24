import React, { Component, PropTypes } from 'react';
import InventoryList from '../components/InventoryListContainer';

class InventoryListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createFormHidden: false,
    };
  }

  render() {
    return (
      <section className="content">
        <InventoryList params={this.props.location.query} isOrdinator />
      </section>
    );
  }
}

InventoryListPage.propTypes = {
  location: PropTypes.object,
  'location.query': PropTypes.object,
};

export default InventoryListPage;
