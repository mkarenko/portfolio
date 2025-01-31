import Icon from '../Icon';

type Props = {
  href: string;
  text: string;
  icon: any;
};

const ContactButton = ({href, text, icon}: Props) => (
  <a
    href={href}
    target='_blank'
    rel='noreferrer'
    className='w-fit p-2 underline flex items-center gap-x-4 text-lg md:text-xl bg-white
    rounded-2xl dark:text-black'
  >
    <Icon src={icon} />
    {text}
  </a>
);

export default ContactButton;
