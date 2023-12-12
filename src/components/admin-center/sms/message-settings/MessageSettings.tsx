
import styled from '@emotion/styled';
import useSms, { MessageType, SMSRequestBody } from '@hooks/useSms'
import { useSnackbar } from '@hooks/useSnackbar';
import { Box, TextareaAutosize } from '@mui/material';
import { ConvertEnum } from '@utils/convertEnumToHangle';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'

const rules = {
  DAILY_START_NOTIFICATION: ['|수강자명|', '|교육종료일|', '|수강과정명|', '|수강교육명|', '|바로가기|', '|예약날짜|', '|교육일정|', '|교육업종|', '|교육과정|', '|교육시간|', '|교육전체차시수|', '|교육명|', '|회사명|', '|차량번호|', '|교육시작일|', '|수정내용|', '|수강내역|', '|과정명|', '|질문제목|'],
  DAILY_COURSE_END_NOTIFICATION: ['|수강자명|', '|교육종료일|', '|수강과정명|', '|수강교육명|', '|바로가기|', '|예약날짜|', '|교육일정|', '|교육업종|', '|교육과정|', '|교육시간|', '|교육전체차시수|', '|교육명|', '|회사명|', '|차량번호|', '|교육시작일|', '|수정내용|', '|수강내역|', '|과정명|', '|질문제목|'],
  DAILY_INCOMPLETE_COURSE_NOTIFICATION: ['|수강자명|', '|교육종료일|', '|수강과정명|', '|수강교육명|', '|바로가기|', '|예약날짜|', '|교육일정|', '|교육업종|', '|교육과정|', '|교육시간|', '|교육전체차시수|', '|교육명|', '|회사명|', '|차량번호|', '|교육시작일|', '|수정내용|', '|수강내역|', '|과정명|', '|질문제목|'],
  ENROLLMENT_CONFIRMATION: ['|수강자명|', '|교육종료일|', '|수강과정명|', '|수강교육명|', '|바로가기|', '|예약날짜|', '|교육일정|', '|교육업종|', '|교육과정|', '|교육시간|', '|교육전체차시수|', '|교육명|', '|회사명|', '|차량번호|', '|교육시작일|', '|수정내용|', '|수강내역|', '|과정명|', '|질문제목|'],
  COURSE_COMPLETION_NOTIFICATION: ['|수강자명|', '|교육종료일|', '|수강과정명|', '|수강교육명|', '|바로가기|', '|예약날짜|', '|교육일정|', '|교육업종|', '|교육과정|', '|교육시간|', '|교육전체차시수|', '|교육명|', '|회사명|', '|차량번호|', '|교육시작일|', '|수정내용|', '|수강내역|', '|과정명|', '|질문제목|'],
  COURSE_MODIFICATION_NOTIFICATION: ['|수강자명|', '|교육종료일|', '|수강과정명|', '|수강교육명|', '|바로가기|', '|예약날짜|', '|교육일정|', '|교육업종|', '|교육과정|', '|교육시간|', '|교육전체차시수|', '|교육명|', '|회사명|', '|차량번호|', '|교육시작일|', '|수정내용|', '|수강내역|', '|과정명|', '|질문제목|'],
  COURSE_CANCELLATION_NOTIFICATION: ['|수강자명|', '|교육종료일|', '|수강과정명|', '|수강교육명|', '|바로가기|', '|예약날짜|', '|교육일정|', '|교육업종|', '|교육과정|', '|교육시간|', '|교육전체차시수|', '|교육명|', '|회사명|', '|차량번호|', '|교육시작일|', '|수정내용|', '|수강내역|', '|과정명|', '|질문제목|'],
  ADDITIONAL_ENROLLMENT_NOTIFICATION: ['|수강자명|', '|교육종료일|', '|수강과정명|', '|수강교육명|', '|바로가기|', '|예약날짜|', '|교육일정|', '|교육업종|', '|교육과정|', '|교육시간|', '|교육전체차시수|', '|교육명|', '|회사명|', '|차량번호|', '|교육시작일|', '|수정내용|', '|수강내역|', '|과정명|', '|질문제목|'],
  QNA_ANSWER_NOTIFICATION: ['|수강자명|', '|교육종료일|', '|수강과정명|', '|수강교육명|', '|바로가기|', '|예약날짜|', '|교육일정|', '|교육업종|', '|교육과정|', '|교육시간|', '|교육전체차시수|', '|교육명|', '|회사명|', '|차량번호|', '|교육시작일|', '|수정내용|', '|수강내역|', '|과정명|', '|질문제목|'],
}

type MessageCategory = keyof typeof MessageType;

