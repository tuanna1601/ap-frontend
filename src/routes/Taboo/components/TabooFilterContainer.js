import { connect } from 'react-redux';

import { setFilterQuery, goToPage } from '../redux/taboo';

import TabooFilter from './TabooFilter';

const mapStateToProps = () => ({
  form: 'taboo-filter'
});

const mapDispatchToProps = (dispatch) => ({
  onComponentMounted: () => {
  },
  onSubmit: (values) => {
    dispatch(setFilterQuery(values));
    dispatch(goToPage(1));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TabooFilter);
