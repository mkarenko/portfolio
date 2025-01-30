import {FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router';

const NotFoundPage: FC = () => {
  const [countdown, setCountdown] = useState<number>(5);

  const router = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown === 0) return router('/home');

      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    return () => clearTimeout(timer); // eslint-disable-next-line
  }, [countdown, setCountdown]);

  return <div className='pt-20 flex justify-center text-2xl text-red-300'>404 Not Found</div>;
};

export default NotFoundPage;
