import { Oval } from 'react-loader-spinner';
const Loading = () => {
  return (
    <div className='mx-auto flex justify-center'>
      <Oval
          height="100"
          width="100"
          color='grey'
          ariaLabel='loading'
      />
    </div>
  );
}

export default Loading;
