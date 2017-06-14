import { connect } from 'react-redux';
import { hideConfirm } from '@/store/modal';
import ConfirmModal from './ConfirmModal';

const mapStateToProps = (state) => ({
  isShowingConfirmBox: state.modal.isShowingConfirmBox,
  isFocusingAccept: state.modal.isFocusingAccept,
  confirmMessage: state.modal.confirmMessage,
  confirmCallback: state.modal.confirmCallback,
});

const mapDispatchToProps = (dispatch) => ({
  hideConfirm: () => dispatch(hideConfirm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
