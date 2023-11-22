import {useCallback, useState} from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsModalOpen(prevState => !prevState);
  }, []);

  return {
    isModalOpen,
    closeModal,
    openModal,
    toggleModal,
  };
};

export default useModal;
