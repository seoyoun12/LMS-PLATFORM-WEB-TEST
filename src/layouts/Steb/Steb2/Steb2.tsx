import { Box, Button, Container, styled } from '@mui/material';
import StebHeader from '../StebHeader/StebHeader';
import { useEffect, useRef, useState } from 'react';
import { EduOverview } from './EduOverview';
import { CompanyInfo } from './CompanyInfo';
import { StudentInfo } from './StudentInfo';
import { useForm } from 'react-hook-form';
import { StudentList } from './StudentList';
import { useRouter } from 'next/router';
import { YN } from '@common/constant';
import {
  businessType,
  courseClassIndividualEnroll,
  courseClassOrganizationEnrll,
  RegisterType,
  userBusinessType,
  UserTransSaveInputDataType,
} from '@common/api/courseClass';
import { useRecoilState } from 'recoil';
import { courseClassEnrollInfo, courseClassEnrollList } from '@common/recoil';
import { useSnackbar } from '@hooks/useSnackbar';
import { signUp } from '@common/api';
import { IndividualSummary } from './IndividualSummary';
import useResponsive from '@hooks/useResponsive';
import { Spinner } from '@components/ui';
import { carNumberRegex, phoneRegex } from '@utils/inputRegexes';

export default function Steb2() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const isDesktop = useResponsive();
  const [isIndividual, setIsIndividual] = useState(true); //individual or team button
  const [registerType, setRegisterType] = useState<RegisterType>(
    RegisterType.TYPE_INDIVIDUAL
  ); //개인신청 단체신청 토글
  const [enroll, setEnroll] = useRecoilState(courseClassEnrollList); //전역에 신청자 정보 저장
  const [enrollInfo, setEnrollInfo] = useRecoilState(courseClassEnrollInfo); //전역에 교육정보 저장
  const [confirm, setConfirm] = useState(false);
  const [isIndividualCheck, setIsIndividualCheck] = useState(false);
  const [hideCarNumber, setHideCarNumber] = useState(false); //차량번호 숨기기
  const [fixedBusinessType, setFixedBusinessType] = useState<userBusinessType>(); //업체정보 운수구분 고정용(여객-여객,화물-화물)
  const [loading, setLoading] = useState(false);
  const confirmRef = useRef<boolean>();
  const [CheckElementList, setCheckElementList] = useState<NodeListOf<Element>>();

  const { register, setValue, watch } = useForm<UserTransSaveInputDataType>({
    defaultValues: { firstIdentityNumber: '', secondIdentityNumber: '', smsYn: YN.YES },
  });

  //리코일 체크후 courseClassSeq값이 없으면 step1으로 이동시키는 이펙트
  useEffect(() => {
    if (enrollInfo) setValue('courseClassSeq', Number(enrollInfo.seq));

    if (!enrollInfo || !enrollInfo.seq) {
      window.alert('과정정보가 없거나 잘못된 과정입니다! 다시 시도해주세요.');
      router.push(`/stebMove/steb1`);
    }
  }, [enrollInfo]);

  //useForm의 첫 타입설정 이펙트
  useEffect(() => {
    setValue('registerType', RegisterType.TYPE_INDIVIDUAL);
  }, []);

  // 스크롤을 위한 이펙트
  useEffect(() => {
    const scrollBoxList = document.querySelectorAll('.scroll-to-box');
    // if (scrollBoxList.length !== (CheckElementList && CheckElementList.length))
    setCheckElementList(scrollBoxList);
  }, []);

  console.log(watch());

  const scrollElement = (indexNumber: number) => {
    CheckElementList[indexNumber].scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const onClickEnroll = async () => {
    //단체 신청시 스택쌓이는 구조. 개인상태에서는 혼자 신청
    const {
      seq,
      firstIdentityNumber,
      secondIdentityNumber,
      firstPhone,
      secondPhone,
      thirdPhone,
      ...rest
    } = watch();

    if (!enrollInfo || !enrollInfo.seq)
      return window.alert('오류입니다! 교육일정으로 돌아가서 다시 신청해주세요!');
    if (String(rest.businessType) === '' || !rest.businessType) {
      scrollElement(0);
      return snackbar({ variant: 'error', message: '운수구분을 선택해주세요!' });
    }
    if (String(rest.businessSubType) === '' || !rest.businessSubType) {
      scrollElement(1);
      return snackbar({ variant: 'error', message: '업종구분을 선택해주세요!' });
    }
    if (rest.businessName === '' || !rest.businessName) {
      scrollElement(2);
      return snackbar({ variant: 'error', message: '회사명을 입력해주세요!' });
    }
    if (!hideCarNumber && !carNumberRegex.test(rest.carNumber)) {
      scrollElement(3);
      return snackbar({
        variant: 'error',
        message: '올바른 형식의 차량번호를 입력해주세요!',
      });
    }
    if (rest.carRegisteredRegion === '' || !rest.carRegisteredRegion) {
      scrollElement(4);
      return snackbar({ variant: 'error', message: '차량등록지를 선택해주세요!' });
    }
    if (rest.name === '' || !rest.name) {
      scrollElement(5);
      return snackbar({
        variant: 'error',
        message: '이름을 입력해주세요!(관리자일경우 일반회원으로 시도해주세요)',
      });
    }

    if (firstIdentityNumber.length < 6 || secondIdentityNumber.length < 7) {
      scrollElement(6);
      return snackbar({
        variant: 'error',
        message: '주민번호를 모두 입력해주세요!(관리자일경우 일반회원으로 시도해주세요)',
      });
    }
    if (rest.residence === '' || !rest.residence) {
      scrollElement(7);
      return snackbar({ variant: 'error', message: '거주지를 선택해주세요!' });
    }

    if (!phoneRegex.test(firstPhone + secondPhone + thirdPhone)) {
      scrollElement(8);
      return snackbar({
        variant: 'error',
        message: '올바른 형식의 휴대전화를 입력해주세요!',
      });
    }

    if (!isIndividualCheck) {
      scrollElement(9);
      return snackbar({
        variant: 'error',
        message: '개인정보 수집 및 이용동의에 체크해주세요!',
      });
    }

    const postData = {
      ...rest,
      businessType: watch().businessType, //TYPE_PASSENGER 이런식인줄 알았으나 PASSENGER식으로 요청해야함
      carNumber: hideCarNumber ? null : rest.carNumber,
      identityNumber: firstIdentityNumber + secondIdentityNumber,
      phone: firstPhone + secondPhone + thirdPhone,
    }; //민증번호때문에 구분

    try {
      //개인으로 신청
      if (registerType === RegisterType.TYPE_INDIVIDUAL) {
        confirmRef.current = true;
        // console.log(watch(), 'ssss');
        setLoading(true);
        const test = await courseClassIndividualEnroll(postData);
        setEnroll([watch()]);
        setEnrollInfo(prev => {
          return { ...prev, seq: enrollInfo.seq };
        });
        setLoading(false);
        router.push('/stebMove/steb3');
      }
      //단체로 신청
      if (registerType === RegisterType.TYPE_ORGANIZATION) {
        setLoading(true);
        signUp({
          username: watch().firstIdentityNumber + secondIdentityNumber,
          password: watch().firstIdentityNumber + secondIdentityNumber,
          name: watch().name,
          email: '',
          regCategory: 'TYPE_TRANS_EDU',
          phone: firstPhone + secondPhone + thirdPhone,
          emailYn: YN.NO,
          smsYn: YN.NO,
        })
          .then(async res => {
            //계정생성완료 후 작업
            const { data } = await courseClassOrganizationEnrll(postData);
            setValue('seq', data.seq);
            setEnroll(prev => [...prev, watch()]);
            setLoading(false);
            router.push('/stebMove/steb3');
          })
          .catch(async e => {
            console.dir(e.data.status);
            if (e.data.status === 400) {
              //이미 존재하는 계정
              const { data } = await courseClassOrganizationEnrll(postData);
              setValue('seq', data.seq);
              setEnroll(prev => [...prev, watch()]);
              setLoading(false);
              router.push('/stebMove/steb3');
            }
          });
      }
    } catch (e: any) {
      confirmRef.current = false;
      setLoading(false);
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  const onClickConfirm = async () => {
    //단체에서 신청완료로 넘어가는 버튼
    // setConfirm(true);
    confirmRef.current = true;
    // if (confirm) {
    setEnrollInfo({ seq: Number(enrollInfo && enrollInfo.seq) });
    router.push('/stebMove/steb3');
    // }
  };
  useEffect(() => {
    confirmRef.current = confirm;
  }, [confirm]);

  useEffect(() => {
    return () => {
      if (confirmRef.current === false) {
        //해당 페이지 접근시 개인, 단체 초기화.
        setEnroll([]);
        setEnrollInfo(null);
      }
      confirmRef.current = false;
    };
  }, []);

  // useEffect(() => {
  //   //해당 페이지 접근시 개인, 단체 초기화.
  //   setEnroll([]);
  //   setEnrollInfo([]);
  // }, []);

  // useEffect(() => {
  //   onClickConfirm();
  //   if (!confirm) {
  //     return () => {
  //       setOrganization([]);
  //     };
  //   }
  // }, [confirm]);

  return (
    <Steb2Wrap>
      {isDesktop && <StebHeader value={2} />}
      <Steb2BodyContainer>
        <EduOverview
          setValue={setValue}
          watch={watch}
          setFixedBusinessType={setFixedBusinessType}
        />
        <CompanyInfo
          isIndividual={isIndividual}
          setIsIndividual={setIsIndividual}
          register={register}
          watch={watch}
          setValue={setValue}
          setHideCarNumber={setHideCarNumber}
          fixedBusinessType={fixedBusinessType}
          hideCarNumber={hideCarNumber}
        />
        <StudentList registerType={registerType} setRegisterType={setRegisterType} />
        <StudentInfo
          register={register}
          setValue={setValue}
          registerType={registerType}
          setRegisterType={setRegisterType}
          watch={watch}
          hideCarNumber={hideCarNumber}
        />
        <IndividualSummary
          isIndividualCheck={isIndividualCheck}
          setIsIndividualCheck={setIsIndividualCheck}
        />
        <ConfirmButtonsWrap>
          <Button
            variant="contained"
            onClick={onClickEnroll}
            disabled={loading}
            fullWidth
            sx={{ mb: 2 }}
          >
            {loading ? <Spinner fit={true} /> : '신청하기'}
          </Button>
          {registerType === RegisterType.TYPE_ORGANIZATION && (
            <Button
              variant="contained"
              onClick={onClickConfirm}
              disabled={loading}
              fullWidth
            >
              {loading ? <Spinner fit={true} /> : '확인'}
            </Button>
          )}
        </ConfirmButtonsWrap>
      </Steb2BodyContainer>
    </Steb2Wrap>
  );
}

const Steb2Wrap = styled(Box)``;

const Steb2BodyContainer = styled(Container)`
  padding: 0 1rem;
  margin-top: 6rem;
  .MuiTextField-root {
    background: #eeefff;
  }
  .MuiSelect-select {
    background: #eeefff;
  }
`;

const ConfirmButtonsWrap = styled(Box)`
  max-width: 650px;
  margin: auto;
`;
