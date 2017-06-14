import React from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

class ConfirmModal extends React.Component {
  onAccept() {
    if (this.props.confirmCallback) {
      this.props.confirmCallback();
    }
    this.props.hideConfirm();
  }

  render() {
    return this.props.isShowingConfirmBox ? (
      <ModalContainer zIndex={99999}>
        <ModalDialog className="modal-dialog" style={{ borderRadius: 0, padding: 0 }}>
          <div className="modal-header">
            <button type="button" className="close" onClick={this.props.hideConfirm}>
              <span>×</span>
            </button>
            <h4 className="modal-title">Xác nhận</h4>
          </div>
          <div className="modal-body">
            <p>{this.props.confirmMessage}</p>
          </div>
          <div className="modal-footer text-right">
            <input
              type="button" className="btn btn-warning btn-flat"
              onClick={() => this.onAccept()}
              ref={(component) => {
                // request focus if shown
                if (component && this.props.isFocusingAccept) {
                  component.focus();
                }
              }}
              value="Xác nhận"
            />
            <input
              type="button" className="btn btn-default btn-flat"
              onClick={this.props.hideConfirm}
              ref={(component) => {
                // request focus if shown
                if (component && !this.props.isFocusingAccept) {
                  component.focus();
                }
              }}
              value="Cancel"
            />
          </div>
        </ModalDialog>
      </ModalContainer>
    ) : false;
  }
}

ConfirmModal.propTypes = {
  isShowingConfirmBox: React.PropTypes.bool.isRequired,
  isFocusingAccept: React.PropTypes.bool.isRequired,
  hideConfirm: React.PropTypes.func.isRequired,
  confirmCallback: React.PropTypes.func,
  confirmMessage: React.PropTypes.string,
};

export default ConfirmModal;
