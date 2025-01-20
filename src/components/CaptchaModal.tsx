import {useEffect, useState} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const CaptchaModal = ({isOpen, setIsOpen}: Props) => {
  const [captcha, setCaptcha] = useState<string | null>(null);

  useEffect(() => {
    if (captcha) {
      setTimeout(() => setIsOpen(false), 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captcha]);

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-popover z-50'>
          <div className='bg-popover p-6 rounded shadow-lg w-96 border border-border'>
            <h2 className='text-xl font-bold mb-4'>Please complete captcha to the send form</h2>
            <ReCAPTCHA
              className='flex justify-center py-3'
              sitekey='6LecdIAqAAAAAIwZ_dg3DQ5nGnPwx3xyN3YwgmnD'
              onChange={(value) => setCaptcha(value)}
            />
            <div className='w-full flex justify-end'>
              <button
                onClick={() => setIsOpen(false)}
                className=' bg-primary text-white px-4 py-2 rounded'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CaptchaModal;
