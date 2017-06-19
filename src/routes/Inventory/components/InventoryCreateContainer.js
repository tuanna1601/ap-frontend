import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { formValueSelector, reset } from 'redux-form';
import { createInventory } from '../redux/inventory';
import InventoryCreateForm from './InventoryCreateForm';

const mapStateToProps = (state) => ({
  form: 'inventory-create',
  isLoading: state.inventory.isLoadingCreate,
  headlines: formValueSelector('inventory-create')(state, 'headlines'),
  media: formValueSelector('inventory-create')(state, 'medias'),
  descriptions: formValueSelector('inventory-create')(state, 'descriptions'),
});

const mapDispatchToProps = (dispatch) => ({
  onFieldArrayRemoved: (fields, index) => {
    fields.remove(index);
  },
  onSubmit: (values) => {
    dispatch(createInventory(values, (data) => {
      Alert.success(`${data.name} đã được tạo thành công`);
      dispatch(reset('inventory-create'));
    }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryCreateForm);
