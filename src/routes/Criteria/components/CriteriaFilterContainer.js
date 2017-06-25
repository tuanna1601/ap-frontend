import { connect } from 'react-redux';

import { setFilterQuery, goToPage } from '../redux/criteria';

import CriteriaFilter from './CriteriaFilter';

const mapStateToProps = () => ({
  form: 'criteria-filter'
});

const mapDispatchToProps = (dispatch) => ({
  onComponentMounted: () => {
  },
  onSubmit: (values) => {
    dispatch(setFilterQuery(values));
    dispatch(goToPage(1));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CriteriaFilter);
