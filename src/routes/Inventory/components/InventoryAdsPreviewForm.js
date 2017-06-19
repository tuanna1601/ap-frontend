import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  FormControl, FormControlSelect,
  FormControlTextArea,
} from '@/components/FormControl';
import Validator from '@/helpers/validator';
import { generateOptionsLabel } from '@/helpers/helper';

const adFormat = [
  'RIGHT_COLUMN_STANDARD',
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

const actionTypes = [
  'SHOP_NOW', 'BOOK_TRAVEL', 'LEARN_MORE', 'SIGN_UP', 'DOWNLOAD',
  'GET_DIRECTIONS', 'LIKE_PAGE', 'DONATE_NOW', 'CONTACT_US',
  'MESSAGE_PAGE', 'SAVE', 'GO_LIVE', 'DONATE', 'SEND_TIP', 'GET_MOBILE_APP',
  'INSTALL_MOBILE_APP', 'USE_MOBILE_APP', 'INSTALL_APP', 'USE_APP', 'PLAY_GAME',
  'WATCH_VIDEO', 'WATCH_MORE', 'OPEN_LINK', 'NO_BUTTON', 'LISTEN_MUSIC', 'MOBILE_DOWNLOAD',
  'GET_OFFER', 'GET_OFFER_VIEW', 'BUY_NOW', 'BUY_TICKETS', 'UPDATE_APP', 'BET_NOW',
  'ADD_TO_CART', 'ORDER_NOW', 'SELL_NOW', 'CALL', 'MISSED_CALL', 'CALL_NOW',
  'CALL_ME', 'APPLY_NOW', 'BUY', 'GET_QUOTE', 'SUBSCRIBE', 'RECORD_NOW',
  'VOTE_NOW', 'GIVE_FREE_RIDES', 'REGISTER_NOW', 'OPEN_MESSENGER_EXT',
  'EVENT_RSVP', 'CIVIC_ACTION', 'SEND_INVITES', 'REQUEST_TIME', 'SEE_MENU', 'WHATSAPP_MESSAGE'
];

class InventoryAdsPreviewForm extends Component {
  componentDidMount() {

  }

  render() {
    const { handleSubmit, isLoading, submitting, pristine, reset } = this.props;

    return (
      <div className="box box-success">
        <div className="box-header with-border">
          <h3 className="box-title">
            Tạo Fb Ads Preview
          </h3>
          <div className="box-tools pull-right">
            {this.props.isLoading && <i className="fa fa-refresh fa-spin" />}
          </div>
        </div>
        <div className="box-body">
          <form className="table-row" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-xs-6">
                <div className="form-group">
                  <Field
                    type="text" component={FormControl}
                    id="access_token" name="access_token"
                    label="Facebook App Token" hasLabel
                  />
                </div>
              </div>
              <div className="col-xs-6">
                <div className="form-group">
                  <Field
                    component={FormControlSelect}
                    options={generateOptionsLabel(adFormat)}
                    id="ad_format" name="ad_format"
                    label="Định dạng Ads" hasLabel
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4">
                <div className="form-group">
                  <Field
                    type="text" component={FormControl}
                    id="creative.object_story_spec.link_data.message"
                    name="creative.object_story_spec.link_data.message"
                    label="Message" hasLabel
                  />
                </div>
              </div>
              <div className="col-xs-4">
                <div className="form-group">
                  <Field
                    type="text" component={FormControl}
                    id="creative.object_story_spec.link_data.link"
                    name="creative.object_story_spec.link_data.link"
                    label="Link" hasLabel
                  />
                </div>
              </div>
              <div className="col-xs-4">
                <div className="form-group">
                  <Field
                    type="text" component={FormControl}
                    id="creative.object_story_spec.link_data.caption"
                    name="creative.object_story_spec.link_data.caption"
                    label="Caption" hasLabel
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4">
                <div className="form-group">
                  <Field
                    type="text" component={FormControl}
                    id="creative.name"
                    name="creative.name"
                    label="Name" hasLabel
                  />
                </div>
              </div>
              <div className="col-xs-4">
                <div className="form-group">
                  <Field
                    type="text" component={FormControlTextArea}
                    id="creative.body"
                    name="creative.body"
                    label="Body" hasLabel
                  />
                </div>
              </div>
              <div className="col-xs-4">
                <div className="form-group">
                  <Field
                    type="text" component={FormControl}
                    id="creative.title"
                    name="creative.title"
                    label="Title" hasLabel
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4">
                <div className="form-group">
                  <Field
                    type="text" component={FormControl}
                    id="creative.picture"
                    name="creative.picture"
                    label="Image URL" hasLabel
                  />
                </div>
              </div>
              <div className="col-xs-4">
                <div className="form-group">
                  <Field
                    type="text" component={FormControlSelect}
                    options={generateOptionsLabel(actionTypes)}
                    id="creative.call_to_action_type"
                    name="creative.call_to_action_type"
                    label="Call to action" hasLabel
                  />
                </div>
              </div>
              <div className="col-xs-4">
                <div className="form-group">
                  <Field
                    type="text" component={FormControl}
                    id="creative.object_url" name="creative.object_url"
                    label="Target URL" hasLabel
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
          </form >
        </div >
      </div >
    );
  }
}

export default reduxForm()(InventoryAdsPreviewForm);
