import React from 'react';
import RBAC from '@/components/RBAC';
import { Tabs, Tab } from '@/components/Tabs';
import InventoryList from '../components/InventoryListContainer';

class InventoryListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createFormHidden: false,
    };
  }

  render() {
    return (
      <section className="content">
        <InventoryList />
      </section>
    );
  }
}

export default InventoryListPage;
