import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

import { FormControlSelect } from '@/components/FormControl';

class AdCampaignField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      options: [],
    };
  }

  componentDidMount() {
    this.listOptions();
  }

  componentWillReceiveProps(nextProps) {
    const { account, business } = nextProps;
    if (this.props.account !== account) {
      this.listOptions(account, business);
    }
  }

  async listOptions(accountId, businessId) {
    const self = this;
    const { listOptions, transformData } = this.props;
    this.setState({ isLoading: true });
    try {
      const res = await listOptions(accountId, businessId);
      transformData(res, options => self.setState({ options }));
      self.setState({ isLoading: false });
    } catch (error) {
      console.error(error); // eslint-disable-line
      self.setState({ isLoading: false });
    }
  }

  render() {
    const { isLoading, options } = this.state;
    return (
      <Field
        component={FormControlSelect}
        isLoading={isLoading}
        options={options}
        {...this.props}
      />
    );
  }
}

AdCampaignField.propTypes = {
  account: PropTypes.string.isRequired,
  business: PropTypes.string.isRequired,
  listOptions: PropTypes.func.isRequired,
  transformData: PropTypes.func.isRequired,
};

export default AdCampaignField;
