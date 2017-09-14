import React, { PropTypes } from 'react';
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
        <InventoryCreateForm route={this.props.route} />
      </section>
    );
  }
}

InventoryCreatePage.propTypes = {
  route: PropTypes.object.isRequired
};

export default InventoryCreatePage;
