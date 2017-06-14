import React from 'react';
import RBAC from '@/components/RBAC';
import UserList from '../components/UserListContainer';
import UserCreateForm from '../components/UserCreateFormContainer';

class ProductListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createFormHidden: true,
    };
  }

  render() {
    return (
      <section className="content">
        <RBAC requiredPermissions={['user:create']}>
          <div className="box box-success">
            <div className="box-header with-border">
              <h3 className="box-title">Thêm người dùng</h3>
              <div className="box-tools pull-right">
                <button
                  type="button" className="btn btn-box-tool"
                  onClick={() => this.setState({ createFormHidden: !this.state.createFormHidden })}
                >
                  {this.state.createFormHidden ? <i className="fa fa-plus" /> : <i className="fa fa-minus" />}
                </button>
              </div>
            </div>
            <div className="box-body" hidden={this.state.createFormHidden}>
              <div className="form-create">
                <UserCreateForm />
              </div>
            </div>
          </div>
        </RBAC>
        <UserList />
      </section>
    );
  }
}

export default ProductListPage;
