import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

import { FormControlSelect } from '@/components/FormControl';

class BusinessField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      options: [],
    };
  }

  async componentDidMount() {
    const self = this;
    const { listOptions, transformData } = this.props;
    try {
      const res = await listOptions();
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

BusinessField.propTypes = {
  listOptions: PropTypes.func.isRequired,
  transformData: PropTypes.func.isRequired,
};

export default BusinessField;
