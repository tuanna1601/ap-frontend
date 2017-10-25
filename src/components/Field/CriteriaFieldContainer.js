import { connect } from 'react-redux';
import { chain } from 'lodash';
import CriteriaField from './CriteriaField';

const mapStateToProps = (state, ownProps) => ({
  options: chain(ownProps.criteria)
    .orderBy(['name'], ['asc'])
    .map((criteria) => ({
      value: criteria._id || criteria.id,
      label: `${criteria.name}`,
      data: criteria
    }))
    .value(),
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CriteriaField);
