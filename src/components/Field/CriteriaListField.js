import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { FormControlSelectList } from '@/components/FormControl';

const CriteriaFieldList = ({ options, name, id }) => (
  <div>
    <Field
      component={FormControlSelectList}
      name={`${name}`}
      id={`${id}`}
      options={options}
      hasSelectAll
    />
  </div>
);

CriteriaFieldList.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default CriteriaFieldList;
