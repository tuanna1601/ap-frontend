import React, { Component, PropTypes } from 'react';
import InventoryReviewerList from '../components/InventoryReviewerListContainer';

class InventoryReviewerListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createFormHidden: false,
    };
  }

  render() {
    return (
      <section className="content">
        <InventoryReviewerList params={this.props.location.query} />
      </section>
    );
  }
}

InventoryReviewerListPage.propTypes = {
  location: PropTypes.object,
  'location.query': PropTypes.object,
};

export default InventoryReviewerListPage;
