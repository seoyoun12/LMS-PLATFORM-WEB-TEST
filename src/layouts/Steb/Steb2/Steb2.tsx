import { Box, Button, ButtonGroup, Container, FormControl, FormControlLabel, LinearProgress, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography, styled } from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { YN, phoneList } from '@common/constant';
import { courseClassIndividualEnroll,courseClassOrganizationEnrll,courseSubCategoryType,RegisterType,userBusinessType,UserTransSaveInputDataType } from '@common/api/courseClass';
import { useRecoilState } from 'recoil';
import { courseClassEnrollInfo, courseClassEnrollList } from '@common/recoil';
import { useSnackbar } from '@hooks/useSnackbar';
import { signUp } from '@common/api';
import { IndividualSummary } from './IndividualSummary';
import useResponsive from '@hooks/useResponsive';
import { Spinner } from '@components/ui';
import { Phone4Regex, carNumberRegex, phoneRegex } from '@utils/inputRegexes';
import EduOverview2 from './EduOverview2';
import StepCard from './common/StepCard';
import { userBusinessTypeTwo } from '@layouts/MeEdit/TransWorker/TransWorker';
import { locationList, residenceList } from '@layouts/MeEdit/MeEdit';
import { UserRole, useMyUser } from '@common/api/user';
import { blue } from '@mui/material/colors';
import StebHeader from '../StebHeader/StebHeader';


interface FormType {
  localName: string;
  digit2: string;
  oneWord: string;
  digit4: string;
}

const localList = [
  { title: '충남', type: 'NAM' },
  { title: '세종', type: 'SEJONG' },
];

const oneWordList = ['아', '바', '사', '자', '배'];

const Placeholder = ({ children }) => {
  return <Box color='#bababa'>{children}</Box>;
};

