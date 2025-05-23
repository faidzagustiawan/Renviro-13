import ImgLogo from '../assets/Logo.png';

const Logo = ({ className }) => {
  return (
    <img
      src={ImgLogo}
      alt="Logo Renviro"
      width="40"
      height="40"
      className={className}
    />
  );
};

export default Logo;