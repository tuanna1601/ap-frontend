import React from 'react';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { showForm } from '@/store/modal';
import {
  listUsers, setFilterQuery, updateUser,
  goToPage, resetCurrentPage
} from '../redux/user';
import UserList from './UserList';
import UserCreateForm from './UserCreateForm';

const mapStateToProps = (state) => ({
  users: state.user.users,
  isLoadingList: state.user.isLoadingList,
  pagination: state.user.pagination,
});

const mapDispatchToProps = (dispatch) => ({
  setFilterQuery: (query) => dispatch(setFilterQuery(query)),
  listUsers: (query) => dispatch(listUsers(query)),
  goToPage: (page) => dispatch(goToPage(page)),
  resetCurrentPage: () => dispatch(resetCurrentPage()),
  onEdit: (user) => {
    const updateForm = (
      <UserCreateForm
        form={`user-edit-${user.id}`}
        isLoading={false} initialValues={user}
      />
    );
    dispatch(showForm('Sửa người dùng', updateForm,
      values => dispatch(updateUser(values, (data) => {
        Alert.success(`${data.name} đã được sửa thành công`);
      }))
    ));
  },
  onDeactivate: (user) => {
    dispatch(updateUser({
      id: user.id,
      deactivated: !user.deactivated,
    }, (data) => {
      Alert.success(`Tài khoản ${data.email} đã được ${data.deactivated ? 'khoá' : 'kích hoạt'} thành công`);
    }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
