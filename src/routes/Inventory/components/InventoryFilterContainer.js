import { connect } from 'react-redux';
import { change } from 'redux-form';

import { setFilterQuery, goToPage } from '../redux/inventory';

import InventoryFilter from './InventoryFilter';

const mapStateToProps = () => ({
  form: 'inventory-filter'
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onComponentMounted: () => {
    if (ownProps.params) {
      if (ownProps.params.status) {
        dispatch(change('inventory-filter', 'status', [ownProps.params.status]));
        dispatch(setFilterQuery({ status: [ownProps.params.status] }));
        dispatch(goToPage(1, ownProps.isOrdinator));
      }
    } else {
      dispatch(change('inventory-filter', 'status', ['unassigned', 'assigned', 'accepted', 'rejected']));
      dispatch(setFilterQuery({ status: ['unassigned', 'assigned', 'accepted', 'rejected'] }));
      dispatch(goToPage(1, ownProps.isOrdinator));
    }
  },
  onSubmit: (values) => {
    dispatch(setFilterQuery(values));
    dispatch(goToPage(1, ownProps.isOrdinator));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryFilter);
