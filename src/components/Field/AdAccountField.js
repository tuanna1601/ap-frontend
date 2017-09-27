import React from 'react';
import { Field } from 'redux-form';
import { FormControlSelect } from '@/components/FormControl';

class AdAccountField extends React.Component {
  componentDidMount() {
    if (this.props.business) {
      this.props.listOptions();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.business !== nextProps.business) {
      this.props.listOptions(nextProps.business);
    }
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

AdAccountField.propTypes = {
  business: React.PropTypes.string,
  options: React.PropTypes.array.isRequired,
  listOptions: React.PropTypes.func.isRequired,
  resetOptions: React.PropTypes.func.isRequired,
};

export default AdAccountField;
