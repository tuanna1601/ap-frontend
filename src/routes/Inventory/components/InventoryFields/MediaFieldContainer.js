import { connect } from 'react-redux';

import MediaField from './MediaField';

const mapStateToProps = () => ({
  onFieldArrayRemove: (fields, index) => {
    fields.remove(index);
  }
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MediaField);
