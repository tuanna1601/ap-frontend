import React from 'react';
import CriteriaCreate from '../components/CriteriaCreateContainer';

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
        <div className="box box-success">
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
        <div className="box box-success">
          <div className="box-header with-border">
            <h3 className="box-title">Danh sách tiêu chí</h3>
          </div>
        </div>
      </section>
    );
  }
}

export default CriteriaListPage;
