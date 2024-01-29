import {FC, useEffect, useState} from 'react';
import {Project} from '../../types/project.type';

const PastWorkPage: FC = () => {
  const [apps, setApps] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = () => {};

    fetchData();
  }, []);

  return (
    <div className='w-full h-full flex justify-center'>
      <div className='w-2/3 mt-20 grid grid-cols-2 xs:grid-cols-1 items-start gap-5'>
        <div className='flex-col space-y-2'>
          <div className='flex space-x-5'>
            <img alt='react_logo' className='w-14 h-14' />
            <div className='flex-col items-center text-4xl'>
              <div>React JS/TS</div>
              <div className='flex'>
                <div className='text-sm'>(written with&nbsp;</div>
                <div className='text-sm'>javascript/typescript)</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col text-lg'>
            <div>1. WUB</div>
            <div>2. Hear Me</div>
            <div>3. More Moda</div>
            <div>4. Persoklick</div>
            <div>5. Wake 'N Play</div>
          </div>
        </div>
        <div className='flex-col space-y-2'>
          <div className='flex space-x-5'>
            <img alt='flutter_logo' className='h-14' />
            <div className='flex-col items-center text-4xl'>
              <div>Flutter</div>
              <div className='flex'>
                <div className='text-sm'>(written with&nbsp;</div>
                <div className='text-sm'>dart)</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col text-lg'>
            <div className='flex'>
              <div>1. Celsion&nbsp;</div>
              <div className='mt-1 text-sm'>(to be released)</div>
            </div>
            <div>2. 100 questions to get to know yourself&nbsp;</div>
            <div>3. Flutter Painter Fork</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastWorkPage;
