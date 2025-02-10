import Icon from '../Icon';
import Button from './Button';

type Props = {
  href: string;
  text: string;
  icon: any;
};

const ContactButton = ({href, text, icon}: Props) => (
  <Button className='w-fit flex justify-center items-center p-2 space-x-4 text-lg text-black bg-white rounded-xl border-2 border-black md:text-xl'>
    <Icon src={icon} />
    <a href={href} target='_blank' rel='noreferrer'>
      {text}
    </a>
  </Button>
);

export default ContactButton;
