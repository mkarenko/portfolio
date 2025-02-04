export const ColoredBox = ({color}: {color: string}) => {
  return <div className='p-3 rounded-md border-2' style={{background: color}} />;
};
