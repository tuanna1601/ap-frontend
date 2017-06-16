import React from 'react';
import RBAC from '@/components/RBAC';
import * as _ from 'lodash';
import Reactable from 'reactable';
import renderPagination from '@/helpers/pagination';

const Table = Reactable.Table;
const Thead = Reactable.Thead;
const Th = Reactable.Th;
const Tr = Reactable.Tr;
const Td = Reactable.Td;

class UserList extends React.Component {
  componentDidMount() {
    this.props.setFilterQuery({});
    this.props.listUsers();
  }

  componentWillUnmount() {
    this.props.setFilterQuery({});
    this.props.resetCurrentPage();
  }

  render() {
    const { page, limit, count } = this.props.pagination;

    return (
      <div className="box box-success">
        <div className="box-header with-border">
          <h3 className="box-title">Danh sách nhân viên</h3>
          <div className="box-tools pull-right">
            {this.props.isLoadingList && <i className="fa fa-refresh fa-spin" />}
          </div>
        </div>
        <div className="box-body">
          <div className="table-responsive">
            <Table className="table table-striped table-bordered" sortable>
              <Thead>
                <Th column="id">ID</Th>
                <Th column="name">Tên</Th>
                <Th column="email">Email</Th>
                <Th column="dept">Phòng ban</Th>
                <Th column="action">Thao tác</Th>
              </Thead>
              {_.chain(this.props.users)
                .orderBy(['isHighlighted', 'name'], ['asc', 'asc'])
                .map((user) => <Tr key={user.id} className={user.isHighlighted ? 'highlighted table-row' : 'table-row'}>
                  <Td column="id">{user._id}</Td>
                  <Td column="name">{user.name}</Td>
                  <Td column="email">{user.email}</Td>
                  <Td column="role" value={`${user._id}${user.roles[0]}`}>
                    {user.roles.join(', ')}
                  </Td>
                  <Td column="action" value={user.id} className="table-col button-list">
                    <RBAC requiredPermissions={['user:update']}>
                      <button
                        className="btn btn-xs btn-warning btn-flat"
                        onClick={() => this.props.onEdit(user)}
                        title="Sửa"
                      >
                        <i className="fa fa-fw fa-pencil" />
                      </button>
                    </RBAC>
                  </Td>
                </Tr>
                ).value()
              }
            </Table>
          </div>
        </div>
        <div className="box-footer clearfix">
          {renderPagination(count, limit, page, this.props.goToPage)}
        </div>
      </div>
    );
  }
}

UserList.propTypes = {
  users: React.PropTypes.object.isRequired,
  pagination: React.PropTypes.object.isRequired,
  listUsers: React.PropTypes.func.isRequired,
  setFilterQuery: React.PropTypes.func.isRequired,
  goToPage: React.PropTypes.func.isRequired,
  resetCurrentPage: React.PropTypes.func.isRequired,

  isLoadingList: React.PropTypes.bool.isRequired,
  onEdit: React.PropTypes.func.isRequired,
};

export default UserList;
