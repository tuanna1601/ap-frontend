import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { map, filter, each } from 'lodash';
import {
  FormControl, FormControlSelect,
  FormControlRadioGroup, FormControlCheckboxGroup
} from '@/components/FormControl';
import {
  AdAccountField, BusinessField, AdCampaignField, AdSetField, PageField
} from '@/components/Field';
import navConfirm from '@/components/HighOrder/navConfirm';
import Validator from '@/helpers/validator';
import {
  generateOptionsLabel, generateAdFormatOptions,
} from '@/helpers/helper';

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

const getImageLabel = (md) => (
  <div>
    <img
      src={md.path}
      alt={md.path}
      style={{ maxWidth: '50%' }}
      className="img-thumbnail"
    />
    <input
      type="text"
      className="form-control"
      value={md.path} readOnly
    />
  </div>
);

const getVideoLabel = (md) => (
  <div>
    <video
      controls
      style={{ maxWidth: '50%' }}
      poster={md.thumbnail}
    >
      <source src={md.path} />
    </video>
    <input
      type="text"
      className="form-control"
      value={md.path} readOnly
    />
  </div>
);

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
    const radioOptions = [];
    const checkboxOptions = [];
    each(media, (med) => {
      if (med.type === type) {
        radioOptions.push({
          value: med._id,
          label: type === 'image' ? getImageLabel(med) : getVideoLabel(med)
        });
      }
      if (med.type === 'image') {
        checkboxOptions.push({
          value: med._id,
          label: getImageLabel(med)
        });
      }
    });
    if (type !== 'slideshow') {
      return (
        <Field
          component={FormControlRadioGroup}
          name="media"
          label="Media"
          options={radioOptions}
        />
      );
    }
    return (
      <Field
        component={FormControlCheckboxGroup}
        name="mediaArr"
        label="Media"
        options={checkboxOptions}
      />
    );
  }

  render() {
    const { handleSubmit, isLoadingCreate, isLoadingList, isLoadingPreview, submitting, onPreviewAd,
      inventory, businessId, adaccount, adcampaign, type, resetMedia, adsPreview, resetCampaign,
      resetAdAccount, callToAction } = this.props;

    let headlineOptions = [];
    let descriptionOptions = [];

    if (inventory) {
      headlineOptions = map(inventory.headlines, (headline) => ({
        value: headline.text,
        label: headline.text
      }));

      descriptionOptions = map(inventory.descriptions, (des) => ({
        value: des.text,
        label: des.text
      }));
    }

    const isDescAvail = (type === 'image') || (type !== 'image' && callToAction !== 'LIKE_PAGE');

    return (
      <div className="row">
        <div className="col-md-6">
          <div className="box box-warning">
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
                      <BusinessField
                        id="businessId" name="businessId"
                        label="Business Manager" hasLabel
                        onSelect={resetAdAccount}
                        autoSelect={false}
                      />
                    </div>
                    {businessId &&
                      <div className="col-xs-12">
                        <AdAccountField
                          id="adaccount" name="adaccount"
                          label="Ad account" hasLabel
                          business={businessId}
                          onSelect={resetCampaign}
                          autoSelect={false}
                        />
                      </div>
                    }
                    {businessId && adaccount &&
                      <div className="col-xs-12">
                        <AdCampaignField
                          id="adcampaign" name="adcampaign"
                          label="Ad Campaign" hasLabel
                          business={businessId}
                          account={adaccount}
                          autoSelect={false}
                        />
                      </div>
                    }
                    {businessId && adaccount && adcampaign &&
                      adcampaign !== '' &&
                      <div className="col-xs-12">
                        <AdSetField
                          id="adset" name="adset"
                          label="Ad Set" hasLabel
                          business={businessId}
                          account={adaccount}
                          campaign={adcampaign}
                          autoSelect={false}
                        />
                      </div>
                    }
                    {businessId &&
                      <div className="col-xs-12">
                        <PageField
                          id="page" name="page"
                          label="Facebook Page ID"
                          business={businessId}
                          autoSelect={false}
                          hasLabel
                        />
                      </div>
                    }
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
                    <div className="col-xs-12">
                      {type !== 'image' &&
                        <Field
                          component={FormControlSelect}
                          options={generateOptionsLabel(actionTypes)}
                          id="callToAction" name="callToAction"
                          label="Call to action" hasLabel
                        />
                      }
                      {type === 'image' &&
                        <Field
                          component={FormControlSelect}
                          options={generateOptionsLabel(filter(actionTypes, action => action !== 'LIKE_PAGE'))}
                          id="callToAction" name="callToAction"
                          label="Call to action" hasLabel
                        />
                      }
                    </div>
                    <div className="col-xs-12">
                      <div className="form-group">
                        <label htmlFor="message" className="control-label">
                          Text
                        </label>
                        <p>{inventory.text.text}</p>
                      </div>
                    </div>
                    <div className="col-xs-12">
                      <Field
                        type="text" component={FormControlSelect}
                        id="headline" name="headline"
                        options={headlineOptions}
                        label="Headline" hasLabel
                      />
                    </div>
                    {isDescAvail &&
                      <div className="col-xs-12">
                        <Field
                          type="text" component={FormControlSelect}
                          id="description" name="description"
                          options={descriptionOptions}
                          label="Newsfeed Description" hasLabel
                        />
                      </div>
                    }
                    {isDescAvail &&
                      <div className="col-xs-12">
                        <Field
                          type="text" component={FormControl}
                          id="websiteUrl" name="websiteUrl"
                          label="Website URL" hasLabel
                        />
                      </div>
                    }
                    {isDescAvail &&
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
                        {this.renderMediaArr(inventory.medias, type)}
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
                        disabled={isLoadingPreview || submitting || isLoadingCreate}
                        type="button"
                        onClick={() => onPreviewAd(this.props)}
                      >
                        {isLoadingPreview ? <i className="fa fa-refresh fa-spin" /> : <i className="fa fa-search" />}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            }
          </div>
        </div>
        <div className="col-md-6">
          <div className="box box-warning">
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
  businessId: PropTypes.string,
  adcampaign: PropTypes.string,
  type: PropTypes.string,
  callToAction: PropTypes.string,
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
  resetCampaign: PropTypes.func.isRequired,
  resetAdAccount: PropTypes.func.isRequired,
};

export default reduxForm({
  validate: (values = {}) => ({
    name: (new Validator(values.name))
      .validateRequired()
      .getMessage(),
    businessId: (new Validator(values.businessId))
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
    mediaArr: (new Validator(values.mediaArr))
      .validateRequired()
      .validateArrayLength(3)
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
})(navConfirm(InventoryAdsCreateForm));
