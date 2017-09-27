import { connect } from 'react-redux';
import * as _ from 'lodash';
import { listPages, resetPages } from '@/store/common';
import PageField from './PageField';

const mapStateToProps = (state) => ({
  options: _.chain(state.common.pages)
    .orderBy(['name'], ['asc'])
    .map((page) => ({
      value: page.pageId,
      label: `${page.name}`,
      page
    }))
    .value(),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  listOptions: (business = ownProps.business) => dispatch(listPages(business)),
  resetOptions: () => dispatch(resetPages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageField);
