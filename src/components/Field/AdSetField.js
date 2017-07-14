import React from 'react';
import { Field } from 'redux-form';
import { FormControlSelect } from '@/components/FormControl';

class AdSetField extends React.Component {
  componentDidMount() {
    this.props.listOptions();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.campaign !== nextProps.campaign) {
      this.props.listOptions(nextProps.account, nextProps.campaign);
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

AdSetField.propTypes = {
  account: React.PropTypes.string.isRequired,
  campaign: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  listOptions: React.PropTypes.func.isRequired,
  resetOptions: React.PropTypes.func.isRequired,
};

export default AdSetField;
