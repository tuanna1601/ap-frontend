import React from 'react';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import { map } from 'lodash';

import { showForm, showConfirm } from '@/store/modal';
import { listSteps, deleteStep, updateStep, changeStepOrder } from '../redux/department';

import DepartmentStepList from './DepartmentStepList';
import DepartmentStepUpdate from './DepartmentStepUpdateContainer';

const mapStateToProps = (state) => ({
  isLoading: state.department.isLoadingList,
  steps: state.department.steps,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onComponentMounted: () => {
    dispatch(listSteps(ownProps.department));
  },
  onEdit: (step) => {
    const formattedValues = {
      ...step,
      department: step.department.id,
      reviewingDepartment: step.reviewingDepartment.id,
      criteria: map(step.criteria, item => ({
        label: item.name,
        value: item.id,
        item,
      })),
    };
    const updateForm = (
      <DepartmentStepUpdate form="step-update-form" initialValues={formattedValues} />
    );
    dispatch(showForm('Sửa bước duyệt', updateForm, (values) => {
      dispatch(updateStep(values, (data) => {
        Alert.success(`${data.title} đã được sửa thành công`);
      }));
    }));
  },
  onDelete: (step) => {
    dispatch(showConfirm(`Bạn có chắc chắn muốn xoá bước duyệt ${step.title}?`,
      () => dispatch(deleteStep(step, () => {
        Alert.success(`${step.title} đã được xoá thành công`);
      }))
    ));
  },
  onChangeStepOrder: (step, order) => {
    dispatch(changeStepOrder({
      ...step,
      order,
    }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentStepList);
