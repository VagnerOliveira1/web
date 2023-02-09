import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Logo: React.FC = () => {
    return (
      <Link href="/">
      
          <Image src="/assets/logo-agenda.png" alt="Logo Agenda" width={40} height={40} />
    
  </Link>
    )
}

export default Logo;