import { connect } from 'react-redux';

import ReviewFieldArray from './ReviewFieldArray';

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
  onFieldArrayRemove: (fields, index) => {
    fields.remove(index);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewFieldArray);
