import React from 'react';
import AdAccountCreate from '../components/AdAccountCreateContainer';
import AdAccountList from '../components/AdAccountListContainer';

class AdAccountListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createFormHidden: false,
    };
  }

  render() {
    return (
      <section className="content">
        <div className="box box-warning">
          <div className="box-header with-border">
            <h3 className="box-title">Tạo Ad Account mới</h3>
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
              <AdAccountCreate />
            </div>
          </div>
        </div>
        <AdAccountList />
      </section>
    );
  }
}

export default AdAccountListPage;
