import React from 'react';
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
        <InventoryAdsCreateForm inventoryId={inventoryId} />
      </section>
    );
  }
}

export default InventoryAdsCreatePage;
