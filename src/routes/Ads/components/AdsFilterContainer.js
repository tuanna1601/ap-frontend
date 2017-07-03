import { connect } from 'react-redux';
import { change } from 'redux-form';

import { setFilterQuery, listAds } from '../redux/ads';

import AdsFilter from './AdsFilter';

const mapStateToProps = () => ({
  form: 'ads-filter'
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onComponentMounted: () => {
    if (ownProps.params && ownProps.params.status) {
      dispatch(change('ads-filter', 'status', ownProps.params.status));
      dispatch(setFilterQuery({ status: ownProps.params.status }));
      dispatch(listAds());
    }
  },
  onSubmit: (values) => {
    dispatch(setFilterQuery(values));
    dispatch(listAds());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdsFilter);
