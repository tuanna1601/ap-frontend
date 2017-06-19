import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import {
  listInventories, setFilterQuery,
  goToPage, resetCurrentPage
} from '../redux/inventory';
import InventoryList from './InventoryList';

const mapStateToProps = (state) => ({
  inventories: state.inventory.inventories,
  isLoadingList: state.inventory.isLoadingList,
  pagination: state.inventory.pagination,
});

const mapDispatchToProps = (dispatch) => ({
  setFilterQuery: (query) => dispatch(setFilterQuery(query)),
  listInventories: (query) => dispatch(listInventories(query)),
  goToPage: (page) => dispatch(goToPage(page)),
  resetCurrentPage: () => dispatch(resetCurrentPage()),
  onEdit: (inventory) => {
    dispatch(push(`/inventory/update?id=${inventory.id}`));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryList);
