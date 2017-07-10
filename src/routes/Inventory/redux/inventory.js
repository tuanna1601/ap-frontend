import HTTP from '@/helpers/http';
import * as _ from 'lodash';

/*
 * Action types
 */
const UPDATE_LOADING_LIST = 'INVENTORY_UPDATE_LOADING_LIST';
const UPDATE_LOADING_CREATE = 'INVENTORY_UPDATE_LOADING_CREATE';
const UPDATE_LOADING_UPDATE = 'INVENTORY_UPDATE_LOADING_UPDATE';
const EDIT = 'INVENTORY_EDIT';
const RELOAD_LIST = 'INVENTORY_RELOAD_LIST';
const LOAD = 'INVENTORY_LOAD';
const LOAD_CRITERIA = 'INVENTORY_LOAD_CRITERIA';
const SET_CURRENT_PAGE = 'INVENTORY_SET_CURRENT_PAGE';
const RESET_CURRENT_PAGE = 'INVENTORY_RESET_CURRENT_PAGE';
const SET_FILTER_QUERY = 'INVENTORY_SET_FILTER_QUERY';
const AFTER_CREATE = 'INVENTORY_AFTER_CREATE';
const AFTER_EDIT = 'INVENTORY_AFTER_EDIT';
const SET_ADS_PREVIEW = 'INVENTORY_SET_ADS_PREVIEW';
/*
 * Actions
 */

export function setFilterQuery(filterQuery) {
  return {
    type: SET_FILTER_QUERY,
    filterQuery
  };
}

export function setCurrentPage(page) {
  return {
    type: SET_CURRENT_PAGE,
    page,
  };
}

export function resetCurrentPage() {
  return {
    type: RESET_CURRENT_PAGE,
  };
}

export function onUpdateLoadingList(isLoading) {
  return {
    type: UPDATE_LOADING_LIST,
    isLoading
  };
}

export function onUpdateLoadingCreate(isLoading) {
  return {
    type: UPDATE_LOADING_CREATE,
    isLoading,
  };
}

export function onUpdateLoadingUpdate(isLoading) {
  return {
    type: UPDATE_LOADING_UPDATE,
    isLoading,
  };
}

export function afterCreateInventory(inventory) {
  return {
    type: AFTER_CREATE,
    inventory
  };
}

export function afterEditInventory(inventory) {
  return {
    type: AFTER_EDIT,
    inventory,
  };
}

export function reloadList(inventories, count) {
  return {
    type: RELOAD_LIST,
    inventories,
    count,
  };
}

export function loadInventory(inventory) {
  return {
    type: LOAD,
    inventory
  };
}

export function loadCriteria(criteria) {
  return {
    type: LOAD_CRITERIA,
    criteria
  };
}

export function listInventories() {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingList(true));
    const pagination = getState().inventory.pagination;
    const query = getState().inventory.filterQuery;

    const filterQuery = Object.assign({}, query, {
      limit: pagination.limit,
      page: pagination.page,
    });

    const url = `${__CONFIG__.API.SERVER_URL}/inventories?${HTTP.param(filterQuery)}`;
    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadList(data.rows, data.count));
    }).then(() => {
      dispatch(onUpdateLoadingList(false));
    });
  };
}

export function listOrdinatorInventories() {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingList(true));
    const pagination = getState().inventory.pagination;
    const query = getState().inventory.filterQuery;


    const filterQuery = Object.assign({}, query, {
      limit: pagination.limit,
      page: pagination.page,
    });

    const url = `${__CONFIG__.API.SERVER_URL}/inventories/ordinator?${HTTP.param(filterQuery)}`;
    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadList(data.rows, data.count));
    }).then(() => {
      dispatch(onUpdateLoadingList(false));
    });
  };
}

export function listReviewerInventories() {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingList(true));
    const pagination = getState().inventory.pagination;
    const query = getState().inventory.filterQuery;

    const filterQuery = Object.assign({}, query, {
      limit: pagination.limit,
      page: pagination.page,
    });

    const url = `${__CONFIG__.API.SERVER_URL}/inventories/reviewer?${HTTP.param(filterQuery)}`;
    HTTP.get(auth, url, dispatch, (data) => {
      dispatch(reloadList(data.rows, data.count));
    }).then(() => {
      dispatch(onUpdateLoadingList(false));
    });
  };
}

export function getCriteria(inventory) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }
    const { department } = inventory;


    const query = {
      department: department.id
    };

    const url = `${__CONFIG__.API.SERVER_URL}/criteria?${HTTP.param(query)}`;
    HTTP.get(auth, url, dispatch).then(data => {
      dispatch(loadInventory(inventory));
      dispatch(loadCriteria(data.rows));
      dispatch(onUpdateLoadingList(false));
    });
  };
}

export function getLatestReview(inventory) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    const url = `${__CONFIG__.API.SERVER_URL}/reviews/inventory/${inventory.id}`;
    HTTP.get(auth, url, dispatch).then(data => {
      const tmp = Object.assign({}, inventory, {
        latestReview: data
      });
      dispatch(getCriteria(tmp));
    });
  };
}

