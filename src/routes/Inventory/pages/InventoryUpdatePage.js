import React, { PropTypes } from 'react';
import InventoryUpdateForm from '../components/InventoryUpdateContainer';

class InventoryUpdatePage extends React.Component {
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
        <InventoryUpdateForm route={this.props.route} id={inventoryId} />
      </section>
    );
  }
}

InventoryUpdatePage.propTypes = {
  route: PropTypes.object.isRequired
};

export default InventoryUpdatePage;
