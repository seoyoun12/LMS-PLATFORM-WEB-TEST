import { Button, Container, styled } from '@mui/material';
import { StebHeader } from '../StebHeader';
import { useEffect, useState } from 'react';
import { EduOverview } from './EduOverview';
import { CompanyInfo } from './CompanyInfo';
import { StudentInfo } from './StudentInfo';
import { useForm } from 'react-hook-form';
import { StudentList } from './StudentList';
import { useRouter } from 'next/router';
import { YN } from '@common/constant';
import {
  courseClassIndividualEnroll,
  courseClassOrganizationEnrll,
  RegisterType,
  UserTransSaveInputDataType,
} from '@common/api/courseClass';
import { useRecoilState } from 'recoil';
import { courseClassEnrollInfo, courseClassEnrollList } from '@common/recoil';
import { useSnackbar } from '@hooks/useSnackbar';

export function Steb2() {
  const router = useRouter();
  const snackbar = useSnackbar();
  // const [value, setValue] = useState<string>();
  const [isIndividual, setIsIndividual] = useState(true); //individual or team button
  const [registerType, setRegisterType] = useState<RegisterType>(RegisterType.TYPE_INDIVIDUAL);
  const [enroll, setEnroll] = useRecoilState(courseClassEnrollList);
  const [enrollInfo, setEnrollInfo] = useRecoilState(courseClassEnrollInfo); //전역에 교육정보 저장
  let confirm = false;

  const { register, setValue, watch } = useForm<UserTransSaveInputDataType>({
    defaultValues: { firstIdentityNumber: '', secondIdentityNumber: '' },
  });

  useEffect(() => {
    if (router.query.seq) setValue('courseClassSeq', Number(router.query.seq));
  }, [router.query.seq]);
  useEffect(() => {
    setValue('registerType', RegisterType.TYPE_INDIVIDUAL);
  }, []);

  const onClickEnroll = async () => {
    //단체 신청시 스택쌓이는 구조. 개인상태에서는 혼자 신청
    const { seq, firstIdentityNumber, secondIdentityNumber, ...rest } = watch();
    if (firstIdentityNumber.length < 6 || secondIdentityNumber.length < 7) return window.alert('주민번호를 모두 입력해주세요!');
    const postData = { ...rest, identityNumber: firstIdentityNumber + secondIdentityNumber }; //민증번호때문에 구분

    try {
      //개인으로 신청
      if (registerType === RegisterType.TYPE_INDIVIDUAL) {
        // const test = await courseClassIndividualEnroll(postData)
        setEnroll(prev => [...prev, watch()]);
        // setEnrollInfo(prev => {
        //   return { ...prev, seq: enrollInfo.seq };
        // });
        router.push('/stebMove/steb3');
        return console.log('컨펌입니다', confirm);
      }
      //단체로 신청
      if (registerType === RegisterType.TYPE_ORGANIZATION) {
        // const test = await courseClassOrganizationEnrll(postData);
        const randomSeq = Math.floor(Math.random() * 10000); //로컬에서 삭제를 구분하기 위한 번호
        setValue('seq', randomSeq);
        setEnroll(prev => [...prev, watch()]);
        console.log('gg', enroll);
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.message });
    }
  };

  const onClickConfirm = async () => {
    //단체에서 신청완료로 넘어가는 버튼
    confirm = true;
    if (confirm) {
      setEnrollInfo(prev => {
        return { ...prev, seq: enrollInfo.seq };
      });
      router.push('/stebMove/steb3');
      return console.log('컨펌입니다', confirm);
    }
  };

  useEffect(() => {
    //해당 페이지 접근시 개인, 단체 초기화.
    console.log('초기화');
    setEnroll([]);
    setEnrollInfo([]);
  }, []);

  // useEffect(() => {
  //   onClickConfirm();
  //   if (!confirm) {
  //     return () => {
  //       console.log('형이 왜 실행되는거야');
  //       setOrganization([]);
  //     };
  //   }
  // }, [confirm]);

  return (
    <Steb2Wrap>
      <StebHeader value={2} />
      <Steb2BodyContainer maxWidth="sm">
        <EduOverview setValue={setValue} />
        <CompanyInfo isIndividual={isIndividual} setIsIndividual={setIsIndividual} register={register} watch={watch} />
        <StudentList registerType={registerType} setRegisterType={setRegisterType} />
        <StudentInfo register={register} setValue={setValue} />
        <Button variant="contained" onClick={onClickEnroll} fullWidth sx={{ mb: 2 }}>
          신청하기
        </Button>
        {registerType === RegisterType.TYPE_ORGANIZATION && (
          <Button variant="contained" onClick={onClickConfirm} fullWidth>
            확인
          </Button>
        )}
      </Steb2BodyContainer>
    </Steb2Wrap>
  );
}

const Steb2Wrap = styled(Container)``;

const Steb2BodyContainer = styled(Container)``;
