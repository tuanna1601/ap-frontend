import React from 'react';
import InventoryCreateForm from '../components/InventoryCreateContainer';

class InventoryCreatePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createFormHidden: false,
    };
  }

  render() {
    return (
      <section className="content">
        <InventoryCreateForm />
      </section>
    );
  }
}

export default InventoryCreatePage;
