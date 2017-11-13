import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { formValueSelector, reset, SubmissionError } from 'redux-form';
import { chain, each, groupBy } from 'lodash';

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
  onSubmit: async (values) => {
    try {
      const res = await dispatch(createInventory(values));
      const inventory = res.payload ? res.payload.data : undefined;
      if (inventory) {
        Alert.success(`${inventory.name} đã được tạo thành công`);
        dispatch(reset('inventory-create'));
      }
    } catch (err) {
      const errData = err.error.response.data.data;
      const error = {};
      const groupData = groupBy(errData, 'name');

      each(groupData, (group, key) => {
        if (key === 'text') {
          const taboos = chain(group)
            .map((item) => item.text)
            .uniq()
            .value()
            .join(', ');
          error.text = `Không được chứa các từ "${taboos}"`;
        } else {
          const groupByIndex = groupBy(group, 'index');
          each(groupByIndex, (items, index) => {
            const taboos = chain(items)
              .map(item => item.text)
              .uniq()
              .value()
              .join(', ');
            if (!error[key]) {
              error[key] = [];
            }
            error[key][index] = {
              value: `Không được chứa các từ "${taboos}"`,
            };
          });
        }
        return group;
      });
      throw new SubmissionError(error);
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryCreateForm);
