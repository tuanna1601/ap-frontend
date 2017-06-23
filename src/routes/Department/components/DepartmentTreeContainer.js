import React from 'react';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import 'react-ui-tree/dist/react-ui-tree.css';

import { reduce } from 'lodash';

import { showForm } from '@/store/modal';
import { listDepartments, updateDepartment } from '../redux/department';

import DepartmentTree from './DepartmentTree';
import DepartmentForm from './DepartmentForm';

const mapStateToProps = (state) => ({
  tree: {
    id: 0,
    name: '/',
    children: state.department.nestedDepartments,
  },
  isHighlighted: state.department.isHighlighted
});

const mapDispatchToProps = (dispatch) => ({
  listDepartments: () => dispatch(listDepartments()),
  onEdit: (department) => {
    const updateForm = (
      <DepartmentForm
        form={`department-edit-${department.id}`}
        isLoading={false} initialValues={department}
      />
    );
    dispatch(showForm('Sửa thông tin đơn vị', updateForm,
      values => dispatch(updateDepartment(values, (data) => {
        Alert.success(`${data.name} đã được sửa thành công`);
      }))
    ));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentTree);
