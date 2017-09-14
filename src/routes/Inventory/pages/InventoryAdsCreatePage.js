import React, { PropTypes } from 'react';
import InventoryAdsCreateForm from '../components/InventoryAdsCreateContainer';

class InventoryAdsCreatePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createFormHidden: false,
      location: window.location.href
    };
  }

  render() {
    const url = new URL(this.state.location);
    const inventoryId = url.searchParams.get('inventoryId');
    return (
      <section className="content">
        <InventoryAdsCreateForm route={this.props.route} inventoryId={inventoryId} />
      </section>
    );
  }
}

InventoryAdsCreatePage.propTypes = {
  route: PropTypes.object.isRequired
};

export default InventoryAdsCreatePage;
