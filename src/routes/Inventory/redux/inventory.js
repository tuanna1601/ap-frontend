import HTTP from '@/helpers/http';
import * as _ from 'lodash';

/*
 * Action types
 */
const UPDATE_LOADING_LIST = 'INVENTORY_UPDATE_LOADING_LIST';
const UPDATE_LOADING_CREATE = 'INVENTORY_UPDATE_LOADING_CREATE';
const UPDATE_LOADING_UPDATE = 'INVENTORY_UPDATE_LOADING_UPDATE';
const RELOAD_LIST = 'INVENTORY_RELOAD_LIST';
const LOAD = 'INVENTORY_LOAD';
const LOAD_LATEST_ACCEPTED = 'INVENTORY_LOAD_LATEST_ACCEPTED';
const LOAD_CRITERIA = 'INVENTORY_LOAD_CRITERIA';
const SET_CURRENT_PAGE = 'INVENTORY_SET_CURRENT_PAGE';
const RESET_CURRENT_PAGE = 'INVENTORY_RESET_CURRENT_PAGE';
const SET_FILTER_QUERY = 'INVENTORY_SET_FILTER_QUERY';
const CREATE = 'INVENTORY_CREATE';
const CREATE_SUCCESS = 'INVENTORY_CREATE_SUCCESS';
const CREATE_FAIL = 'INVENTORY_CREATE_FAIL';
const EDIT = 'INVENTORY_EDIT';
const EDIT_SUCCESS = 'INVENTORY_EDIT_SUCCESS';
const EDIT_FAIL = 'INVENTORY_EDIT_FAIL';
const SET_ADS_PREVIEW = 'INVENTORY_SET_ADS_PREVIEW';
const RESET_ADS_PREVIEW = 'INVENTORY_RESET_ADS_PREVIEW';
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

export function afterEditInventory(data) {
  return {
    type: EDIT_SUCCESS,
    payload: {
      data,
    },
  };
}

export function reloadList(inventories, count = 0) {
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

export function loadLatestAcceptedInventory(inventory) {
  return {
    type: LOAD_LATEST_ACCEPTED,
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

export function getLatestReview(inventory) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingList(true));
    const url = `${__CONFIG__.API.SERVER_URL}/reviews/inventory/${inventory.id}`;
    HTTP.get(auth, url, dispatch).then(data => {
      const tmp = Object.assign({}, inventory, {
        latestReview: data
      });
      dispatch(loadInventory(tmp));
    }).then(() => {
      dispatch(onUpdateLoadingList(false));
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
      dispatch(loadInventory(data));
      dispatch(getLatestReview(data));
    }).then(() => {
      dispatch(onUpdateLoadingList(false));
    });
  };
}

export function getLatestAcceptedInventory(inventoryId, callback) {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (!auth) {
      return;
    }

    dispatch(onUpdateLoadingList(true));
    const url = `${__CONFIG__.API.SERVER_URL}/inventories/${inventoryId}/latest-accepted`;
    HTTP.get(auth, url, dispatch).then(data => {
      if (callback) {
        callback(data);
      }
      dispatch(loadLatestAcceptedInventory(data));
    }).then(() => {
      dispatch(onUpdateLoadingList(false));
    });
  };
}

export function createInventory(formValues) {
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
  const url = '/inventories';
  return {
    type: CREATE,
    payload: {
      request: {
        url,
        method: 'POST',
        data: formData,
      },
    },
  };
}

