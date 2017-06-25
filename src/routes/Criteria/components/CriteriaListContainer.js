import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-s-alert';

import { showForm } from '@/store/modal';
import { listCriteria, updateCriteria, deleteCriteria } from '../redux/criteria';
import CriteriaList from './CriteriaList';
import CriteriaUpdateForm from './CriteriaUpdateForm';

const mapStateToProps = (state) => ({
  criteria: state.criteria.criteria,
  isLoading: state.criteria.isLoadingList
});

const mapDispatchToProps = (dispatch) => ({
  onComponentMounted: () => {
    dispatch(listCriteria());
  },
  onEdit: (criterion) => {
    const initialValues = {
      id: criterion.id,
      name: criterion.name,
      department: criterion.department ? criterion.department.id : undefined
    };
    const updateForm = (
      <CriteriaUpdateForm form="criterion-update" initialValues={initialValues} />
    );
    dispatch(showForm('Sửa tiêu chí', updateForm, (values) => {
      dispatch(updateCriteria(values), () => {
        Alert('Tiêu chí đã được sửa thành công');
      });
    }));
  },
  onDelete: (criterion) => {
    dispatch(deleteCriteria(criterion.id), () => {
      Alert('Tiêu chí đã được xoá thành công');
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CriteriaList);
