import SendMessage from '@components/admin-center/sms/send-message/SendMessage';
import { AdminCenterLayout } from '@layouts/AdminCenter';


export default function MessageSettingPage() {
  return <SendMessage />
}

MessageSettingPage.Layout = AdminCenterLayout;