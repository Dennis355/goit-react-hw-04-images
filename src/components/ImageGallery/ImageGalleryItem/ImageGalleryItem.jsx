import PropTypes from 'prop-types';

import css from 'components/ImageGallery/ImageGalleryItem/ImageGalleryItem.module.css';
export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  tags,
  onClick,
}) => (
  <li
    className={css.gallery_item}
    id={id}
    onClick={() => {
      onClick(largeImageURL);
    }}
  >
    <img src={webformatURL} alt={tags} className={css.imageGalleryItem_image} />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
