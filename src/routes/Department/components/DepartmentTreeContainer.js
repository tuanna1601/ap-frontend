import React from 'react';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import 'react-ui-tree/dist/react-ui-tree.css';

import { map } from 'lodash';

import { showForm } from '@/store/modal';
import { listDepartments, updateDepartment } from '../redux/department';

import DepartmentTree from './DepartmentTree';
import DepartmentForm from './DepartmentForm';
import DepartmentUpdateUsersForm from './DepartmentUpdateUsersContainer';

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
  },
  onEditReviewers: (department) => {
    const updateForm = (
      <DepartmentUpdateUsersForm
        form={`department-reviewers-${department.id}`}
        department={department}
        userRole="reviewers"
      />
    );
    dispatch(showForm('Phân quyền duyệt', updateForm,
      values => {
        const formattedValues = Object.assign({}, values, {
          reviewers: map(values.reviewers, (reviewer) => reviewer._id)
        });
        dispatch(updateDepartment(formattedValues, (data) => {
          Alert.success(`${data.name} đã được sửa thành công`);
        }));
      }
    ));
  },
  onEditOrdinators: (department) => {
    const updateForm = (
      <DepartmentUpdateUsersForm
        form={`department-ordinators-${department.id}`}
        department={department}
        userRole="ordinators"
      />
    );
    dispatch(showForm('Phân quyền điều phối', updateForm,
      values => {
        const formattedValues = Object.assign({}, values, {
          ordinators: map(values.ordinators, (ordinator) => ordinator._id)
        });
        dispatch(updateDepartment(formattedValues, (data) => {
          Alert.success(`${data.name} đã được sửa thành công`);
        }));
      }
    ));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentTree);
