import {ChangeEvent, FocusEvent, FormEvent, useEffect, useMemo, useState} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import {useRecoilValue} from 'recoil';

import emailjs from 'emailjs-com';
import {motion} from 'motion/react';
import {themeAtom} from 'src/atoms/theme.atom';
import Icon from 'src/components/Icon';
import Select from 'src/components/inputs/Select';
import Loader from 'src/components/loader/loader';
import {useAlert} from 'src/hooks/useAlert';
import Button from '../../components/buttons/Button';
import ContactButton from '../../components/buttons/ContactButton';
import Input from '../../components/inputs/Input';
import Textarea from '../../components/inputs/TextArea';
import {ContactFormType} from '../../types/contactForm.type';
import {Country} from '../../types/country.type';

import checkmark from '../../assets/icons/checkmark.svg';
import link from '../../assets/icons/link.svg';
import mail from '../../assets/icons/mail.svg';
import smartphone from '../../assets/icons/smartphone.svg';

export enum Validity {
  Neutral,
  Valid,
  Invalid,
}

export const colors = {
  [Validity.Neutral]: (opacity: number) => `rgba(0, 153, 255, ${opacity})`,
  [Validity.Valid]: (opacity: number) => `rgba(0, 204, 0, ${opacity})`,
  [Validity.Invalid]: (opacity: number) => `rgba(255, 0, 85, ${opacity})`,
};