export function getInventory(inventoryId) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingList(true));
    const url = `${__CONFIG__.API.SERVER_URL}/inventories/${inventoryId}`;
    HTTP.get(auth, url, dispatch).then(data => {
      dispatch(getLatestReview(data));
    });
  };
}

export function createInventory(formValues, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingCreate(true));
    const formData = new FormData();
    _.each(formValues, (formValue, key) => {
      if (formValue instanceof Array) {
        if (key !== 'medias') {
          _.each(formValue, (val) => {
            formData.append(key, val.value);
          });
        } else {
          _.each(formValue, (val) => {
            if (val.thumbnail) {
              formData.append('videos', val.value);
              formData.append('thumbnails', val.thumbnail);
            } else {
              formData.append('images', val.value);
            }
          });
        }
      } else {
        formData.append(key, formValue);
      }
    });

    HTTP.postForm(formData, auth, `${__CONFIG__.API.SERVER_URL}/inventories`, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
      dispatch(afterCreateInventory(data));
    }).then(() => dispatch(onUpdateLoadingCreate(false)));
  };
}

export function editInventory(id) {
  return {
    type: EDIT,
    id,
  };
}

export function updateInventory(formValues, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingUpdate(true));

    const formData = new FormData();
    const formattedData = _.pick(formValues, ['text', 'headlines', 'medias',
      'newMedias', 'descriptions']);
    _.each(formattedData, (formValue, key) => {
      if (key !== 'newMedias') {
        if (key === 'text') {
          const formattedValue = _.cloneDeep(formValue);
          if (formattedValue.reviews) {
            delete formattedValue.reviews;
          }
          formData.append(key, JSON.stringify(formattedValue));
        } else {
          const formattedValue = _.map(formValue, value =>
            Object.assign({}, value, {
              reviews: undefined,
              type: undefined
            }));
          formData.append(key, JSON.stringify(formattedValue));
        }
      } else {
        _.each(formValue, (file) => {
          formData.append(key, file.value);
        });
      }
    });
    const url = `${__CONFIG__.API.SERVER_URL}/inventories/${formValues.id}`;
    HTTP.putForm(formData, auth, url, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
      dispatch(afterEditInventory(data));
    }).then(() => {
      dispatch(onUpdateLoadingUpdate(false));
    });
  };
}

export function reviewInventory(formValues, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingUpdate(true));

    const comments = [];
    _.each(formValues, (data, key) => {
      if (key === 'text') {
        if (data.reviews && data.reviews.length) {
          _.each(data.reviews, (review) => {
            comments.push({
              criteria: review.criteria,
              target: key,
              targetId: data._id,
              targetValue: data.text,
              comment: review.comment
            });
          });
        }
      } else {
        let singularKey;
        switch (key) {
          case 'headlines':
            singularKey = 'headline';
            break;
          case 'medias':
            singularKey = 'media';
            break;
          case 'descriptions':
            singularKey = 'description';
            break;
          default:
            break;
        }

        if (singularKey) {
          _.each(data, (value) => {
            if (value.reviews && value.reviews.length) {
              _.each(value.reviews, (review) => {
                comments.push({
                  criteria: review.criteria,
                  target: singularKey,
                  targetId: value._id,
                  targetValue: value.text,
                  comment: review.comment
                });
              });
            }
          });
        }
      }
    });

    const formattedValues = {
      comments
    };

    const url = `${__CONFIG__.API.SERVER_URL}/reviews/inventory/${formValues.id}`;
    HTTP.post(formattedValues, auth, url, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
    }).then(() => {
      dispatch(onUpdateLoadingUpdate(false));
    });
  };
}

export function assignInventory(values, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingUpdate(true));

    const formattedValues = _.pick(values, ['userId', 'inventory']);

    const url = `${__CONFIG__.API.SERVER_URL}/inventories/assign/reviewer`;
    HTTP.post(formattedValues, auth, url, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
      dispatch(afterEditInventory(data));
    }).then(() => {
      dispatch(onUpdateLoadingUpdate(false));
    });
  };
}

export function goToPage(page, isOrdinator) {
  return (dispatch) => {
    dispatch(setCurrentPage(page));
    if (isOrdinator) {
      dispatch(listOrdinatorInventories());
    } else {
      dispatch(listInventories());
    }
  };
}

export function setAdsPreview(adsPreview) {
  return {
    type: SET_ADS_PREVIEW,
    adsPreview
  };
}

export function createFacebookAds(values, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    let formattedValues = _.cloneDeep(values);

    if (values.selectedMedia && values.selectedMedia.length) {
      const medias = _.filter(values.inventoryObj.medias, (media) => media.type !== 'video');
      formattedValues.media = _.chain(medias)
        .filter((media, index) => values.selectedMedia[index])
        .map(media => media.path)
        .value();
    }

    if (values.media) {
      const media = _.find(values.inventoryObj.medias, (md) => md._id === values.media);
      formattedValues.media = media.path;
      if (values.type === 'video') {
        formattedValues.thumbnail = media.thumbnail;
      }
    }

    formattedValues = _.pick(formattedValues,
      ['name', 'inventory', 'adaccount', 'adset', 'message',
        'headline', 'description', 'type', 'media', 'thumbnail',
        'callToAction', 'websiteUrl', 'page']);

    dispatch(onUpdateLoadingCreate(true));
    const url = `${__CONFIG__.API.SERVER_URL}/ads`;
    HTTP.post(formattedValues, auth, url, dispatch, (data) => {
      if (callback) {
        callback(data);
      }
      // dispatch(setAdsPreview(data.data[0].body));
    }).then(() => {
      dispatch(onUpdateLoadingCreate(false));
    });
  };
}

