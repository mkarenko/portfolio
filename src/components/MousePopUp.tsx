import {FC, IframeHTMLAttributes} from 'react';

type MousePopUpProps = IframeHTMLAttributes<HTMLIFrameElement> & {
  position: {x: number; y: number} | null;
};

const MousePopUp: FC<MousePopUpProps> = ({position, ...props}) => {
  return (
    <>
      {position !== null && (
        <iframe
          {...props}
          title={props.title}
          width='960px'
          height='540px'
          style={{
            zIndex: 1,
            position: 'absolute',
            top: position.y + 0.5,
            left: position.x + 0.5,
            borderRadius: '15px',
            backgroundColor: '#fff',
          }}
        />
      )}
    </>
  );
};

MousePopUp.defaultProps = {
  position: {x: 0, y: 0},
};

export default MousePopUp;
