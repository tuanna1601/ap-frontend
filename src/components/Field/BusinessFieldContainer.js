import { connect } from 'react-redux';
import { chain, get } from 'lodash';

import { listBusinesses } from '@/store/common';

import BusinessField from './BusinessField';

const mapDispatchToProps = dispatch => ({
  listOptions: async () => dispatch(listBusinesses()),
  transformData: (data, callback) => {
    const options = chain(get(data, 'payload.rows', []))
      .orderBy(['name'], ['asc'])
      .map(business => ({
        business,
        label: `${business.name}`,
        value: business.id,
      }))
      .value();
    callback(options);
  },
});

export default connect(null, mapDispatchToProps)(BusinessField);
