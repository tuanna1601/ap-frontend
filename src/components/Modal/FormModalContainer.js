import { connect } from 'react-redux';
import { hideForm } from '@/store/modal';
import FormModal from './FormModal';

const mapStateToProps = (state) => ({
  title: state.modal.formTitle,
  isShowingFormbox: state.modal.isShowingFormbox,
  formComponent: state.modal.formComponent,
  formSubmitCallback: state.modal.formSubmitCallback,
});

const mapDispatchToProps = (dispatch) => ({
  hideForm: () => dispatch(hideForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormModal);
