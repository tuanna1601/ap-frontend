import React from 'react';
import Alert from 'react-s-alert';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { showForm } from '@/store/modal';

import {
  listInventories, listOrdinatorInventories, setFilterQuery,
  goToPage, resetCurrentPage, assignInventory, reloadList
} from '../redux/inventory';
import InventoryList from './InventoryList';
import InventoryAssignForm from './InventoryAssignFormContainer';

const mapStateToProps = (state) => ({
  inventories: state.inventory.inventories,
  isLoadingList: state.inventory.isLoadingList,
  pagination: state.inventory.pagination,
});

const mapDispatchToProps = (dispatch) => ({
  setFilterQuery: (query) => dispatch(setFilterQuery(query)),
  listInventories: () => dispatch(listInventories()),
  listOrdinatorInventories: () => dispatch(listOrdinatorInventories()),
  resetInventories: () => dispatch(reloadList([])),
  goToPage: (page) => dispatch(goToPage(page)),
  resetCurrentPage: () => dispatch(resetCurrentPage()),
  onEdit: (inventory) => {
    dispatch(push(`/inventory/update?id=${inventory.id}`));
  },
  onCreateAds: (inventory) => {
    dispatch(push(`/inventory/ads-create?inventoryId=${inventory.id}`));
  },
  onAssign: (inventory) => {
    const initialValues = {
      inventory: inventory.id,
      name: inventory.name,
      steps: inventory.steps,
    };
    const AssignForm = (
      <InventoryAssignForm
        steps={inventory.steps}
        initialValues={initialValues}
        department={inventory.department}
      />
    );
    dispatch(showForm('Phân công duyệt kho', AssignForm, (values) => {
      dispatch(assignInventory(values), (data) => {
        Alert.success(`${data.name} đã được phân công`);
      });
    }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InventoryList);
