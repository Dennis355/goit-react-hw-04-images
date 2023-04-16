import imgError from 'components/page-not-found.webp';
import css from 'components/Error/Error.module.css';
const Error = ({ message }) => {
  return (
    <div className={css.blocerror}>
      {' '}
      <img src={imgError} alt="Error" />
      {message}{' '}
    </div>
  );
};

// export const Loader = () => {
//   return (
//     <ColorRing
//       visible={true}
//       height="80"
//       width="80"
//       ariaLabel="blocks-loading"
//       wrapperStyle={{}}
//       wrapperClass="blocks-wrapper"
//       colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
//     />
//   );
// };
export default Error;
