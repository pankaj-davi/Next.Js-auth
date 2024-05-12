import Image from 'next/image';
import logoSvg from '../../public/assets/Images/SVG/undraw_uploading_re_okvh.svg';

const Logo = () => (
  <div>
    <Image src={logoSvg} alt="Logo" />
  </div>
);

export default Logo;
