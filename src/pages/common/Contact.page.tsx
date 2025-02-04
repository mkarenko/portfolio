import {ChangeEvent, FormEvent, useEffect, useState} from 'react';

import emailjs from 'emailjs-com';
import Button from '../../components/buttons/Button';
import ContactButton from '../../components/buttons/ContactButton';
import CaptchaModal from '../../components/CaptchaModal';
import Input from '../../components/inputs/Input';
import Textarea from '../../components/inputs/TextArea';
import {ContactFormType} from '../../types/contactForm.type';
import {Country} from '../../types/country.type';

import checkmark from '../../assets/icons/checkmark.svg';
import link from '../../assets/icons/link.svg';
import mail from '../../assets/icons/mail.svg';
import smartphone from '../../assets/icons/smartphone.svg';
import spinner from '../../assets/spinner.svg';

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormType>({
    name: '',
    email: '',
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
      phone: formData.phoneNumber,
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
    <div
      className='w-full h-full pt-20 md:pt-32 flex flex-col justify-center items-center
      md:p-0 md:flex-row md:justify-evenly md:items-center'
    >
      <div className='px-5 space-y-8 md:w-1/3 flex flex-col items-start'>
        <div className='w-full text-6xl md:text-7xl'>have a question?</div>
        <div className='text-xl text-start'>
          You can call me on my mobile, send me mail or message me on LinkedIn. I also created this
          form.
        </div>
        <div className='text-xl text-start'>
          After filling and sending, I'll receive your contact info. If the form is sent
          successfully, you'll get a confirmation on the email below.
        </div>

        <div className='w-full flex flex-col sm:flex-row md:flex-col space-y-2'>
          <ContactButton text='+48 692 566 688' icon={smartphone} href='tel:+48 692 566 688' />
          <ContactButton
            text='m.karenko@outlook.com'
            icon={mail}
            href='mailto:m.karenko@outlook.com'
          />
          <ContactButton
            text='Linkedin'
            icon={link}
            href='https://www.linkedin.com/in/m-karenko/'
          />
        </div>
      </div>

      <div className='px-5 py-3'>
        <form className='w-full p-5 flex flex-col justify-center items-center gap-y-3 text-lg'>
          <Input
            type='text'
            name='name'
            maxLength={20}
            placeholder='name'
            value={formData.name}
            onChange={handleDataChange}
          />
          <Input
            type='text'
            name='email'
            maxLength={32}
            placeholder='example@email.com'
            value={formData.email}
            onChange={handleDataChange}
          />
          <Input
            type='number'
            name='phoneNumber'
            placeholder='678 345 129'
            value={formData.phoneNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 12) handleDataChange(e);
            }}
          />
          {/* TODO change for Select Component */}
          <div className='w-full'>
            <label className='font-semibold'>Country</label>
            <select className='w-full h-8 text-start bg-white px-4 md:h-12 rounded-xl shrink'>
              {countries.map((country) => (
                <option key={country.shortName} value={country.name}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>

          <Textarea
            label='Message'
            name='message'
            placeholder='optional'
            max={120}
            value={formData.message}
            className='px-4 p-2 md:h-32 rounded-xl'
            onChange={handleDataChange}
          />

          <div className='w-full flex justify-center'>
            <div className='w-full text-sm md:text-lg text-end'>*required</div>
          </div>

          {showModal && <CaptchaModal isOpen={showModal} setIsOpen={setShowModal} />}

          <Button
            type='submit'
            disabled={!formReady}
            className='w-full md:w-fit flex justify-center px-4 py-2 font-semibold text-light
            bg-primary rounded-xl disabled:bg-gray-50 disabled:cursor-not-allowed'
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
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