const ContactPage = () => {
  const theme = useRecoilValue(themeAtom);
  const {alerts, addAlert} = useAlert();
  const [countries, setCountries] = useState<Country[]>([]);
  const [defaultCountry, setDefaultCountry] = useState<Country>();
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formSent, setFormSent] = useState<boolean>(false);
  const [formData, setFormData] = useState<ContactFormType>({
    name: '',
    email: '',
    phoneNumber: 0 || undefined,
    country: 'Poland',
    message: '',
  });
  const [validity, setValidity] = useState({
    name: Validity.Neutral,
    email: Validity.Neutral,
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          'https://restcountries.com/v3.1/region/europe?fields=name,flag,altSpellings'
        );
        const data = await response.json();
        let updatedCountries = [...data];

        const excludedCountries = [
          'Åland Islands',
          'Jersey',
          'Gibraltar',
          'Guernsey',
          'Svalbard and Jan Mayen',
          'Isle of Man',
          'Vatican City',
        ];

        updatedCountries = updatedCountries.filter(
          (country: any) => !excludedCountries.includes(country.name.common)
        );
        updatedCountries.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));

        const mappedCountries = updatedCountries.map(
          (country: any): Country => ({
            name: country.name.common,
            shortName: country.altSpellings[0],
            flag: country.flag,
          })
        );

        const poland = mappedCountries.find((country) => country.name === 'Poland');
        setDefaultCountry(poland);

        setCountries(mappedCountries);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const formReady = useMemo(() => {
    return Object.values(validity).every((value) => value === Validity.Valid);
  }, [validity]);

  const handleDataChange = (e: ChangeEvent<any>): void => {
    const {name, value} = e.target;

    if (formSent) setFormSent(false);

    handleFieldValidation(name, value);
    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  const handleFieldValidation = (fieldName: string, value: string) => {
    switch (fieldName) {
      case 'name':
        if (!value || value.length < 3 || value.length > 20)
          setValidity((prev) => ({...prev, name: Validity.Invalid}));
        else setValidity((prev) => ({...prev, name: Validity.Valid}));

        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value || !emailRegex.test(value)) {
          setValidity((prev) => ({...prev, email: Validity.Invalid}));
        } else setValidity((prev) => ({...prev, email: Validity.Valid}));

        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!captcha) return addAlert('Complete captcha first', 'warning');
    if (formSent) return addAlert('Form already sent', 'warning');

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
      setFormSent(true);
      addAlert('Form sent successfully', 'success');
    }
  };

  const handleInputWarning = (e: FocusEvent): void => {
    const inputName = e.target.getAttribute('name');

    if (inputName === 'name' && validity.name !== 1)
      addAlert('Name must be between 3 and 20 characters', 'warning');
    if (inputName === 'email' && validity.email !== 1)
      addAlert('Please enter a valid email address', 'warning');
  };

  return (
    <>
      {loading && <Loader />}

      {!loading && (
        <div className='w-full h-full flex flex-col justify-center items-center pt-20 md:flex-row md:justify-evenly md:items-center md:p-0 md:pt-32'>
          <div className='flex flex-col items-start px-5 space-y-8 md:w-1/2'>
            <div className='w-full text-6xl md:text-7xl'>have a question?</div>
            <div className='text-xl text-start'>
              You can call me on my mobile, send me mail or message me on LinkedIn. I also created
              this form.
            </div>
            <div className='text-xl text-start'>
              After filling and sending, I'll receive your contact info. If the form is sent
              successfully, you'll get a confirmation on the email below.
            </div>

            <div className='mx-auto w-full flex flex-col items-center space-y-2 md:flex-col md:items-start sm:flex-row'>
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

          <div className='w-full px-5 py-10 md:w-1/3'>
            <form
              // noValidate={formReady}

              // method='post'
              className='w-full flex flex-col justify-center items-center gap-y-3 text-lg'
            >
              <Input
                type='text'
                name='name'
                maxLength={20}
                placeholder='name*'
                validate={validity.name}
                value={formData.name}
                onBlur={handleInputWarning}
                onChange={handleDataChange}
              />
              <Input
                type='email'
                name='email'
                maxLength={32}
                placeholder='email*'
                validate={validity.email}
                value={formData.email}
                onBlur={handleInputWarning}
                onChange={handleDataChange}
              />
              <Input
                type='tel'
                name='phoneNumber'
                maxLength={12}
                placeholder='phone number'
                value={formData.phoneNumber}
                onChange={handleDataChange}
              />
              <Select
                keyName='country'
                items={countries}
                defaultValue={
                  <>
                    <div>{defaultCountry?.flag}</div>
                    <div>{defaultCountry?.name}</div>
                  </>
                }
                renderSelected={(selected: Country) => (
                  <>
                    <div>{selected.flag}</div>
                    <div>{selected.name}</div>
                  </>
                )}
                renderItem={(item: Country) => (
                  <div className={`w-full flex justify-center items-center space-x-3`}>
                    <div>{item.flag}</div>
                    <div>{item.name}</div>
                  </div>
                )}
                onSelect={handleDataChange}
              />
              <Textarea
                name='message'
                placeholder='message'
                maxLength={120}
                value={formData.message}
                onChange={handleDataChange}
              />
              <div className='w-full flex justify-center'>
                <div className='w-full text-sm text-end md:text-lg'>*required</div>
              </div>

              <motion.div
                initial='initial'
                animate='animate'
                exit='exit'
                whileHover='hover'
                variants={captchaVariants}
              >
                <ReCAPTCHA
                  theme={theme}
                  sitekey='6LecdIAqAAAAAIwZ_dg3DQ5nGnPwx3xyN3YwgmnD'
                  onChange={(value) => setCaptcha(value)}
                />
              </motion.div>

              <Button
                type='submit'
                disabled={!formReady}
                className='border-foreground px-4 py-2 font-semibold rounded-xl border-2 disabled:text-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed'
                onClick={handleSubmit}
              >
                {!formReady ? 'Fill Form' : formSent ? <Icon src={checkmark} /> : 'Send'}
              </Button>
            </form>
          </div>

          {/* render alerts */}
          {alerts}
        </div>
      )}
    </>
  );
};

export default ContactPage;

const captchaVariants = {
  initial: {
    opacity: 0,
    y: 0,
    scale: 0.8,
    transition: {duration: 0.3, ease: 'easeInOut'},
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {duration: 0.3, ease: 'easeOut'},
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 0,
    transition: {duration: 0.2, ease: 'easeIn'},
  },
  hover: {
    scale: 1.1,
    transition: {duration: 0.1},
  },
};
