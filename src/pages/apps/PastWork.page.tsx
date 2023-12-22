import {FC, useEffect, useState} from 'react';
import {Applictaion} from '../../types/application.type';

const PastWorkPage: FC = () => {
  const [apps, setApps] = useState<Applictaion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = () => {};

    fetchData();
  }, []);

  return <div className='w-screen h-screen'></div>;
};

export default PastWorkPage;
