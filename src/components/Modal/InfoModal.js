import React, { PropTypes } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

class InfoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minimize: false,
    };

    this.toggleBody = this.toggleBody.bind(this);
  }

  onClickCallback(values) {
    if (this.props.infoActionCallback) {
      this.props.infoActionCallback(values);
    }
  }

  toggleBody() {
    this.setState({ minimize: !this.state.minimize });
  }

  render() {
    if (this.props.isShowingInfoBox && this.props.infoComponent) {
      const infoComponentWithProps = React.cloneElement(this.props.infoComponent, {
        onSubmit: (values) => this.onClickCallback(values),
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
                <button type="button" className="btn btn-box-tool" onClick={this.props.hideInfo}>
                  <i className="fa fa-times" />
                </button>
              </div>
            </div>
            <div className={`modal-body ${this.state.minimize ? 'minimize' : ''}`}>
              {infoComponentWithProps}
            </div>
          </ModalDialog>
        </ModalContainer>
      );
    }
    return false;
  }
}

InfoModal.propTypes = {
  isShowingInfoBox: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  infoComponent: PropTypes.element,
  infoActionCallback: React.PropTypes.func,
  hideInfo: PropTypes.func.isRequired,
};

export default InfoModal;
