import dynamic from 'next/dynamic';

const Me = dynamic(() => import('./Me'), { ssr: false });
export default Me;