export default function MessageSettings() {
  const snackbar = useSnackbar();
  const { data, error, mutate, putSMSSettings } = useSms();
  const [selectMessage, setSelectMessage] = useState([0,0]);
  const [formattedString, setFormattedString] = useState<Record<MessageCategory ,string>>({
    DAILY_START_NOTIFICATION: '',
    DAILY_COURSE_END_NOTIFICATION: '',
    DAILY_INCOMPLETE_COURSE_NOTIFICATION: '',
    ENROLLMENT_CONFIRMATION: '',
    COURSE_COMPLETION_NOTIFICATION: '',
    COURSE_MODIFICATION_NOTIFICATION: '',
    COURSE_CANCELLATION_NOTIFICATION: '',
    ADDITIONAL_ENROLLMENT_NOTIFICATION: '',
    QNA_ANSWER_NOTIFICATION: '',
  });

  const [messageContent, setMessageContent] = useState<Record<MessageCategory ,string>>({
    DAILY_START_NOTIFICATION: '',
    DAILY_COURSE_END_NOTIFICATION: '',
    DAILY_INCOMPLETE_COURSE_NOTIFICATION: '',
    ENROLLMENT_CONFIRMATION: '',
    COURSE_COMPLETION_NOTIFICATION: '',
    COURSE_MODIFICATION_NOTIFICATION: '',
    COURSE_CANCELLATION_NOTIFICATION: '',
    ADDITIONAL_ENROLLMENT_NOTIFICATION: '',
    QNA_ANSWER_NOTIFICATION: '',
  });

  const initFormattingData = () => {
    data.forEach(smsSetting => {
      const findRules = rules[smsSetting.messageEnums];
      const replaceUnicode = findRules.reduce((prev, curr) => {
        return prev.replace('%s', curr)
      },smsSetting.content);
      const formattedString = replaceUnicode.replace(/\|([^|]+)\|/g, 
    (match, p1) => `<span style="color: red;">${p1}</span>`
      )
      setFormattedString(prev => ({
        ...prev,
        [smsSetting.messageEnums]: formattedString
      }))
      setMessageContent(prev => ({
        ...prev,
        // [smsSetting.messageEnums]: replaceUnicode
        [smsSetting.messageEnums]: replaceUnicode
      }))
    })
  }
  const onClickRollbackContent = (key: MessageCategory) => {
    
    const content = data.find(smsSetting => smsSetting.messageEnums === key)?.content;
    const formattedString = content.replace(/\|([^|]+)\|/g,
    (match, p1) => `<span style="color: red;">${p1}</span>`
    )
    setFormattedString(prev => ({
      ...prev,
      [key]: formattedString
    }))
    setMessageContent(prev => ({
      ...prev,
      [key]: content
    }))
    
    snackbar({
      message: '양식을 최근 저장된 내용으로 되돌렸습니다',
      variant: 'success'
    })
  }


  
  // const onRuleValidationCheck = (key: MessageCategory,content: string) => {
  //   const findRules = rules[key];
  //   let isValid = true;
  //   findRules.forEach(rule => {
  //     if(!content.includes(rule)) {
  //       snackbar({
  //         message: `${ConvertEnum(key)}에 ${rule}이(가) 없습니다
  //         해당 문단에는 반드시 ${rule}이(가) 포함되어야 합니다.
  //         `,
  //         variant: 'warning',
  //       });
  //       // initFormattingData();
  //       isValid = false;
  //     }
  //   })
  //   return isValid;
  // }

  const onChangeMessageContent = (e:ChangeEvent<HTMLTextAreaElement>, key: MessageCategory) => {
    const {target:{value}} = e;
    // if(!onRuleValidationCheck(key, value)) return;
    
    const formattedString = value.replace(/\|([^|]+)\|/g, 
    (match, p1) => `<span style="color: red;">${p1}</span>`
    )
    setFormattedString(prev => ({
      ...prev,
      [key]: formattedString
    }))

    setMessageContent(prev => ({
      ...prev,
      [key]: value
    }))
  }
  
  // const onKeydownPreventDeleteBackPipe = (e: KeyboardEvent<HTMLTextAreaElement> , key:MessageCategory) => {
  //   if (e.ctrlKey || e.metaKey) {
  //     // if(!onRuleValidationCheck(key, messageContent[key])) return;
  //     snackbar({
  //       message: '문단 규칙을 위해 컨트롤 키는 누를 수 없습니다',
  //       variant: 'info'
  //     })
  //     e.preventDefault();
  //     return 
  //   }
  //   const [selectionStart, selectionEnd] = selectMessage;
  //   if (e.key === 'Backspace') {
  //     if(selectionStart === selectionEnd) {
  //       if(messageContent[key][selectionStart-1] === '|') {
  //         // if(!onRuleValidationCheck(key, messageContent[key])) return;
  //         snackbar({
  //           message: '\'|\'은 삭제할 수 없습니다',
  //           variant: 'info'
  //         })
  //         e.preventDefault();
  //       }
  //       // if(!onRuleValidationCheck(key, messageContent[key])) return;

  //     } else {
  //       const wholeWord = messageContent[key].slice(selectionStart, selectionEnd);
  //       if(wholeWord.includes('|')) {
          
  //         e.preventDefault();
  //         snackbar({
  //           message: '\'|\'를 포함하여 문단을 삭제할 수 없습니다',
  //           variant: 'info'
  //         })
  //         // if(!onRuleValidationCheck(key, messageContent[key])) return;
  //       }
  //       if (e.ctrlKey) {
  //         e.preventDefault();
  //         // if(!onRuleValidationCheck(key, messageContent[key])) return;
  //       }
  //     }
  //   }
  // }

  const onClickUpdateMessageContent = async (key: MessageType) => {

    // const findRules = rules[key];
    // const content = messageContent[key];
    // const convertRuleToUnicode = findRules.reduce((prev, curr) => {
    //   return prev.replace(curr, '%s');
    // },content);
    
    // console.log({key,content})
    const body: SMSRequestBody = {
      content: messageContent[key],
      messageEnums: key
    };

    await putSMSSettings(body);
    snackbar({
      message: '문자메시지 양식이 수정되었습니다.',
      variant: 'success'
    })
  }

  useEffect(() => {
    if(!data) return;
    initFormattingData();
  }, [data])

  return (
    <div>
      <Heading>자동 문자 발송 설정</Heading>
       <RuleBox>
        <RuleTitle>사용할 수 있는 토큰 규칙</RuleTitle>
        <Rule> |교육명| |교육일정| |교육업종| |교육과정| |교육시간| |교육전체차시수| |교육시작일| |교육종료일|{'\n'}
               |수강과정명| |수강교육명| |수강자명| |수강내역|{'\n'}
               |과정명| |바로가기| |예약날짜| |회사명| |차량번호| |수정내용| |질문제목|</Rule>
       </RuleBox>
      <CardList>
      {
        data.map(smsSetting => (
          <CategoryCard key={smsSetting.messageSeq}>
            <CategoryTitleBox>
              <CategoryTitle>{ConvertEnum(smsSetting.messageEnums)}</CategoryTitle>
              <div>
                <SettingEditButton
                  bgcolor='#2d63e2'
                  onClick={() => onClickUpdateMessageContent(smsSetting.messageEnums)}
                  >수정</SettingEditButton>
                <SettingEditButton
                  bgcolor='#f41'
                  onClick={() => onClickRollbackContent(smsSetting.messageEnums)}
                  >되돌리기</SettingEditButton>
              </div>
            </CategoryTitleBox>
            <Box sx={{display: 'flex',gap: '1rem'}}>
              <MessageTextarea
                value={messageContent[smsSetting.messageEnums]}
                onChange={(e) => onChangeMessageContent(e, smsSetting.messageEnums)}
                // onKeyDown={(e) =>onKeydownPreventDeleteBackPipe(e as KeyboardEvent<HTMLTextAreaElement>, smsSetting.messageEnums)}
                minRows={5}
                onSelect={(e) => {
                  const {currentTarget:{selectionStart, selectionEnd}} = e;
                  // console.log(selectionStart, selectionEnd);
                  setSelectMessage([selectionStart, selectionEnd]);
                }}
                onCut={(e) => {
                  e.preventDefault();
                  snackbar({
                    message: '문단 규칙을 위해 잘라낼 수 없습니다',
                    variant: 'info'
                  })
                }}
                />
              <MessageViewer dangerouslySetInnerHTML={{ __html: formattedString[smsSetting.messageEnums] }} />
            </Box>
          </CategoryCard>
        ))
      }
      </CardList>
      </div>
  )
}

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const SettingEditButton = styled.button<{bgcolor: string}>`
  background-color: ${props => props.bgcolor || '#eee'};
  border: none;
  border-radius: .25rem;
  padding: .5rem 1rem;
  cursor: pointer;
  margin-right: 1rem;
  font-weight: bold;
  color: #fff;
  box-shadow: 0 2px 2px #999;
  &:hover {
    opacity: .8;
  }
`;

