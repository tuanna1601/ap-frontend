import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as _ from 'lodash';
import {
  FormControl, FormControlSelect
} from '@/components/FormControl';
import {
  AdAccountField, AdCampaignField, AdSetField
} from '@/components/Field';
import Validator from '@/helpers/validator';
import { generateOptionsLabel, generateAdFormatOptions } from '@/helpers/helper';

const actionTypes = [
  'LEARN_MORE',
  'LIKE_PAGE',
  'CONTACT_US',
  'WATCH_MORE',
  'OPEN_LINK',
  'BUY_NOW',
  'APPLY_NOW',
  'SUBSCRIBE',
  'REGISTER_NOW',
];

class InventoryAdsCreateForm extends Component {
  componentWillMount() {
    if (!this.props.inventoryId) {
      this.props.navigateToList();
    }
  }

  componentDidMount() {
    this.props.onComponentMounted();
  }

  componentWillUnmount() {
    this.props.resetAdsPreview();
  }

  renderMediaArr(media, type) {
    const videoNodes = [];
    const imageNodes = [];
    _.each(media, (md, index) => {
      if (md.type === 'video') {
        const node = (
          <tr key={md._id} className="form-group">
            <td style={{ width: '10%' }} className="table-col">
              <Field
                type="radio" component={FormControl}
                id={`media[${index}]`}
                name="media"
                value={md._id}
              />
            </td>
            <td className="table-col">
              <label
                style={{ width: '100%', cursor: 'pointer' }}
                htmlFor={type !== `media[${index}]`}
              >
                <video
                  controls
                  style={{ maxWidth: '50%' }}
                  poster={`${__CONFIG__.API.SERVER_URL}/${md.thumbnail}`}
                >
                  <source src={`${__CONFIG__.API.SERVER_URL}/${md.path}`} />
                </video>
              </label>
            </td>
          </tr>
        );
        videoNodes.push(node);
      } else {
        const node = (
          <tr key={md._id} className="form-group">
            <td style={{ width: '10%' }} className="table-col">
              <Field
                type={type !== 'slideshow' ? 'radio' : 'checkbox'} component={FormControl}
                id={type !== 'slideshow' ? `media[${index}]` : `selectedMedia[${index}]`}
                name={type !== 'slideshow' ? 'media' : `selectedMedia[${index}]`}
                value={md._id}
              />
            </td>
            <td className="table-col">
              <label
                style={{ width: '100%', cursor: 'pointer' }}
                htmlFor={type !== 'slideshow' ? `media[${index}]` : `selectedMedia[${index}]`}
              >
                <img
                  src={`${__CONFIG__.API.SERVER_URL}/${md.path}`}
                  alt={md.path}
                  style={{ maxWidth: '50%' }}
                  className="img-thumbnail"
                />
              </label>
            </td>
          </tr>
        );
        imageNodes.push(node);
      }
    });
    if (type === 'video') {
      return videoNodes;
    }
    return imageNodes;
  }

