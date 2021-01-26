import * as moment from 'moment';
import { InstitutionDto } from './institution.dto';

export interface BrowserFilter {
  from: moment.Moment;
  to: moment.Moment;
  institutions: InstitutionDto[];
  authorNames: string[];
}
