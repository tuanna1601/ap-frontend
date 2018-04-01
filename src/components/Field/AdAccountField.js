import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import { FormControlSelect } from '@/components/FormControl';

class AdAccountField extends Component {
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
    if (this.props.business !== nextProps.business) {
      this.listOptions(nextProps.business);
    }
  }

  async listOptions(businessId) {
    const self = this;
    const { listOptions, transformData } = this.props;
    this.setState({ isLoading: true });
    try {
      const res = await listOptions(businessId);
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

AdAccountField.propTypes = {
  listOptions: PropTypes.func.isRequired,
  transformData: PropTypes.func.isRequired,

  business: PropTypes.string,
};

export default AdAccountField;
