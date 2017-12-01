import * as React from 'react';
import * as R from 'ramda';

interface IResultsProps {
  displayResults: Array<{ url: string }>
}

export default class Results extends React.Component<IResultsProps, {}> {
  render() {
    const urls: string[] = R.pluck('url',
      this.props.displayResults);
    const displayUrls = urls.map(url => (
      <img key={url} src={url} />
    ));
    return (
      <div>
        {displayUrls}
      </div>
    )
  }
}
