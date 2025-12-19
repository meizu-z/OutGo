import React from 'react';
import { motion } from 'framer-motion';
import logoImage from '../logo/image.png';

const Logo = ({ size = 120, showText = true, className = '', animate = true }) => {
  const LogoWrapper = animate ? motion.img : 'img';

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Logo Image */}
      <LogoWrapper
        src={logoImage}
        alt="OutGo Logo"
        width={size}
        height={size}
        className="object-contain"
        {...(animate && {
          whileHover: { scale: 1.05, rotate: 5 },
          transition: { type: 'spring', stiffness: 300 },
        })}
      />

      {/* OutGo Text */}
      {showText && (
        <div
          className="mt-4 text-[#442D1C] font-bold tracking-tight"
          style={{ fontSize: size * 0.25 }}
        >
          OutGo
        </div>
      )}
    </div>
  );
};

export default Logo;
