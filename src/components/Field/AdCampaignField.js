import React from 'react';
import { Field } from 'redux-form';
import { FormControlSelect } from '@/components/FormControl';

class AdCampaignField extends React.Component {
  componentDidMount() {
    this.props.listOptions();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.account !== nextProps.account) {
      this.props.listOptions(nextProps.account);
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

AdCampaignField.propTypes = {
  account: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  listOptions: React.PropTypes.func.isRequired,
  resetOptions: React.PropTypes.func.isRequired,
};

export default AdCampaignField;
