import {useState} from 'react';

const useModal = () => {
  const [show, setShow] = useState<boolean>(false);

  const open = () => setShow(true);
  const close = () => setShow(false);

  return {show, open, close};
};

export default useModal;
