import { connect } from 'react-redux';

import HeadlineField from './HeadlineField';

const mapStateToProps = () => ({
  onFieldArrayRemove: (fields, index) => {
    fields.remove(index);
  }
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(HeadlineField);
