import { Footer } from '@components/common';
import TopNavigation from '@components/traffic/me/common/navigation/TopNavigation';
import { TrafficGlobalNavigationBar } from '@components/common/GlobalNavigationBar/TrafficGlobalNavigationBar';

import MeCertificate from '@layouts/MeCertificate';

export default function index() {
  
  return(
    <>
    <TrafficGlobalNavigationBar />
    {/* <TopNavigation /> */}
    <MeCertificate />
    <Footer />
  </>
  )
  
}
