import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import {
  listReviewerInventories, reloadList,
  setFilterQuery, goToPage, resetCurrentPage,
} from '../redux/inventory';
import InventoryReviewerList from './InventoryReviewerList';

const mapStateToProps = (state) => ({
  inventories: state.inventory.inventories,
  isLoadingList: state.inventory.isLoadingList,
  pagination: state.inventory.pagination,
});

const mapDispatchToProps = (dispatch) => ({
  setFilterQuery: (query) => dispatch(setFilterQuery(query)),
  listInventories: () => dispatch(listReviewerInventories()),
  resetInventories: () => dispatch(reloadList([], 0)),
  goToPage: (page) => dispatch(goToPage(page, false, true)),
  resetCurrentPage: () => dispatch(resetCurrentPage()),
  onViewDetail: (inventory) => {
    dispatch(push(`/inventory/detail?id=${inventory.id}`));
  },
  onReview: (inventory) => {
    dispatch(push(`/inventory/review?id=${inventory.id}`));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryReviewerList);