export default function Steb2() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const isDesktop = useResponsive();
  const [registerType, setRegisterType] = useState<RegisterType>(RegisterType.TYPE_INDIVIDUAL); //개인신청 단체신청 토글
  const [enroll, setEnroll] = useRecoilState(courseClassEnrollList); //전역에 신청자 정보 저장
  const [enrollInfo, setEnrollInfo] = useRecoilState(courseClassEnrollInfo); //전역에 교육정보 저장
  const [confirm, setConfirm] = useState(false);
  const [isIndividualCheck, setIsIndividualCheck] = useState(false);
  const [hideCarNumber, setHideCarNumber] = useState(false); //차량번호 숨기기
  const [fixedBusinessType, setFixedBusinessType] = useState<userBusinessType>(); //업체정보 운수구분 고정용(여객-여객,화물-화물)
  const [loading, setLoading] = useState(false);
  const confirmRef = useRef<boolean>();
  // const [CheckElementList, setCheckElementList] = useState<NodeListOf<Element>>();
  const [currentIndex,setCurrentIndex] = useState(1);
  const [pageIndex,setPageIndex] = useState(1);
  const [disabledCompany, setDisabledCompany] = useState(false);

  const [isChecked,setIsChecked] = useState('agree'); // agree | deny
  const [name, setName] = useState<string>(); //이름
  const [firstIdentityNumber, setFirstIdentityNumber] = useState<string>(); //주민앞
  const [secondIdentityNumber, setSecondidentityNumber] = useState<string>(); //주민뒷
  const [err, setErr] = useState(false);
  const { user } = useMyUser();

  const { register, setValue, getValues, watch } = useForm<UserTransSaveInputDataType>({
    defaultValues: { firstIdentityNumber: '', secondIdentityNumber: '', smsYn: YN.YES,firstPhone:'',secondPhone:'',thirdPhone:'' },
  });
  
  const { watch:carWatch, setValue:carSetValue, getValues:carGetValues, register: carRegister } = useForm<FormType>({
    defaultValues: { digit2:'', digit4:'', localName:'', oneWord:'' }
  });

  // 저상버스 예약시 최종 마지막 단계 스텝6 '개인정보동의' 다음 단계가 스텝3이 나옵니다

  const nextStep = () => {
    if(currentIndex === 2 && disabledCompany) return setCurrentIndex(4);
    if((currentIndex === 3 && hideCarNumber) || (currentIndex === 3 && watch().businessSubType ==='KNEELING_BUS')) return setCurrentIndex(5);    
    if(currentIndex > 8) return;
    setPageIndex(prev => prev + 1);
    setCurrentIndex(prev  => prev + 1) 
  }

  const prevStep = () => {
    if(currentIndex <= 1) return;
    if(currentIndex === 3 && (localStorage.getItem('site_course_type') === 'TYPE_LOW_FLOOR_BUS')) return;
    if(currentIndex === 4 && disabledCompany) return setCurrentIndex(2);
    if((currentIndex === 5 && hideCarNumber) || (currentIndex === 5 && watch().businessSubType ==='KNEELING_BUS')) return setCurrentIndex(3);
    setCurrentIndex(prev  => prev - 1);
    setPageIndex(prev => prev - 1);
  }

  const onChangeBusinessSubType = (e:SelectChangeEvent) => {
    const { value } = e.target;

    if (courseSubCategoryType.CHARTER_BUS === value) {
      setValue('businessName', '');
      setValue('businessSubType', value as courseSubCategoryType);
      setDisabledCompany(false);
      return setHideCarNumber(false);
    }

    if (courseSubCategoryType.SPECIAL_PASSENGER === value) {
      setValue('businessName', '');
      setValue('businessSubType', value as courseSubCategoryType);
      setDisabledCompany(false);
      return setHideCarNumber(true);
    }
    
    if (courseSubCategoryType.PRIVATE_TAXI === value) {
      setValue(
        'businessName',
        userBusinessTypeTwo.filter(item => item.enType === value)[0].type
      );
      setValue('businessSubType', value as courseSubCategoryType);
      setDisabledCompany(true);
      return setHideCarNumber(false);
    }

    //차량번호 비활성화
    if (
      courseSubCategoryType.BUS === value ||
      courseSubCategoryType.CHARTER_BUS === value ||
      courseSubCategoryType.CORPORATE_TAXI === value
    ) {
      setValue('carNumber', null);
      setValue('businessName', '');
      setValue('businessSubType', value as courseSubCategoryType);
      setDisabledCompany(false);
      return setHideCarNumber(true);
    }

    //회사명 고정
    if (
      courseSubCategoryType.PRIVATE_TAXI === value
      || courseSubCategoryType.CONSIGNMENT === value
      || courseSubCategoryType.INDIVIDUAL_CARGO === value) {
      setDisabledCompany(true);
      setValue(
        'businessName',
        userBusinessTypeTwo.filter(item => item.enType === value)[0].type
      );

      if (courseSubCategoryType.PRIVATE_TAXI === value) setDisabledCompany(false); //개인택시 보이게
      return setValue('businessSubType', value);
    }
    setDisabledCompany(false);
    setHideCarNumber(false);
    setValue('businessName', '');
    setValue('businessSubType', value as courseSubCategoryType);
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
      setCurrentIndex(1);
      setPageIndex(1)
      return snackbar({ variant: 'error', message: '운수구분을 선택해주세요!' });
    }

    //저상버스 처리
    if (!(localStorage.getItem('site_course_type') === 'TYPE_LOW_FLOOR_BUS')) {
      if (String(rest.businessSubType) === '' || !rest.businessSubType) {
        setCurrentIndex(2);
        setPageIndex(2)
        return snackbar({ variant: 'error', message: '업종구분을 선택해주세요!' });
      }
    }
    if (!disabledCompany && !rest.businessName) {
      setCurrentIndex(3);
      setPageIndex(3)
      return snackbar({ variant: 'error', message: '회사명을 입력해주세요!' });
    }


    if (rest.carRegisteredRegion === '' || !rest.carRegisteredRegion) {
      setCurrentIndex(5);
      setPageIndex(5)
      return snackbar({ variant: 'error', message: '차량등록지를 선택해주세요!' });
    }

    if (rest.residence === '' || !rest.residence) {
      setCurrentIndex(6);
      setPageIndex(6);
      return snackbar({ variant: 'error', message: '거주지를 선택해주세요!' });
    }

    if (!phoneRegex.test(firstPhone + secondPhone + thirdPhone)) {
      setCurrentIndex(7);
      setPageIndex(7);
      return snackbar({
        variant: 'error',
        message: '올바른 형식의 휴대전화를 입력해주세요!',
      });
    }

    if (!isIndividualCheck) {
      setCurrentIndex(9);
      setPageIndex(8);
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
          .then(async () => {
            //계정생성완료 후 작업
            try {
              const { data } = await courseClassOrganizationEnrll(postData);
              setValue('seq', data.seq);
              setEnroll(prev => [...prev, watch()]);
              setLoading(false);
            } catch (e) {
              snackbar({ variant: 'error', message: e.data.message });
              setLoading(false);
            }
          })
          .catch(async e => {
            console.dir(e.data.status);
            if (e.data.status === 400) {
              //이미 존재하는 계정
              try {
                const { data } = await courseClassOrganizationEnrll(postData);
                setValue('seq', data.seq);
                setEnroll(prev => [...prev, watch()]);
                setLoading(false);
              } catch (e) {
                snackbar({ variant: 'error', message: e.data.message });
                setLoading(false);
              }
            }
            if (e.data.status !== 400)
              snackbar({ variant: 'error', message: e.data.message });
          });
      }
    } catch (e) {
      confirmRef.current = false;
      setLoading(false);
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  const onClickConfirm = async () => {
    
    confirmRef.current = true;
    
    if (enroll.length === 0)
      return snackbar({
        variant: 'error',
        message: '신청한 교육신청자가 없습니다! 교육신청자를 추가한 후 확인해주세요',
      });
    setEnrollInfo({ seq: Number(enrollInfo && enrollInfo.seq) });
    router.push('/stebMove/steb3');
  };

  const onChangeRadioValue = (e:ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === 'agree') setValue('smsYn', YN.YES)
    else setValue('smsYn', YN.NO)
  }

  const regFunc = () => {
    const { localName, digit2, oneWord, digit4 } = carWatch();
    const carNumber = localName + digit2 + oneWord + digit4;
    if (!carNumberRegex.test(carNumber)) {
      setValue('carNumber', carNumber);
      return setErr(true);
    }
    setErr(false);
    setValue('carNumber', carNumber);
  };

  useEffect(() => {
    regFunc();
  }, [carWatch().localName, carWatch().digit2, carWatch().digit4, carWatch().oneWord]);


  useEffect(() => {
    if (user && registerType === RegisterType.TYPE_INDIVIDUAL) {
      //if your admin or safety user that not have identity number
      if (!user?.identityNumber) return;
      const first = user.identityNumber.slice(0, 6);
      const second = user.identityNumber.slice(6, 14);
      setValue('name', user.name);
      setValue('firstIdentityNumber', first);
      setFirstIdentityNumber(first);
      setValue('secondIdentityNumber', second);
      setSecondidentityNumber(second);
      if (user?.phone) {
        setValue('firstPhone', user.phone.slice(0, 3));
        setValue('secondPhone', user.phone.slice(3, 7));
        setValue('thirdPhone', user.phone.slice(7, 11));
      }
    }
    if (user && registerType === RegisterType.TYPE_ORGANIZATION) {
      //단체신청시 이름과 주민등록번호 인풋 초기화.
      setValue('name', '');
      setValue('firstIdentityNumber', '');
      setValue('secondIdentityNumber', '');
      setFirstIdentityNumber('');
      setSecondidentityNumber('');
      if (!user.roles.filter(role => role === UserRole.ROLE_TRANS_MANAGER)[0]) {
        window.alert('권한이 없는 유저입니다.');
        setRegisterType(RegisterType.TYPE_INDIVIDUAL);
      } else {
      }
    }
  }, [user, registerType]);


  useEffect(() => {
    if (enrollInfo) setValue('courseClassSeq', Number(enrollInfo.seq));
    if (!enrollInfo || !enrollInfo.seq) {
      window.alert('과정정보가 없거나 잘못된 과정입니다! 다시 시도해주세요.');
      router.push(`/stebMove/steb1`);
    }
  }, [enrollInfo]);
  useEffect(() => {
    setValue('registerType', RegisterType.TYPE_INDIVIDUAL);
  }, []);

  useEffect(() => {
    confirmRef.current = confirm;
    return () => {
      if (confirmRef.current === false) {
        //해당 페이지 접근시 개인, 단체 초기화.
        setEnroll([]);
        setEnrollInfo(null);
      }
      confirmRef.current = false;
    };
  }, [confirm]);
  
  

  useEffect(() => {
    if(localStorage.getItem('site_course_type') === 'TYPE_LOW_FLOOR_BUS') {
      setValue('businessSubType',courseSubCategoryType.KNEELING_BUS)
      if(currentIndex === 2) return setCurrentIndex(3);
    }
  },[currentIndex])

  return (
    <Steb2Wrap>
      {isDesktop && <StebHeader value={2} />}
      <Steb2BodyContainer>
        
        <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        >
          <LinearProgress sx={{margin:'0 auto',width:'50%'}} variant="determinate" value={((currentIndex - 1) * 100) / 8} />
        </Box>
        {/* --- 교육개요 --- */}
        {
        currentIndex === 1 &&
        <EduOverview2
          setValue={setValue}
          watch={watch}
          setFixedBusinessType={setFixedBusinessType}
          nextStep={nextStep}
        />
        }

        {
          currentIndex === 2 &&
          <StepCard
            nextStepAbled={!!(getValues().businessSubType)}
            comment='운수 업종을 선택해주세요'
            index={pageIndex}
            nextStep={nextStep}
            prevStep={prevStep}
          >
                <FormControl sx={{ width:'100%' }}>
                  <Select
                    labelId="businessSubType"
                    id="businessSubType"
                    placeholder="업종 유형선택"
                    {...register('businessSubType')}
                    onChange={onChangeBusinessSubType}
                    value={getValues().businessSubType || ''}
                  >
                  {userBusinessTypeTwo
                    .filter(filter => filter.category === watch().businessType)
                    .map(item => (
                      <MenuItem key={item.enType} value={item.enType}>
                        {item.type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
          
          </StepCard>
        }
        {
          currentIndex === 3 &&
          <StepCard
            nextStepAbled={!!(getValues().businessName)}
            comment='회사명을 입력해 주세요'
            index={pageIndex}
            nextStep={nextStep}
            prevStep={prevStep}
            >
              <FormControl sx={{ width:'90%' }}>
              <TextField
                placeholder="회사명"
                {...register('businessName')}
                value={watch().businessName}
                disabled={disabledCompany}
                fullWidth
              />
              </FormControl>
          </StepCard>
        }
        {
          (currentIndex === 4) &&
          <StepCard
            nextStepAbled={getValues().carNumber && getValues().carNumber.length > 8}
            comment='차량번호를 입력해 주세요' index={pageIndex}
            nextStep={nextStep}
            prevStep={prevStep}
          >
            <Box
              width='90%'
              display='flex'
              alignItems='center'
              gap='1.25rem'>

            <FormControl
            fullWidth
            sx={{
              gap: '0.15rem'
            }}
            >
              <Select
                {...carRegister('localName')}
                displayEmpty
                renderValue={ !carWatch().localName ? () => <Placeholder>지역명</Placeholder> : null }
                placeholder='지역명'
                onChange={e => carSetValue('localName',e.target.value as string)}
                value={carGetValues().localName || ''}
                sx={{ minWidth: '80px' }}
                >
                {localList.map((item) => (
                  <MenuItem key={item.type} value={item.title}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            <TextField
              {...carRegister('digit2')}
              onChange={(e) => {
                if (e.target.value.length > 2) return;
                carSetValue('digit2', e.target.value.replace(/[^0-9]/g, ''));
              }}
              value={carWatch().digit2}
              placeholder='차종 번호2자리'
              inputProps={{ inputMode: 'numeric' }}
              fullWidth
              sx={{ minWidth: '80px' }}
              />
            
              <Select
                {...carRegister('oneWord')}
                displayEmpty
                renderValue={ !carWatch().oneWord ? () => <Placeholder>용도 기호</Placeholder> : null }
                placeholder='용도 기호 한글 한글자'
                value={carGetValues().oneWord || ''}
                sx={{
                  minWidth: '80px',
                }}
              >
                {oneWordList.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            
            <TextField
              {...carRegister('digit4')}
              onChange={(e) => {
                // if (!regex4.test(e.target.value)) return;
                if (e.target.value.length > 4) return;
                carSetValue('digit4', e.target.value.replace(/[^0-9]/g, ''));
              }}
              value={carWatch().digit4}
              placeholder='차량번호 4자리'
              inputProps={{ inputMode: 'numeric' }}
              fullWidth
              sx={{
                minWidth: '80px',
              }}
            />
              </FormControl>
            </Box>
            
          </StepCard>
        }
        {
          currentIndex === 5 &&
          <StepCard nextStepAbled={!!(getValues().carRegisteredRegion)} comment='차량 등록지를 선택해주세요' index={pageIndex} nextStep={nextStep} prevStep={prevStep}>
              <FormControl sx={{ width:'90%' }}>
                <Select
                  {...register('carRegisteredRegion', {
                    required: true,
                  })}
                  placeholder='지역명'
                  onChange={(e) => setValue('carRegisteredRegion',e.target.value as string)}
                  value={getValues().carRegisteredRegion || ''}
                > 
                  {locationList
                    .filter(item =>
                      watch().businessSubType === courseSubCategoryType.BUS
                        ? true
                        : item.en !== 'CHUNGNAM'
                    )
                    .map(item => (
                      <MenuItem key={item.en} value={item.en}>
                        {item.ko}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
          </StepCard>
        }
        { currentIndex === 6 &&
          <StepCard nextStepAbled={!!(getValues().residence)} comment='현재 거주지를 입력해주세요' index={pageIndex} nextStep={nextStep} prevStep={prevStep}>
              <FormControl sx={{ width:'90%' }}>
                <Select
                  {...register('residence', {
                    required: true,
                  })}
                  onChange={(e) => setValue('residence', e.target.value as string)}
                  value={getValues().residence || ''}
                  
                >
                {residenceList.map(item => (
                  <MenuItem
                    key={item.en}
                    value={item.en}
                  >
                    {item.ko}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </StepCard>
        }
        { currentIndex === 7 &&
          <StepCard nextStepAbled={getValues().firstPhone?.length + getValues().secondPhone?.length + getValues().thirdPhone?.length > 10} comment='휴대전화 번호를 입력해주세요' index={pageIndex} nextStep={nextStep} prevStep={prevStep}>
            <Box display='flex' gap='0.5rem' justifyContent='flex-start'>
              <FormControl sx={{ width:'100%' }}>
                <Select
                  labelId="phone-type-label"
                  id="phone-type"
                  
                  {...register('firstPhone')}
                  onChange={e => setValue('firstPhone', e.target.value)}
                  value={getValues().firstPhone || ''}
                  sx={{
                    minWidth:'70px',
                  }}
                >
                {phoneList.map(item => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
                </Select>
              </FormControl>
              <TextField
                // {...register('secondPhone')}
                value={getValues().secondPhone || ''}
                onChange={e => {
                  if (Phone4Regex.test(e.target.value)) return;
                  setValue('secondPhone', e.target.value.replace(/[^0-9]/g, ''));
                }}
                inputProps={{ inputMode: 'numeric' }}
                placeholder='가운데 번호 4자리'
                sx={{
                  minWidth: '120px',
                  '& .MuiInputBase-input::placeholder': {
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    border:0
                  }
                }}
              />
              
              <TextField
                {...register('thirdPhone')}
                onChange={e => {
                  if (Phone4Regex.test(e.target.value)) return;
                  setValue('thirdPhone', e.target.value.replace(/[^0-9]/g, ''));
                }}
                value={getValues().thirdPhone}
                inputProps={{ inputMode: 'numeric' }}
                placeholder='끝 번호 4자리'
                fullWidth
                size='medium'
                sx={{
                  minWidth: '80px',
                  '& .MuiInputBase-input::placeholder': {
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    border:0
                  }
                }}
              />
            </Box>
          </StepCard>
        }
        {
          currentIndex === 8 && 
          <StepCard
            nextStepAbled
            comment=''
            index={pageIndex}
            nextStep={nextStep}
            prevStep={prevStep}
            >
            <Box paddingLeft='1rem' width='100%' display='flex' flexDirection='column' alignItems='flex-start' justifyContent='center'>

              <SmsTerms>
              <Typography display='flex'>SMS 문자 수신 동의 <Typography component='span' sx={{color:'#f41',fontWeight:'bold'}}>(선택)</Typography></Typography>
              <Typography>※ 교육접수 완료 시 예약완료 문자가 발송됩니다.</Typography>
              <Typography>※ 신청인 본인의 휴대폰 번호를 입력하셔야 합니다.</Typography>
              <AccentedWord> ※ 휴대혼번호 입력후 SMS 동의시 교육관련 문자메시지를 받으실 수 있습니다.</AccentedWord>
              </SmsTerms>
              <RadioGroup
                name="smsYn"
                defaultValue={isChecked}
                onChange={onChangeRadioValue}
                row
                sx={{display:'flex', flexWrap:'nowrap', gap:'1rem',marginTop:'2rem',alignSelf:'center'}}
              >
                <FormControlLabel
                  value='agree'
                  label='동의'
                  control={<Radio sx={{position:'absolute',top:'-10%',left:'-16%', color: isChecked === 'agree'? blue[400] : '#c7c7c7', '&.Mui-checked': { color: blue[800] } }} />}
                  onChange={() => setIsChecked('agree')}
                  sx={{
                    position:'relative',
                    display:'flex',
                    justifyContent:'center',
                    color:'#fff',minWidth:'120px',fontWeight:'bold',backgroundColor: isChecked === 'agree'? blue[500] : '#c7c7c7c7',padding:'.25rem 1rem',borderRadius:'30px 4px 4px 30px'
                  }}
                  
                  />
                <FormControlLabel
                  value='deny'
                  label='동의 안함'
                  control={<Radio sx={{position:'absolute',top:'-10%',left:'-16%',color: isChecked === 'deny'? blue[400] : '#c7c7c7', '&.Mui-checked': { color: blue[800] } }} />}
                  onChange={() => setIsChecked('deny')}
                  sx={{
                  position:'relative',
                  display:'flex',
                  justifyContent:'center',
                  color:'#fff',minWidth:'120px',fontWeight:'bold',backgroundColor: isChecked === 'deny'? blue[500] : '#c7c7c7c7',padding:'.25rem 1rem',borderRadius:'30px 4px 4px 30px'
                  }}
                />
              </RadioGroup>
            </Box>
          </StepCard>
        }
        {
          currentIndex === 9 &&
          <StepCard
          nextStepAbled
          comment='개인정보 수집 및 이용 동의split(필수)'
          index={pageIndex}
          nextStep={nextStep}
          prevStep={prevStep}
          isEndStep
          >
          <IndividualSummary
            isIndividualCheck={isIndividualCheck}
            setIsIndividualCheck={setIsIndividualCheck}
          />
          <ButtonGroup
            sx={{ width: '100%', marginTop: '1rem',padding:'3rem' }}
          >
          <ApplicationButton
            variant="contained"
            onClick={onClickEnroll}
            disabled={!(loading === false && isIndividualCheck === true)}
            
          >
            {loading ? <Spinner fit={true} /> : '신청하기'}
            {isIndividualCheck}
          </ApplicationButton>

          {registerType === RegisterType.TYPE_ORGANIZATION && (
            <ApplicationButton
              variant="contained"
              color="success"
              onClick={onClickConfirm}
              disabled={loading}
            >
              {loading ? <Spinner fit={true} /> : '확인'}
            </ApplicationButton>
          )}
          </ButtonGroup>
        </StepCard>
        }
      </Steb2BodyContainer>
    </Steb2Wrap>
  );
}

const Steb2Wrap = styled(Box)``;

const Steb2BodyContainer = styled(Container)`
  padding: 0 1rem;
  margin-top: 6rem;
  margin-bottom: 4rem;
  .MuiTextField-root {
    background: #eeefff;
  }
  .MuiSelect-select {
    background: #eeefff;
  }
`;
const AccentedWord = styled(Typography)`
  color: red;
`;

const SmsTerms = styled(Box)`
  margin: 0 auto;
`


const ApplicationButton = styled(Button)`
  width:100%;
  margin:0 auto;
  font-weight:bold;
  font-size: 24px;

  @media screen and (max-width: 514px) {
    font-size: 20px;
    font-weight: bold;
  }
  
`