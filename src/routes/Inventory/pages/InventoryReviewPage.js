import React from 'react';
import InventoryReviewForm from '../components/InventoryReviewContainer';

class InventoryReviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createFormHidden: false,
      location: window.location.href,
    };
  }

  render() {
    const url = new URL(this.state.location);
    const inventoryId = url.searchParams.get('id');
    return (
      <section className="content">
        <InventoryReviewForm id={inventoryId} />
      </section>
    );
  }
}

export default InventoryReviewPage;
