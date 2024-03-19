import { ClipLoader } from 'react-spinners';

const style = { '--tw-bg-opacity': 0.75 } as React.CSSProperties;
const FullScreenLoader = () => (
  <div className="h-full w-full fixed flex justify-center items-center top-0 left-0 bg-white z-[8]" style={style}>
    <ClipLoader />
  </div>
);

export { FullScreenLoader };