export function updateInventory(formValues) {
  const formData = new FormData();
  let formattedData = _.pick(formValues, ['text', 'headlines', 'medias',
    'descriptions']);
  if (formattedData.medias) {
    formattedData.medias = _.map(formattedData.medias, media => {
      if (media.type === 'video') {
        return {
          path: media.path,
          _id: media._id
        };
      }
      return media;
    });
  }
  if (formValues.newMedias) {
    const images = [];
    const videos = [];
    const thumbnails = [];
    _.each(formValues.newMedias, (media) => {
      if (media.type === 'image') {
        images.push(media);
      } else {
        videos.push(media);
        thumbnails.push({
          value: media.thumbnail
        });
      }
    });
    formattedData = {
      ...formattedData,
      images: images.length ? images : undefined,
      videos: videos.length ? videos : undefined,
      thumbnails: thumbnails.length ? thumbnails : undefined
    };
  }
  _.each(formattedData, (formValue, key) => {
    if (key !== 'images' && key !== 'videos' && key !== 'thumbnails') {
      if (key === 'text') {
        const formattedValue = _.cloneDeep(formValue);
        if (formattedValue.reviews) {
          delete formattedValue.reviews;
        }
        if (formattedValue.oldReviews) {
          delete formattedValue.oldReviews;
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
  const url = `/inventories/${formValues.id}`;
  return {
    type: EDIT,
    payload: {
      request: {
        url,
        method: 'PUT',
        data: formData,
      },
    },
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
                  targetValue: value.text || value.path,
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

export function assignInventory(values) {
  const formattedValues = _.pick(values, ['inventory']);

  formattedValues.steps = _.map(values.steps, step => ({
    _id: step._id,
    reviewer: step.reviewer ? step.reviewer.id : undefined,
  }));
  const url = `${__CONFIG__.API.SERVER_URL}/inventories/assign/reviewer`;
  return {
    type: EDIT,
    payload: {
      request: {
        url,
        method: 'POST',
        data: formattedValues,
      },
    },
  };
}

// export function assignInventory(values, callback) {
//   return (dispatch, getState) => {
//     const auth = getState().auth;
//     if (!auth) {
//       return;
//     }

//     dispatch(onUpdateLoadingUpdate(true));

//     const formattedValues = _.pick(values, ['inventory']);

//     formattedValues.steps = _.map(values.steps, step => ({
//       _id: step._id,
//       reviewer: step.reviewer ? step.reviewer.id : undefined,
//     }));

//     const url = `${__CONFIG__.API.SERVER_URL}/inventories/assign/reviewer`;
//     HTTP.post(formattedValues, auth, url, dispatch, (data) => {
//       if (callback) {
//         callback(data);
//       }
//       dispatch(afterEditInventory(data));
//     }).then(() => {
//       dispatch(onUpdateLoadingUpdate(false));
//     });
//   };
// }

export function goToPage(page, isOrdinator, isReviewer) {
  return (dispatch) => {
    dispatch(setCurrentPage(page));
    if (isOrdinator) {
      dispatch(listOrdinatorInventories());
    } else if (isReviewer) {
      dispatch(listReviewerInventories());
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

    formattedValues.message = values.inventoryObj.text.text;

    if (values.mediaArr && values.mediaArr.length) {
      const medias = values.inventoryObj.medias;
      formattedValues.media = _.chain(medias)
        .filter((media) => values.mediaArr.indexOf(media._id) !== -1)
        .map(media => media.path)
        .value();
    } else if (values.media) {
      const media = _.find(values.inventoryObj.medias, (md) => md._id === values.media);
      formattedValues.media = media.path;
      if (values.type === 'video') {
        formattedValues.thumbnail = media.thumbnail;
      }
    }

    formattedValues = _.pick(formattedValues,
      ['businessId', 'name', 'inventory', 'adaccount', 'adset', 'message',
        'headline', 'description', 'type', 'media', 'thumbnail',
        'callToAction', 'websiteUrl', 'page', 'displayLink']);

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

export function resetFacebookAdsPreview() {
  return {
    type: RESET_ADS_PREVIEW
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
    formattedValues.message = values.inventoryObj.text.text;

    if (values.mediaArr && values.mediaArr.length) {
      const medias = values.inventoryObj.medias;
      formattedValues.media = _.chain(medias)
        .find((media) => values.mediaArr.indexOf(media._id) !== -1)
        .map(media => media.path)
        .value();
    } else if (values.media) {
      const media = _.find(values.inventoryObj.medias, (md) => md._id === values.media);
      formattedValues.media = media.path;
      if (values.type === 'video') {
        formattedValues.thumbnail = media.thumbnail;
      }
    }

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
      return {
        ...state,
        inventories,
        pagination: {
          ...state.pagination,
          count: action.count,
        },
      };
    }
    case CREATE:
      return {
        ...state,
        isLoadingCreate: true,
      };
    case LOAD: {
      const inventory = action.inventory;

      if (inventory) {
        if (inventory.latestReview) {
          const groupReviews = _.groupBy(inventory.latestReview.comments, 'target');
          if (groupReviews.text) {
            inventory.text.oldReviews = groupReviews.text;
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
        return {
          ...state,
          inventories: {
            ...state.inventories,
            [inventory.id]: inventory
          }
        };
      }
      return state;
    }
    case CREATE_SUCCESS: {
      const inventory = action.payload;

      if (inventory) {
        if (inventory.latestReview) {
          const groupReviews = _.groupBy(inventory.latestReview.comments, 'target');
          if (groupReviews.text) {
            inventory.text.oldReviews = groupReviews.text;
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
        return {
          ...state,
          inventories: {
            ...state.inventories,
            [inventory.id]: inventory
          },
          isLoadingCreate: false,
        };
      }
      return {
        ...state,
        isLoadingCreate: false,
      };
    }
    case CREATE_FAIL:
      return {
        ...state,
        isLoadingCreate: false,
      };
    case LOAD_LATEST_ACCEPTED: {
      const inventory = action.inventory;
      return {
        ...state,
        inventories: {
          ...state.inventories,
          [inventory.id]: inventory
        }
      };
    }
    case EDIT: {
      return {
        ...state,
        isLoadingUpdate: true,
      };
    }
    case EDIT_SUCCESS: {
      const inventory = action.payload ? action.payload : undefined;
      // break if not in current view
      if (!inventory || !state.inventories[inventory.id]) {
        return {
          ...state,
          isLoadingUpdate: false,
        };
      }
      const inventories = {
        ...state.inventories,
        [inventory.id]: {
          ...inventory,
          isHighlighted: true,
        },
      };
      return {
        ...state,
        inventories,
        isLoadingUpdate: false,
      };
    }
    case EDIT_FAIL: {
      return {
        ...state,
        isLoadingUpdate: false,
      };
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
    case RESET_ADS_PREVIEW: {
      return {
        ...state,
        adsPreview: '<span></span>'
      };
    }
    default:
      return state;
  }
}
