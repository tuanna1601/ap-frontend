import { connect } from 'react-redux';
import * as _ from 'lodash';
import { listPages } from '@/store/common';
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

const mapDispatchToProps = (dispatch) => ({
  listOptions: () => dispatch(listPages()),
  resetOptions: () => dispatch(listPages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageField);
