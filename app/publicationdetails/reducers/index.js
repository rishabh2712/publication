import { combineReducers } from 'redux';
import {publicationDetails} from './publication_details';
import {updatepublicationDetails} from './updatePublication';
import {updatecontributorsDetails} from './updateContributors';

export const publication_details_update = combineReducers({
  publicationDetails,
  updatepublicationDetails,
  updatecontributorsDetails
});
