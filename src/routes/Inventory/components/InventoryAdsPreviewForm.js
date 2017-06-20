import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  FormControl, FormControlSelect,
} from '@/components/FormControl';
import Validator from '@/helpers/validator';
import { generateOptionsLabel } from '@/helpers/helper';

const adFormat = [
  'DESKTOP_FEED_STANDARD',
  'MOBILE_FEED_STANDARD',
  'MOBILE_FEED_BASIC',
  'MOBILE_INTERSTITIAL',
  'MOBILE_BANNER',
  'MOBILE_MEDIUM_RECTANGLE',
  'MOBILE_FULLWIDTH',
  'MOBILE_NATIVE',
  'INSTAGRAM_STANDARD',
  'AUDIENCE_NETWORK_OUTSTREAM_VIDEO',
  'INSTANT_ARTICLE_STANDARD',
  'INSTREAM_VIDEO_DESKTOP',
  'INSTREAM_VIDEO_MOBILE',
  'SUGGESTED_VIDEO_DESKTOP',
  'SUGGESTED_VIDEO_MOBILE'
];

// const actionTypes = [
//   'SHOP_NOW', 'BOOK_TRAVEL', 'LEARN_MORE', 'SIGN_UP', 'DOWNLOAD',
//   'GET_DIRECTIONS', 'LIKE_PAGE', 'DONATE_NOW', 'CONTACT_US',
//   'MESSAGE_PAGE', 'SAVE', 'GO_LIVE', 'DONATE', 'SEND_TIP', 'GET_MOBILE_APP',
//   'INSTALL_MOBILE_APP', 'USE_MOBILE_APP', 'INSTALL_APP', 'USE_APP', 'PLAY_GAME',
//   'WATCH_VIDEO', 'WATCH_MORE', 'OPEN_LINK', 'NO_BUTTON', 'LISTEN_MUSIC', 'MOBILE_DOWNLOAD',
//   'GET_OFFER', 'GET_OFFER_VIEW', 'BUY_NOW', 'BUY_TICKETS', 'UPDATE_APP', 'BET_NOW',
//   'ADD_TO_CART', 'ORDER_NOW', 'SELL_NOW', 'CALL', 'MISSED_CALL', 'CALL_NOW',
//   'CALL_ME', 'APPLY_NOW', 'BUY', 'GET_QUOTE', 'SUBSCRIBE', 'RECORD_NOW',
//   'VOTE_NOW', 'GIVE_FREE_RIDES', 'REGISTER_NOW', 'OPEN_MESSENGER_EXT',
//   'EVENT_RSVP', 'CIVIC_ACTION', 'SEND_INVITES', 'REQUEST_TIME', 'SEE_MENU', 'WHATSAPP_MESSAGE'
// ];

class InventoryAdsPreviewForm extends Component {
  componentDidMount() {

  }

  render() {
    const { handleSubmit, isLoading, submitting, pristine, reset } = this.props;

    return (
      <div className="row">
        <div className="col-md-6">
          <div className="box box-success">
            <div className="box-header with-border">
              <h3 className="box-title">Tạo Fb Ads Preview</h3>
              <div className="box-tools pull-right">
                {this.props.isLoading && <i className="fa fa-refresh fa-spin" />}
              </div>
            </div>
            <div className="box-body">
              <form className="table-row" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xs-12">
                    <div className="form-group">
                      <Field
                        type="text" component={FormControl}
                        id="ad_account" name="ad_account"
                        label="Ad account Id" hasLabel
                      />
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <div className="form-group">
                      <Field
                        type="text" component={FormControl}
                        id="access_token" name="access_token"
                        label="Facebook Access Token" hasLabel
                      />
                      <i>Bạn </i>
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <div className="form-group">
                      <Field
                        type="text" component={FormControl}
                        id="creative.object_id" name="creative.object_id"
                        label="Facebook Page ID" hasLabel
                      />
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <div className="form-group">
                      <Field
                        component={FormControlSelect}
                        options={generateOptionsLabel(adFormat)}
                        id="ad_format" name="ad_format"
                        label="Định dạng Ads" hasLabel
                      />
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <div className="form-group">
                      <Field
                        type="text" component={FormControl}
                        id="post.message"
                        name="post.message"
                        label="Message" hasLabel
                      />
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <div className="form-group">
                      <Field
                        type="text" component={FormControl}
                        id="post.link"
                        name="post.link"
                        label="Link" hasLabel
                      />
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <div className="form-group">
                      <Field
                        type="text" component={FormControl}
                        id="post.caption"
                        name="post.caption"
                        label="Caption" hasLabel
                      />
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <div className="form-group">
                      <Field
                        type="text" component={FormControl}
                        id="post.name"
                        name="post.name"
                        label="Name" hasLabel
                      />
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <div className="form-group">
                      <Field
                        type="text" component={FormControl}
                        id="post.picture"
                        name="post.picture"
                        label="Image URL" hasLabel
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <button className="btn btn-success btn-flat" type="submit" disabled={submitting || isLoading}>
                      {isLoading ? <i className="fa fa-refresh fa-spin" /> : <i className="fa fa-save" />}
                    </button>
                    <button
                      className="btn btn-default btn-flat" type="button"
                      disabled={pristine || submitting || isLoading} onClick={reset}
                    >
                      <i className="fa fa-undo" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="box box-success">
            <div className="box-header with-border">
              <h3 className="box-title">
                Ads Preview
              </h3>
            </div>
            <div className="box-body">
              {this.props.adsPreview ? this.props.adsPreview : '&nbsp;'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InventoryAdsPreviewForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,

  form: PropTypes.string.isRequired,
  adsPreview: PropTypes.element,
  ad_format: PropTypes.string
};

export default reduxForm({
  validate: (values) => ({
    ad_account: (new Validator(values.ad_account))
      .validateRequired()
      .getMessage(),
    access_token: (new Validator(values.access_token))
      .validateRequired()
      .getMessage()
  })
})(InventoryAdsPreviewForm);
