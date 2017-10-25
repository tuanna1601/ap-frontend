import React from 'react';
import { Field } from 'redux-form';
import { FormControlSelect } from '@/components/FormControl';

const CriteriaField = (props) => (
  <Field
    component={FormControlSelect}
    options={props.options}
    {...props}
  />
);

CriteriaField.propTypes = {
  options: React.PropTypes.array.isRequired,
};

export default CriteriaField;
