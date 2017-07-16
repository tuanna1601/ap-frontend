import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import ReviewFieldArray from './ReviewFieldArray';

const mapStateToProps = (state, ownProps) => ({
  onFieldArrayRemove: (fields, index) => {
    fields.remove(index);
  },
  reviews: formValueSelector(ownProps.form)(state, `${ownProps.name}`) || []
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewFieldArray);
