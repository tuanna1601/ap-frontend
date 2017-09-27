import { connect } from 'react-redux';
import * as _ from 'lodash';
import { listBusinesses } from '@/store/common';
import BusinessField from './BusinessField';

const mapStateToProps = (state) => ({
  options: _.chain(state.common.businesses)
    .orderBy(['name'], ['asc'])
    .map((business) => ({
      value: business.id,
      label: `${business.name}`,
      business,
    }))
    .value(),
});

const mapDispatchToProps = (dispatch) => ({
  listOptions: () => dispatch(listBusinesses()),
  resetOptions: () => dispatch(listBusinesses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessField);
