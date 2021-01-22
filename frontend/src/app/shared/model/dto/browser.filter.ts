import * as moment from 'moment';

export interface BrowserFilter {
  from: moment.Moment;
  to: moment.Moment;
  institutions: string[];
  authorNames: string[];
}
