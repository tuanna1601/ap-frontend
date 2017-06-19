import React from 'react';
import InventoryAdsPreviewForm from '../components/InventoryAdsPreviewContainer';

class InventoryAdsPreviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createFormHidden: false,
    };
  }

  render() {
    return (
      <section className="content">
        <InventoryAdsPreviewForm />
      </section>
    );
  }
}

export default InventoryAdsPreviewPage;
