import React from 'react';
import { Field } from 'redux-form';
import * as _ from 'lodash';
import { FormControlSelect } from '@/components/FormControl';

class InventoryField extends React.Component {
  componentDidMount() {
    this.props.listOptions();
  }

  componentWillUnmount() {
    this.props.resetOptions();
  }

  render() {
    return (
      <Field
        component={FormControlSelect}
        options={this.props.options}
        {...this.props}
      />
    );
  }
}

InventoryField.propTypes = {
  options: React.PropTypes.array.isRequired,
  listOptions: React.PropTypes.func.isRequired,
  resetOptions: React.PropTypes.func.isRequired,
};

export default InventoryField;
