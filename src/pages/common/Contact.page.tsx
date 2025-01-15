import {ChangeEvent, FormEvent, useEffect, useState} from 'react';

import emailjs from 'emailjs-com';
import BaseIcon from '../../components/BaseIcon';
import CaptchaModal from '../../components/CaptchaModal';
import BaseInput from '../../components/inputs/BaseInput';
import BaseSelect from '../../components/inputs/BaseSelect';
import BaseTextarea from '../../components/inputs/BaseTextArea';
import {ContactFormType} from '../../types/contactForm.type';
import {Country} from '../../types/country.type';

import {logoLinkedin, mail, phonePortrait} from 'ionicons/icons';
import checkmark from '../../assets/checkmark.svg';
import spinner from '../../assets/spinner.svg';

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormType>({
    name: '',
    email: '',
    code: '+48',
    phoneNumber: 0 || undefined,
    country: 'Poland',
    message: '',
  });
  const [status, setStatus] = useState<'sending' | 'sent' | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const formReady = formData.name !== '' && formData.email !== '';

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          'https://restcountries.com/v3.1/independent?status=true&fields=name,idd,flag,altSpellings'
        );
        const data = await response.json();
        let updatedCountries = [...data];

        const polandIndex = data.findIndex((country: any) => country.name.common === 'Poland');
        const [foundCountry] = updatedCountries.splice(polandIndex, 1);

        const excludedCountries = ['Vatican City', 'North Korea'];
        updatedCountries = updatedCountries.filter(
          (country: any) => !excludedCountries.includes(country.name.common)
        );

        updatedCountries.unshift(foundCountry);
        updatedCountries.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));

        const sortedCountries = [
          updatedCountries.find((country: any) => country.name.common === 'Poland'),
          ...updatedCountries.filter((country: any) => country.name.common !== 'Poland'),
        ];

        const mappedCountries = sortedCountries.map(
          (country: any): Country => ({
            name: country.name.common,
            shortName: country.altSpellings[0],
            code: `${country.idd.root}${country.idd.suffixes?.[0]}`,
            flag: country.flag,
          })
        );

        setCountries(mappedCountries);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (formReady) setShowModal(true);
  }, [formReady]);

  const handleDataChange = (e: ChangeEvent<any>): void => {
    const {name, value} = e.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatus('sending');

    const templateParams = {
      from_name: formData.name,
      name: formData.name,
      mail: formData.email,
      phone: formData.code + ' ' + formData.phoneNumber,
      country: formData.email,
      message: formData.message,
    };

    try {
      emailjs.send('service_h1w48k6', 'template_7zx81mj', templateParams, 'nFeVTy63w81XQerxI').then(
        (res) => console.log('SUCCESS!', res.status, res.text),
        (error) => console.error('FAILED...', error)
      );
    } catch (error: any) {
      throw error.message;
    } finally {
      setTimeout(() => setStatus('sent'), 2000);
    }
  };

  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-y-10'>
      <div className='h-fit space-y-3 p-3 text-white bg-slate-500 dark:bg-slate-900'>
        <div className='font-semibold text-xl text-center'>
          You can call me on my mobile, send me mail or message me on LinkedIn. I also created this
          form. After filling and sending, I'll receive your contact info. If the form is sent
          successfully, you'll get a confirmation on the email below.
        </div>

        <div className='flex justify-evenly gap-4'>
          <div>
            <a
              href='tel:+48692566688'
              className='flex items-center gap-x-2 text-sm transition-transform duration-300
              hover:scale-110'
            >
              <BaseIcon icon={phonePortrait} classCss='w-6' />
              +48 692 566 688
            </a>
          </div>
          <div>
            <a
              href='mailto:m.karenko@outlook.com'
              className='flex items-center gap-x-2 text-sm transition-transform duration-300
              hover:scale-110'
            >
              <BaseIcon icon={mail} classCss='w-6' />
              m.karenko@outlook.com
            </a>
          </div>
          <div>
            <a
              href='https://www.linkedin.com/in/m-karenko/'
              className='flex items-center gap-x-2 text-sm transition-transform duration-300
              hover:scale-110'
            >
              <BaseIcon icon={logoLinkedin} classCss='w-6' />
              Linkedin
            </a>
          </div>
        </div>
      </div>

      <form className='w-1/3 flex flex-col gap-y-3 py-3 px-5 text-white rounded-xl bg-slate-500 dark:bg-slate-900'>
        <div className='w-full flex justify-center'>
          <BaseInput
            type='text'
            name='name'
            maxLength={20}
            label='Name/Company'
            placeholder='name'
            width='80%'
            value={formData.name}
            onChange={handleDataChange}
          />
        </div>
        <div className='w-full flex justify-center'>
          <BaseInput
            type='text'
            name='email'
            maxLength={32}
            label='Email'
            placeholder='example@email.com'
            width='80%'
            value={formData.email}
            onChange={handleDataChange}
          />
        </div>
        <div className='w-full flex justify-center items-center space-x-3'>
          <BaseSelect
            label='Phone number'
            items={countries}
            name='code'
            renderItem={(item) => (
              <>
                {item.shortName} {item.flag} {item.code}
              </>
            )}
            width='30%'
            onChange={handleDataChange}
          />
          <BaseInput
            label='*' // TODO
            type='number'
            name='phoneNumber'
            placeholder='678 345 129'
            value={formData.phoneNumber}
            width={'calc(50% - 12px)'}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 12) handleDataChange(e);
            }}
          />
        </div>
        <div className='w-full flex justify-center'>
          <BaseSelect
            label='Country *'
            name='country'
            value={formData.country}
            items={countries}
            width='80%'
            renderItem={(item) => (
              <>
                {item.flag} {item.name}
              </>
            )}
            onChange={handleDataChange}
          />
        </div>
        <div className='w-full flex justify-center'>
          <BaseTextarea
            label='Message *'
            name='message'
            placeholder='optional'
            max={120}
            width='80%'
            style={{lineHeight: '32px'}}
            value={formData.message}
            onChange={handleDataChange}
          />
        </div>
        <div className='w-full flex justify-center'>
          <div className='text-xs text-end'>
            Inputs marked with * are optional, and aren't needed to complete form
          </div>
        </div>
        {showModal && <CaptchaModal isOpen={showModal} setIsOpen={setShowModal} />}
        <button
          type='submit'
          disabled={!formReady}
          className='flex w-auto px-5 py-2 mx-auto font-semibold
          text-black bg-blue-200 border rounded-2xl
          disabled:bg-gray-500 disabled:border-0 disabled:text-white disabled:cursor-not-allowed'
          onClick={handleSubmit}
        >
          {!status && 'Send'}
          {status === 'sending' && (
            <div className='flex justify-center items-center space-x-2'>
              <img alt='sending' src={spinner} className='animate-spin w-8' />
              <div>Processing...</div>
            </div>
          )}
          {status === 'sent' && (
            <div className='flex justify-center items-center'>
              <img alt='sent' src={checkmark} className='w-8' />
              <div>Sent</div>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
