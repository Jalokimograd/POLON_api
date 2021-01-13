import { FormGroup, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export const FromToValidator: ValidatorFn = (fg: FormGroup) => {
  const start = fg.get('from').value as moment.Moment;
  const end = fg.get('to').value as moment.Moment;
  if (!start || !end) {
    return null;
  }
  return start.isBefore(end)
    ? null
    : {range: true};
};
