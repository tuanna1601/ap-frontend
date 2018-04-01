import { connect } from 'react-redux';
import { chain, get } from 'lodash';

import { listPages } from '@/store/common';

import PageField from './PageField';

const mapDispatchToProps = (dispatch, { business }) => ({
  listOptions: async (businessId = business) => dispatch(listPages(businessId)),
  transformData: (data, callback) => {
    const options = chain(get(data, 'payload.rows', []))
      .orderBy(['name'], ['asc'])
      .map((page) => ({
        value: page.pageId,
        label: `${page.name}`,
        page
      }))
      .value();
    callback(options);
  },
});

export default connect(null, mapDispatchToProps)(PageField);