const CategoryTitleBox = styled.div`
  height: 4rem;
  border-bottom: 1px solid #c7c7c7;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

`

const MessageTextarea = styled(TextareaAutosize)`
  flex:1;
  resize: none;
  background-color: #eeffee;
  border: none;
  border-radius: .5rem;
  padding: 1rem;
`
const MessageViewer = styled.div`
  flex: 1;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  background-color: #eee;
  font-size: 1rem;
  line-height: 1.5;
  word-break: break-all;
  white-space: pre-line;
  `;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`
const CategoryCard = styled(Box)`
  border: 1px solid #eee;
  box-shadow: 0 2px 8px #999;  
  padding: 2rem;
  border-radius: 8px;
`

const CategoryTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: bold;
  margin-bottom: .5rem;
`

const RuleBox = styled.div`
  position: relative;
  margin-bottom: 1rem;
  width: 100%;
  padding-bottom: 1rem;

  &::before {
    position: absolute;
    bottom: 0;
    width: 100%;
    content: '';
    display: block;
    height: 1px;
    background-color: #c7c7c7;
    margin-bottom: 1rem;

  }
  
`

const RuleTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: .5rem;
`

const Rule = styled.p`
  margin-bottom: .5rem;
  color: #f41;
  font-weight: bold;
  white-space: pre-line;
  font-size: .9rem;

`