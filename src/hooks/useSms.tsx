import { GET, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr'
import { useSnackbar } from './useSnackbar';


export enum MessageType {
  
  DAILY_START_NOTIFICATION = 'DAILY_START_NOTIFICATION',
  DAILY_COURSE_END_NOTIFICATION = 'DAILY_COURSE_END_NOTIFICATION',
  DAILY_INCOMPLETE_COURSE_NOTIFICATION = 'DAILY_INCOMPLETE_COURSE_NOTIFICATION',
  ENROLLMENT_CONFIRMATION = 'ENROLLMENT_CONFIRMATION',
  COURSE_COMPLETION_NOTIFICATION = 'COURSE_COMPLETION_NOTIFICATION',
  COURSE_MODIFICATION_NOTIFICATION = 'COURSE_MODIFICATION_NOTIFICATION',
  COURSE_CANCELLATION_NOTIFICATION = 'COURSE_CANCELLATION_NOTIFICATION',
  ADDITIONAL_ENROLLMENT_NOTIFICATION = 'ADDITIONAL_ENROLLMENT_NOTIFICATION',
  QNA_ANSWER_NOTIFICATION = 'QNA_ANSWER_NOTIFICATION',
}

export interface SMSRequestBody {
  content: string;
  messageEnums: MessageType
}

interface SMSResponse {
  messageSeq: number;
  messageEnums: MessageType;
  content: string;
}

export default function useSms() {
  // SWR ver 2.0 >= Example
  const {data:{data} = {data: [] as SMSResponse[]}, error, mutate: smsMutate} = useSWR<SWRResponse<SMSResponse[]>>(`/adm/message`, GET,{
    fallback: [],
  });
  const snackbar = useSnackbar();

  const putSMSSettings = async (smsRequestBody: SMSRequestBody) => {
    try {
      await PUT(`/adm/message`, smsRequestBody); 
    } catch (error) {
      snackbar({
        message: '문자메시지 양식수정에 실패하였습니다.',
        variant: 'error'
      })
    }
     
    
  }

  return {
    data,
    error,
    mutate: smsMutate,
    putSMSSettings
  }
}
