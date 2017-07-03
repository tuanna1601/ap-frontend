import React from 'react';
import { Field } from 'redux-form';

import { debounce } from 'lodash';

import { FormControlSelect } from '@/components/FormControl';

class AdsField extends React.Component {
  componentWillUnmount() {
    this.props.resetOptions();
  }

  render() {
    return (
      <Field
        component={FormControlSelect}
        options={this.props.options}
        onInputChange={debounce((keyword) => this.props.listOptions(keyword), 500)}
        {...this.props}
      />
    );
  }
}

AdsField.propTypes = {
  options: React.PropTypes.array.isRequired,
  listOptions: React.PropTypes.func.isRequired,
  resetOptions: React.PropTypes.func.isRequired,
};

export default AdsField;
