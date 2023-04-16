import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { fetchData } from '../api/pixabayApi';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';

import css from 'components/App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tags, setTags] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!query) return;
    fetchImages(query, images);
  }, [query, page, images]);

  const fetchImages = (query, page) => {
    const perPage = 12;
    setIsLoading(true);

    fetchData(query, page, perPage)
      .then(({ hits, totalHits }) => {
        const totalPages = Math.ceil(totalHits / perPage);

        const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        });

        setImages(images => [...images, ...data]);
        setTotal(totalHits);

        if (hits.length === 0) {
          return toast.error('Sorry, no images found. Please, try again!');
        }

        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }

        if (page === totalPages) {
          toast.info("You've reached the end of search results.");
        }
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  };

  const handleSearch = newQuery => {
    if (newQuery === query) return;
    setImages([]);
    setQuery(newQuery);
    setPage(1);
    setError(null);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoading(true);
  };

  const toggleModal = newLargeImageURL => {
    setShowModal(prevShowModal => !prevShowModal);
    setLargeImageURL(newLargeImageURL);
  };

  const loadImages = images.length > 0;
  const isLastPage = images.length === total;
  const loadMoreBtn = loadImages && !isLoading && !isLastPage;

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />

      {error && toast.error(error.message)}

      {isLoading && <Loader />}

      {loadImages && <ImageGallery images={images} onClick={toggleModal} />}

      {loadMoreBtn && <Button onClick={onLoadMore}>Load more</Button>}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}

      <ToastContainer theme="colored" position="top-right" autoClose={3000} />
    </div>
  );
};

export { App };
