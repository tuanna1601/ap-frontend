import React from 'react';
import { connect } from 'react-redux';
import { showForm } from '@/store/modal';
import Alert from 'react-s-alert';
import {
  listUsers, updateUser,
  setFilterQuery, goToPage, resetCurrentPage
} from '../redux/user';
import UserList from './UserList';
import UserEditForm from './UserEditFormContainer';

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
    const updateForm = <UserEditForm form={`user-edit-${user.id}`} initialValues={user} />;
    dispatch(showForm('Sửa người dùng', updateForm,
      values => dispatch(updateUser(values, (data) => Alert.success(`${data.name} đã được sửa thành công`)))
    ));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
