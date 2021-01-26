import * as moment from 'moment';
import { InstitutionDto } from './institution.dto';

export interface BrowserFilterDTO {
  from: string;
  to: string;
  institutionsId: string[];
  authorNames: string[];
}
