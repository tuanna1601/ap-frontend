import React from 'react';
import CriteriaCreate from '../components/CriteriaCreateContainer';
import CriteriaList from '../components/CriteriaListContainer';

class CriteriaListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createFormHidden: true,
    };
  }

  render() {
    return (
      <section className="content">
        <div className="box box-warning">
          <div className="box-header with-border">
            <h3 className="box-title">Tạo tiêu chí mới</h3>
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
              <CriteriaCreate />
            </div>
          </div>
        </div>
        <CriteriaList />
      </section>
    );
  }
}

export default CriteriaListPage;
