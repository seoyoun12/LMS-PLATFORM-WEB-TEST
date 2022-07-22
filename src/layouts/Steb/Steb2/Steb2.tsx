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
import { courseClassOrganizationEnrll, RegisterType, UserTransSaveInputDataType } from '@common/api/courseClass';
import { useRecoilState } from 'recoil';
import { courseClassOrganization } from '@common/recoil';
import { useSnackbar } from '@hooks/useSnackbar';

export function Steb2() {
  const router = useRouter();
  const snackbar = useSnackbar();
  // const [value, setValue] = useState<string>();
  const [isIndividual, setIsIndividual] = useState(true); //individual or team button
  const [registerType, setRegisterType] = useState<RegisterType>(RegisterType.TYPE_INDIVIDUAL);
  const [organization, setOrganization] = useRecoilState(courseClassOrganization);

  const { register, setValue, watch } = useForm<UserTransSaveInputDataType>();

  useEffect(() => {
    if (router.query.seq) setValue('courseClassSeq', Number(router.query.seq));
  }, [router.query.seq]);
  useEffect(() => {
    setValue('registerType', RegisterType.TYPE_INDIVIDUAL);
  }, []);

  const onClickEnroll = async () => {
    //단체 신청시 스택쌓이는 구조. 개인상태에서는 혼자 신청
    const orgaPostData = { ...watch(), identityNumber: watch().firstIdentityNumber + watch().secondIdentityNumber }; //민증번호때문에 구분

    try {
      if (registerType === RegisterType.TYPE_INDIVIDUAL) return;
      if (registerType === RegisterType.TYPE_ORGANIZATION) {
        const test = await courseClassOrganizationEnrll(orgaPostData);
        console.log('테스트맨이야', test);
        setOrganization(prev => [...prev, watch()]);
        console.log('뭐라는거야', organization);
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.message });
    }
  };

  const onClickConfirm = async () => {
    //단체에서 신청완료로 넘어가는 버튼
  };

  console.log(watch());
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
