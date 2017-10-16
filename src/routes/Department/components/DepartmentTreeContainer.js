import React from 'react';
import { push } from 'react-router-redux';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';

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
        filterOptions={[department.id]}
      />
    );
    dispatch(showForm('Sửa thông tin đơn vị', updateForm,
      values => dispatch(updateDepartment(values, (data) => {
        Alert.success(`${data.name} đã được sửa thành công`);
      }))
    ));
  },
  onToggleHidden: (department) => dispatch(updateDepartment({
    ...department,
    isHidden: !department.isHidden
  })),
  onEditSteps: (department) => {
    dispatch(push(`/department/steps?id=${department.id}`));
  },
  onEditOrdinators: (department) => {
    const updateForm = (
      <DepartmentUpdateUsersForm
        form={`department-ordinators-${department.id}`}
        department={department}
        userRole="ordinators"
        filterRole="ordinator"
      />
    );
    dispatch(showForm('Phân quyền điều phối', updateForm,
      values => {
        const formattedValues = Object.assign({}, values, {
          ordinators: map(values.ordinators, (ordinator) => ordinator.id)
        });
        dispatch(updateDepartment(formattedValues, (data) => {
          Alert.success(`${data.name} đã được sửa thành công`);
        }));
      }
    ));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentTree);
