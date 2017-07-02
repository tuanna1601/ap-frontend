import { connect } from 'react-redux';

import DescriptionField from './DescriptionField';

const mapStateToProps = () => ({
  onFieldArrayRemove: (fields, index) => {
    fields.remove(index);
  }
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionField);
