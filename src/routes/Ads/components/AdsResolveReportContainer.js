import { connect } from 'react-redux';

import AdsResolveReportForm from './AdsResolveReportForm';


const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    ...ownProps.initialValues,
    ad: state.common.ads
  },
  enableReinitialize: true
});

const mapDispatchToProps = () => ({
  onComponentUnmount: () => {
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdsResolveReportForm);