  render() {
    const { handleSubmit, isLoadingCreate, isLoadingList, isLoadingPreview, submitting, onPreviewAd,
      pristine, reset, inventory, adaccount, adcampaign, type, resetMedia, adsPreview, resetCampaign } = this.props;

    let headlineOptions = [];
    let descriptionOptions = [];

    if (inventory) {
      headlineOptions = _.map(inventory.headlines, (headline) => ({
        value: headline.text,
        label: headline.text
      }));

      descriptionOptions = _.map(inventory.descriptions, (des) => ({
        value: des.text,
        label: des.text
      }));
    }

    return (
      <div className="row">
        <div className="col-md-6">
          <div className="box box-success">
            <div className="box-header with-border">
              <h3 className="box-title">Tạo Facebook Ads</h3>
              <div className="box-tools pull-right">
                {isLoadingCreate && <i className="fa fa-refresh fa-spin" />}
              </div>
            </div>
            {!isLoadingList && inventory &&
              <div className="box-body">
                <form className="table-row" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xs-12">
                      <AdAccountField
                        id="adaccount" name="adaccount"
                        label="Ad account" hasLabel
                        onSelect={resetCampaign}
                        autoSelect={false}
                      />
                    </div>
                    {adaccount &&
                      <div className="col-xs-12">
                        <AdCampaignField
                          id="adcampaign" name="adcampaign"
                          label="Ad Campaign" hasLabel
                          account={adaccount}
                          autoSelect={false}
                        />
                      </div>
                    }
                    {adaccount && adcampaign &&
                      adcampaign !== '' &&
                      <div className="col-xs-12">
                        <AdSetField
                          id="adset" name="adset"
                          label="Ad Set" hasLabel
                          account={adaccount}
                          campaign={adcampaign}
                          autoSelect={false}
                        />
                      </div>
                    }
                    <div className="col-xs-12">
                      <Field
                        type="text" component={FormControl}
                        id="page" name="page"
                        label="Facebook Page ID" hasLabel
                      />
                    </div>
                    <div className="col-xs-12">
                      <Field
                        type="text" component={FormControl}
                        id="name" name="name"
                        label="Tên Ads" hasLabel
                      />
                    </div>
                    <div className="col-xs-12">
                      <Field
                        component={FormControlSelect}
                        options={generateAdFormatOptions()}
                        onChange={resetMedia}
                        id="type" name="type"
                        label="Định dạng Ads" hasLabel
                      />
                    </div>
                    {type !== 'slideshow' &&
                      <div className="col-xs-12">
                        <Field
                          component={FormControlSelect}
                          options={generateOptionsLabel(actionTypes)}
                          id="callToAction" name="callToAction"
                          label="Call to action" hasLabel
                        />
                      </div>
                    }
                    <div className="col-xs-12">
                      <div className="form-group">
                        <label htmlFor="message" className="control-label">
                          Text
                        </label>
                        <p>{inventory.text.text}</p>
                      </div>
                    </div>
                    {type !== 'slideshow' &&
                      <div className="col-xs-12">
                        <Field
                          type="text" component={FormControlSelect}
                          id="headline" name="headline"
                          options={headlineOptions}
                          label="Headline" hasLabel
                        />
                      </div>
                    }
                    {type !== 'slideshow' &&
                      <div className="col-xs-12">
                        <Field
                          type="text" component={FormControlSelect}
                          id="description" name="description"
                          options={descriptionOptions}
                          label="Newsfeed Description" hasLabel
                        />
                      </div>
                    }
                    {type !== 'slideshow' &&
                      <div className="col-xs-12">
                        <Field
                          type="text" component={FormControl}
                          id="websiteUrl" name="websiteUrl"
                          label="Website URL" hasLabel
                        />
                      </div>
                    }
                    {type !== 'slideshow' &&
                      <div className="col-xs-12">
                        <Field
                          type="text" component={FormControl}
                          id="displayLink" name="displayLink"
                          label="Display Link" hasLabel
                        />
                      </div>
                    }
                    <div className="col-xs-12">
                      <div className="table-responsive">
                        <label htmlFor="message" className="control-label">Media</label>
                        <table className="table">
                          <tbody>
                            {this.renderMediaArr(inventory.medias, type)}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      <button
                        className="btn btn-success btn-flat"
                        disabled={submitting || isLoadingCreate}
                        type="submit"
                      >
                        {isLoadingCreate ? <i className="fa fa-refresh fa-spin" /> : <i className="fa fa-save" />}
                      </button>
                      <button
                        className="btn btn-primary btn-flat"
                        disabled={isLoadingPreview}
                        type="button"
                        onClick={() => onPreviewAd(this.props)}
                      >
                        {isLoadingPreview ? <i className="fa fa-refresh fa-spin" /> : <i className="fa fa-search" />}
                      </button>
                      <button
                        className="btn btn-default btn-flat" type="button"
                        disabled={pristine || submitting || isLoadingCreate} onClick={reset}
                      >
                        <i className="fa fa-undo" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            }
          </div>
        </div>
        <div className="col-md-6">
          <div className="box box-success">
            <div className="box-header with-border">
              <h3 className="box-title">Ads Preview</h3>
              <div className="box-tools pull-right">
                {isLoadingPreview && <i className="fa fa-refresh fa-spin" />}
              </div>
            </div>
            <div className="box-body">
              <div className="iframe">
                {adsPreview || '&nbsp;'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InventoryAdsCreateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  isLoadingPreview: PropTypes.bool.isRequired,
  isLoadingCreate: PropTypes.bool.isRequired,
  isLoadingList: PropTypes.bool.isRequired,

  adaccount: PropTypes.string,
  adcampaign: PropTypes.string,
  type: PropTypes.string,
  form: PropTypes.string.isRequired,
  adsPreview: PropTypes.element,
  inventory: PropTypes.object,
  inventoryId: PropTypes.string,
  formVal: PropTypes.object,

  onPreviewAd: PropTypes.func.isRequired,
  onComponentMounted: PropTypes.func.isRequired,
  resetAdsPreview: PropTypes.func.isRequired,
  navigateToList: PropTypes.func.isRequired,
  resetMedia: PropTypes.func.isRequired,
  resetCampaign: PropTypes.func.isRequired
};

export default reduxForm({
  validate: (values = {}) => ({
    name: (new Validator(values.name))
      .validateRequired()
      .getMessage(),
    adaccount: (new Validator(values.adaccount))
      .validateRequired()
      .getMessage(),
    adset: (new Validator(values.adset))
      .validateRequired()
      .getMessage(),
    page: (new Validator(values.page))
      .validateRequired()
      .getMessage(),
    message: (new Validator(values.message))
      .validateRequired()
      .getMessage(),
    media: (new Validator(values.media))
      .validateRequired()
      .getMessage(),
    selectedMedia: (new Validator(values.selectedMedia))
      .validateRequired()
      .getMessage(),
    headline: (new Validator(values.headline))
      .validateRequired()
      .getMessage(),
    description: (new Validator(values.description))
      .validateRequired()
      .getMessage(),
    websiteUrl: (new Validator(values.websiteUrl))
      .validateRequired()
      .getMessage(),
    access_token: (new Validator(values.access_token))
      .validateRequired()
      .getMessage()
  })
})(InventoryAdsCreateForm);
