import { Footer } from '@components/common';
import TopNavigation from '@components/traffic/me/common/navigation/TopNavigation';

import MeCertificate from '@layouts/MeCertificate';

export default function index() {
  
  return(
    <>
    <TopNavigation />
    <MeCertificate />
    <Footer />
  </>
  )
  
}
