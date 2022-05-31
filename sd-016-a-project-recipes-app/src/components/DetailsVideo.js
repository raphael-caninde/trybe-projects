import React from 'react';
import PropTypes from 'prop-types';

export default function DetailsVideo(props) {
  const { title, url } = props;
  return (
    <div
      data-testid="video"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={ {
        __html: `
          <iframe
          width="320"
          height="180"
          title="${title}"
          src="${url.replace(/watch\?v=/gi, 'embed/')}"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
            picture-in-picture"
          allowFullScreen
        ></iframe>` } }
    />
  );
}

DetailsVideo.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
