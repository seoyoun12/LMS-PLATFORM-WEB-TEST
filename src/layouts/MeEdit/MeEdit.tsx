import * as React from 'react';
import { Container, Box, Switch, Button, TextField, Typography, tableBodyClasses } from '@mui/material';
import { useEffect, useState } from 'react';
import { getMyUser, modifyMyUser, useMyUser } from '@common/api/user';
import { useRouter } from 'next/router';
import { PasswordChangeModal } from './PasswordChangeModal/PasswordChangeModal';
import { useDialog } from '@hooks/useDialog';
import { YN } from '@common/constant';
import { TransWorker } from './TransWorker';
import { Tabs } from '@components/ui';
import { BoxProps } from '@material-ui/core';
import { Educator } from './Educator';
import { logout } from '@common/api';

const tabsConfig = [
  { label: '운수종사자', value: 'TYPE_TRANS_EDU' },
  { label: '도민교통안전교육자', value: 'TYPE_TRAFFIC_SAFETY_EDU' },
];
const locationList = [
  { ko: '천안', en: 'CHEONAN' },
  { ko: '공주', en: 'PRINCESS' },
  { ko: '보령', en: 'BORYEONG' },
  { ko: '아산', en: 'ASAN' },
  { ko: '서산', en: 'SEOSAN' },
  { ko: '논산', en: 'NONSAN' },
  { ko: '계룡', en: 'GYERYONG' },
  { ko: '당진', en: 'DANGJIN' },
  { ko: '금산', en: 'GEUMSAN' },
  { ko: '부여', en: 'GRANT' },
  { ko: '서천', en: 'SEOCHEON' },
  { ko: '청양', en: 'CHEONGYANG' },
  { ko: '홍성', en: 'HONGSEONG' },
  { ko: '예산', en: 'BUDGET' },
  { ko: '태안', en: 'TAEAN' },
  { ko: '충남', en: 'CHUNGNAM' },
  { ko: '세종시', en: 'SEJONG' },
  { ko: '서울', en: 'SEOUL' },
  { ko: '부산', en: 'BUSAN' },
  { ko: '대구', en: 'DAEGU' },
  { ko: '인천', en: 'INCHEON' },
  { ko: '광주', en: 'GWANGJU' },
  { ko: '대전', en: 'DAEJEON' },
  { ko: '울산', en: 'ULSAN' },
  { ko: '경기', en: 'GAME' },
  { ko: '강원', en: 'GANGWON' },
  { ko: '충북', en: 'CHUNGBUK' },
  { ko: '전북', en: 'JEONBUK' },
  { ko: '전남', en: 'JEONNAM' },
  { ko: '경북', en: 'GYEONGBUK' },
  { ko: '경남', en: 'GYEONGNAM' },
  { ko: '제주', en: 'JEJU' },
];

export function MeEdit() {
  const router = useRouter();
  const { user, error } = useMyUser();
  const dialog = useDialog();
  const [openPromptDialog, setOpenPromptDialog] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [smsChecked, setSmsChecked] = useState(false);

  const [tabValue, setTabValue] = useState<string>();
  const onChangeTabValue = async (newString: string) => {
    if (user?.regCategory !== newString) {
      let confirm = window.confirm('다른 타입의 정보를 수정하시려면 재로그인이 필요합니다. 로그아웃 하시겠습니까?');
      if (confirm) {
        await logout();
      } else {
        return;
      }
    }
    setTabValue(newString);
  };

  useEffect(() => {
    if (user) setTabValue(user.regCategory);
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dialogConfirmed = await dialog({
      title: "회원 정보 수정",
      description: "회원 정보를 수정하시겠습니까?",
      confirmText: "수정하기",
      cancelText: "취소하기",
    });
    await handleOnCloseConfirm(dialogConfirmed);
  };

  const handleOnCloseConfirm = async (isConfirm: boolean) => {
    if (isConfirm) {
      const emailYn = emailChecked ? YN.YES : YN.NO;
      const smsYn = smsChecked ? YN.YES : YN.NO;
      await modifyMyUser({ name: nameInput, emailYn, smsYn });
      return router.push("/me");
    }
  };

  if (!user) return <div></div>; //태그없으면 에러뜸
  return (
    <Container>
      <Tabs tabsConfig={tabsConfig} variant={'fullWidth'} gap={5} rendering={false} onChange={onChangeTabValue} value={tabValue} />
      {/* <Tabs tabsConfig={tabsConfig} variant={"fullWidth"} gap={5} rendering={false} onChange={onChange} value={value} /> */}
      <TabPanel value={tabValue} index={tabsConfig[0].value}>
        <TransWorker type="transport" locationList={locationList} />
      </TabPanel>
      <TabPanel value={tabValue} index={tabsConfig[1].value}>
        <Educator locationList={locationList} />
      </TabPanel>
      {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 1
      }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="이름"
          name="name"
          autoComplete="name"
          autoFocus
          size="small"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mt: '8px'
        }}
        >
          <Typography variant="body2">이메일 수신 여부</Typography>
          <Switch
            name="emailYn"
            sx={{ ml: 'auto' }}
            checked={emailChecked}
            onChange={(e, checked) => {
              setEmailChecked(checked);
            }}
          />
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mt: '8px'
        }}
        >
          <Typography variant="body2">SMS 수신 여부</Typography>
          <Switch
            name="smsYn"
            sx={{ ml: 'auto' }}
            checked={smsChecked}
            onChange={(e, checked) => {
              setSmsChecked(checked);
            }}
          />
        </Box>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          color="neutral"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => setOpenPromptDialog(true)}
        >
          비밀번호 변경
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          수정하기
        </Button>
      </Box>

      <PasswordChangeModal
        open={openPromptDialog}
        onClose={() => setOpenPromptDialog(false)}
      /> */}
    </Container>
  );
}

interface TabPanelProps extends BoxProps {
  children: React.ReactNode;
  value: undefined | string;
  index: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...rest } = props;
  return (
    <Box hidden={value !== index} {...rest}>
      {children}
    </Box>
  );
};
