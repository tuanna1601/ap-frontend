import { connect } from 'react-redux';
import { hideInfo } from '@/store/modal';
import InfoModal from './InfoModal';

const mapStateToProps = (state) => ({
  title: state.modal.infoTitle,
  isShowingInfoBox: state.modal.isShowingInfoBox,
  infoComponent: state.modal.infoComponent,
  infoActionCallback: state.modal.infoActionCallback,
});

const mapDispatchToProps = (dispatch) => ({
  hideInfo: () => dispatch(hideInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoModal);
