import React from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minimize: false,
    };

    this.toggleBody = this.toggleBody.bind(this);
  }

  onSubmit(values) {
    if (this.props.formSubmitCallback) {
      this.props.formSubmitCallback(values);
    }
    this.props.hideForm();
  }

  toggleBody() {
    this.setState({ minimize: !this.state.minimize });
  }

  render() {
    if (this.props.isShowingFormbox && this.props.formComponent) {
      const formComponentWithProps = React.cloneElement(this.props.formComponent, {
        onSubmit: (values) => this.onSubmit(values),
      });
      return (
        <ModalContainer zIndex={99999}>
          <ModalDialog className="modal-dialog" style={{ borderRadius: 0, padding: 0 }}>
            <div className="modal-header">
              <h4 className="modal-title">{this.props.title}</h4>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" onClick={() => this.toggleBody()}>
                  <i className={`fa ${this.state.minimize ? 'fa-plus' : 'fa-minus'}`} />
                </button>
                <button type="button" className="btn btn-box-tool" onClick={this.props.hideForm}>
                  <i className="fa fa-times" />
                </button>
              </div>
            </div>
            <div className={`modal-body ${this.state.minimize ? 'minimize' : ''}`}>
              {formComponentWithProps}
            </div>
          </ModalDialog>
        </ModalContainer>
      );
    }
    return false;
  }
}

FormModal.propTypes = {
  isShowingFormbox: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  formComponent: React.PropTypes.element,
  formSubmitCallback: React.PropTypes.func,
  hideForm: React.PropTypes.func,
};

export default FormModal;
