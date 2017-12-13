import React, { Component } from 'react';
import ReportInventory from '../components/ReportInventoryContainer';

class ReportInventoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createFormHidden: true,
    };
  }

  render() {
    return (
      <section className="content">
        <ReportInventory type="inventories" />
      </section>
    );
  }
}

export default ReportInventoryPage;
