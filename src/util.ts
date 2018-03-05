import * as R from 'ramda';
import * as moment from 'moment';

type Maybe<T> = T | void;

const dateFormat = 'YYYY-MM-DDTHH-mm-ss';

// example format: 2017-01-01T08:04:38
export const formatDate = (date: string): Maybe<string> => {
  const m = moment(date, dateFormat);
  if (m.isValid() !== true) {
    return null;
  }
  return m.format("ddd, MMM Do, H:mma, YYYY")
}

export const sortByDateAsc = (field: string, arr: Array<{}>) =>
  R.sort((a: any, b: any) => {
    const dateA = moment(a[field], dateFormat);
    const dateB = moment(b[field], dateFormat);
    return dateA.isAfter(dateB)
      ? -1
      : 1
  })(arr)
