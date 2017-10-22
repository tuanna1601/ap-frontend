import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import InventoryAssignForm from './InventoryAssignForm';

const mapStateToProps = (state) => ({
  form: 'inventory-assign',
  steps: formValueSelector('inventory-assign')(state, 'steps') || [],
});

export default connect(mapStateToProps)(InventoryAssignForm);
