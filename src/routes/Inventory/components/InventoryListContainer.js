import React from 'react';
import { Alert } from 'react-s-alert';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { showForm } from '@/store/modal';

import {
  listInventories, listOrdinatorInventories, setFilterQuery,
  goToPage, resetCurrentPage, assignInventory
} from '../redux/inventory';
import InventoryList from './InventoryList';
import InventoryAssignForm from './InventoryAssignForm';

const mapStateToProps = (state) => ({
  inventories: state.inventory.inventories,
  isLoadingList: state.inventory.isLoadingList,
  pagination: state.inventory.pagination,
});

const mapDispatchToProps = (dispatch) => ({
  setFilterQuery: (query) => dispatch(setFilterQuery(query)),
  listInventories: () => dispatch(listInventories()),
  listOrdinatorInventories: () => dispatch(listOrdinatorInventories()),
  goToPage: (page) => dispatch(goToPage(page)),
  resetCurrentPage: () => dispatch(resetCurrentPage()),
  onEdit: (inventory) => {
    dispatch(push(`/inventory/update?id=${inventory.id}`));
  },
  onAssign: (inventory) => {
    const initialValues = {
      inventory: inventory.id,
      name: inventory.name,
      reviewer: inventory.reviewer
    };
    const AssignForm = (
      <InventoryAssignForm
        form="inventory-assign"
        department={inventory.department}
        initialValues={initialValues}
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