export function loadFacebookAdsPreview(values, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    const formattedValues = _.omit(values, ['inventoryObj', 'inventory', 'type',
      'adcampaign', 'adset', 'name']);
    dispatch(onUpdateLoadingUpdate(true));
    const url = `${__CONFIG__.API.SERVER_URL}/ads/preview`;
    HTTP.post(formattedValues, auth, url, dispatch, (data) => {
      if (callback) {
        callback(data.data[0].body);
      }
      dispatch(setAdsPreview(data.data[0].body));
    }).then(() => {
      dispatch(onUpdateLoadingUpdate(false));
    });
  };
}

/*
 * Initial state
 */
const initialState = {
  inventories: {},
  isLoadingList: false,
  isLoadingCreate: false,
  isLoadingUpdate: false,
  criteria: {},
  pagination: {
    count: 0,
    page: 1,
    limit: 20,
  },
  filterQuery: {},
  adsPreview: '<span></span>'
};

/*
 * Reducer
 */
export function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER_QUERY: {
      return Object.assign({}, state, {
        filterQuery: action.filterQuery,
      });
    }
    case SET_CURRENT_PAGE:
      return Object.assign({}, state, {
        pagination: Object.assign({}, state.pagination, {
          page: action.page,
        }),
      });
    case RESET_CURRENT_PAGE:
      return Object.assign({}, state, {
        pagination: Object.assign({}, state.pagination, {
          page: 1,
        }),
      });
    case UPDATE_LOADING_LIST:
      return Object.assign({}, state, {
        isLoadingList: action.isLoading,
      });
    case UPDATE_LOADING_CREATE:
      return Object.assign({}, state, {
        isLoadingCreate: action.isLoading,
      });
    case UPDATE_LOADING_UPDATE:
      return Object.assign({}, state, {
        isLoadingUpdate: action.isLoading,
      });
    case RELOAD_LIST: {
      const inventories = _.reduce(action.inventories, (hashInventories, inventory) =>
        Object.assign({}, hashInventories, {
          [inventory.id]: inventory,
        }), {});
      return Object.assign({}, state, {
        inventories,
      });
    }
    case LOAD:
    case AFTER_CREATE: {
      const inventory = action.inventory;
      if (inventory.latestReview) {
        const groupReviews = _.groupBy(inventory.latestReview.comments, 'target');
        if (groupReviews.text) {
          inventory.text.reviews = groupReviews.text;
        }
        if (groupReviews.media) {
          _.each(inventory.medias, (media, index) => {
            inventory.medias[index].reviews = [];
            _.each(groupReviews.media, review => {
              if (media._id === review.targetId) {
                inventory.medias[index].reviews.push(review);
              }
            });
          });
        }
        if (groupReviews.headline) {
          _.each(inventory.headlines, (headline, index) => {
            inventory.headlines[index].reviews = [];
            _.each(groupReviews.headline, review => {
              if (headline._id === review.targetId) {
                inventory.headlines[index].reviews.push(review);
              }
            });
          });
        }
        if (groupReviews.description) {
          _.each(inventory.descriptions, (description, index) => {
            inventory.descriptions[index].reviews = [];
            _.each(groupReviews.description, review => {
              if (description._id === review.targetId) {
                inventory.descriptions[index].reviews.push(review);
              }
            });
          });
        }
      }

      return Object.assign({}, state, {
        inventories: Object.assign({}, state.inventories, {
          [inventory.id]: inventory
        })
      });
    }
    case EDIT: {
      const editedInventory = Object.assign({}, state.inventories[action.id], {
        permissions: state.inventories[action.id].permissions ? state.inventories[action.id].permissions : [],
      });
      const inventories = Object.assign({}, state.inventories, {
        [action.id]: editedInventory,
      });
      return Object.assign({}, state, {
        inventories,
      });
    }
    case AFTER_EDIT: {
      // break if not in current view
      if (!state.inventories[action.inventory.id]) {
        return state;
      }
      const inventories = Object.assign({}, state.inventories, {
        [action.inventory.id]: Object.assign({}, action.inventory, {
          isHighlighted: true,
        }),
      });
      return Object.assign({}, state, {
        inventories,
      });
    }
    case LOAD_CRITERIA:
      return Object.assign({}, state, {
        criteria: _.reduce(action.criteria, (hashCriteria, criterion) =>
          Object.assign({}, hashCriteria, {
            [criterion.id]: criterion
          }), {})
      });
    case SET_ADS_PREVIEW: {
      return Object.assign({}, state, {
        adsPreview: action.adsPreview
      });
    }
    default:
      return state;
  }
}
