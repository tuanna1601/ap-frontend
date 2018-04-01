import React from 'react';
import { Field } from 'redux-form';
import { FormControlSelect } from '@/components/FormControl';

class AdSetField extends React.Component {
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
    const { campaign, business } = nextProps;
    if (this.props.campaign !== campaign) {
      this.listOptions(campaign, business);
    }
  }

  async listOptions(campaignId, businessId) {
    const self = this;
    const { listOptions, transformData } = this.props;
    this.setState({ isLoading: true });
    try {
      const res = await listOptions(campaignId, businessId);
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

AdSetField.propTypes = {
  business: React.PropTypes.string.isRequired,
  campaign: React.PropTypes.string.isRequired,
  listOptions: React.PropTypes.func.isRequired,
  transformData: React.PropTypes.func.isRequired,
};

export default AdSetField;
