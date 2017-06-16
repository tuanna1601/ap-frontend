import React from 'react';
import RBAC from '@/components/RBAC';
import { Tabs, Tab } from '@/components/Tabs';

import UserList from '../components/UserListContainer';
import UserCreateForm from '../components/UserCreateFormContainer';
import UserImportForm from '../components/UserImportFormContainer';

class UserListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createFormHidden: false,
    };
  }

  render() {
    return (
      <section className="content">
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
            <Tabs>
              <Tab title="Thêm nhân viên">
                <div className="form-create">
                  <UserCreateForm />
                </div>
              </Tab>
              <Tab title="Thêm nhân viên từ file">
                <div className="form-create">
                  <UserImportForm />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        <UserList />
      </section>
    );
  }
}

export default UserListPage;
