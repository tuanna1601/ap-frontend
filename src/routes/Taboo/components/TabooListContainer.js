import React from 'react';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';

import { showForm } from '@/store/modal';
import { listTaboo, updateTaboo, deleteTaboo } from '../redux/taboo';
import TabooList from './TabooList';
import TabooUpdateForm from './TabooUpdateForm';

const mapStateToProps = (state) => ({
  taboos: state.taboo.taboos,
  isLoading: state.taboo.isLoadingList
});

const mapDispatchToProps = (dispatch) => ({
  onComponentMounted: () => {
    dispatch(listTaboo());
  },
  onEdit: (taboo) => {
    const initialValues = {
      id: taboo.id,
      name: taboo.name,
    };
    const updateForm = (
      <TabooUpdateForm form="taboo-update" initialValues={initialValues} />
    );
    dispatch(showForm('Sửa từ cấm', updateForm, (values) => {
      dispatch(updateTaboo(values), () => {
        Alert.success('Từ cấm đã được sửa thành công');
      });
    }));
  },
  onDelete: (taboo) => {
    dispatch(deleteTaboo(taboo.id), () => {
      Alert.success('Từ cấm đã được xoá thành công');
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TabooList);
