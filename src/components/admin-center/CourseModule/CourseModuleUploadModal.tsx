import * as React from 'react';
import { Controller,useForm,UseFormRegister,UseFormSetValue,UseFormWatch } from 'react-hook-form';
import { TextField, Box,Button,FormControl,FormControlLabel,FormHelperText,FormLabel,MenuItem,Radio,RadioGroup,Select,Typography } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Modal, Spinner } from '@components/ui';
import { useSnackbar } from '@hooks/useSnackbar';
import { ProductStatus } from '@common/api/course';
import { CourseModuleSaveReqDto,CourseModuleType,deleteCourseModule,getDetailCourseModule,modifyCourseModule,uploadCourseModule } from '@common/api/adm/courseModule';
import { YN } from '@common/constant';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { CourseModuleSurveyList } from './CourseModuleSurveyList';
import { useDialog } from '@hooks/useDialog';

export const moduleTypeArr = [
  { title: '진도율', type: CourseModuleType.COURSE_MODULE_PROGRESS_RATE },
  { title: '시험', type: CourseModuleType.COURSE_MODULE_TEST },
  { title: '설문', type: CourseModuleType.COURSE_MODULE_SURVEY },
];

const inputByType: {
  type: CourseModuleType;
  children: {
    name: string;
    element: (
      register: UseFormRegister<CourseModuleSaveReqDto>,
      watch: UseFormWatch<CourseModuleSaveReqDto>,
      setValue: UseFormSetValue<CourseModuleSaveReqDto>
    ) => EmotionJSX.Element;
  }[];
}[] = [
  {
    type: CourseModuleType.COURSE_MODULE_PROGRESS_RATE,
    children: [
      {
        name: '최소 진도율',
        element: (register) => (
          <FormControl className="form-control">
            <TextField {...register('limitProgress')} />
          </FormControl>
        ),
      },
    ],
  },
  {
    type: CourseModuleType.COURSE_MODULE_TEST,
    children: [
      {
        name: '최소점수',
        element: (register) => (
          <FormControl className="form-control">
            <TextField {...register('limitScore')} />
          </FormControl>
        ),
      },
    ],
  },
  {
    type: CourseModuleType.COURSE_MODULE_SURVEY,
    children: [
      {
        name: '제출필수여부',
        element: (register, watch, setValue) => (
          <>
            <FormControl sx={{ flexDirection: 'row', alignItems: 'center' }}>
              <Typography>필수 제출</Typography>
              <Radio
                {...register('submitYn')}
                value={YN.YES}
                checked={watch().submitYn === YN.YES}
              />
              <Typography>필요 없음</Typography>
              <Radio
                {...register('submitYn')}
                value={YN.NO}
                checked={watch().submitYn === YN.NO}
              />
            </FormControl>
            <Box>최소 진도율(최대 100까지 설정하셔야합니다.)</Box>
            <TextField
              type="number"
              {...register('limitProgress')}
              onChange={e => {
                const numberValue = Number(e.target.value);
                // console.log(numberValue, 'xx');
                // if (e.target.value === '') return setValue('limitProgress', 0);
                // if (!Max100Regex.test(e.target.value)) return;
                if (numberValue > 100) return setValue('limitProgress', 100);
                setValue('limitProgress', numberValue);
              }}
              value={watch().limitProgress}
              inputProps={{ inputMode: 'numeric' }}
            />
          </>
        ),
      },
    ],
  },
];



















interface Props {
  open: boolean;
  onClose: () => void;
  courseModuleSeq?: number | null;
  courseSeq?: number;
  isModify?: boolean;
}

const defaultValues = {
  status: ProductStatus.APPROVE,
  surveySeq: null,
  submitYn: YN.NO,
  examSeq: null,
  limitProgress: 0,
  limitScore: 0,
};

export function CourseModuleUploadModal({open,onClose,courseModuleSeq,courseSeq,isModify = false}: Props) {
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [loading, setLoading] = useState(false);
  const [selectedSurveySeq, setSelectedSurveySeq] = useState<number>(null);
  const { register, handleSubmit, formState: { errors }, control, reset, setValue, watch } = useForm<CourseModuleSaveReqDto>({ defaultValues });

  const onChangeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSurveySeq(Number(e.target.value));
  };

  const onSubmit = async () => {
    const { moduleName,moduleType,submitYn,examSeq,surveySeq,limitProgress,limitScore,status } = watch();
    const inputParams: CourseModuleSaveReqDto = {
      examSeq,
      limitProgress: +limitProgress,
      limitScore,
      moduleName,
      moduleType,
      status,
      submitYn,
      surveySeq: selectedSurveySeq || surveySeq,
    };

    if (!moduleName || moduleName === '' || !moduleType || !status) {
      return window.alert('모두 입력해주세요!');
    }

    if (moduleType === CourseModuleType.COURSE_MODULE_SURVEY) {
      if (!inputParams.surveySeq || !inputParams.submitYn)
        return window.alert('모두 입력해주세요! 설문');
    }

    if (moduleType === CourseModuleType.COURSE_MODULE_PROGRESS_RATE) {
      if (!inputParams.limitProgress) return window.alert('모두 입력해주세요! 진도율');
    }

    if (moduleType === CourseModuleType.COURSE_MODULE_TEST) {
      if (!inputParams.examSeq || !inputParams.limitScore)
        return window.alert('모두 입력해주세요! 시험');
    }
    try {
      setLoading(true);
      if (isModify) {
        await modifyCourseModule(courseModuleSeq, inputParams);
        setLoading(false);
        window.alert('수정이 완료되었습니다.');
        return onClose();
      }
      if (!isModify) {
        await uploadCourseModule(courseSeq, inputParams);
        setLoading(false);
        window.alert('등록이 완료되었습니다.');
        return onClose();
      }
    } catch (e) {
      window.alert(e.data.message);
      setLoading(false);
    }
  };

  const onClickDelete = async () => {
    try {
      const dialogConfirmed = await dialog({
        title: '과정모듈 삭제',
        description: '정말로 과정모듈을 삭제하시겠습니까?',
        confirmText: '삭제',
        cancelText: '취소',
      });
      if (dialogConfirmed) {
        setLoading(true);
        await deleteCourseModule(courseModuleSeq);
        setLoading(false);
        onClose();
      }
    } catch (e) {
      window.alert(e?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    (async function () {
      if (!isModify) return;
      try {
        const { data } = await getDetailCourseModule(Number(courseModuleSeq));
        setValue('moduleName', data.moduleName);
        setValue('moduleType', data.moduleType);
        setValue('submitYn', data.submitYn);
        setValue('limitProgress', data.limitProgress);
        setValue('limitScore', data.limitScore);
        setValue('status', data.status);
        setValue('surveySeq', data.surveySeq);
      } catch (e) {
        console.dir(e);
        snackbar({ variant: 'error', message: e.data.message });
      }
    })();
  }, []);

  return (
    <Modal
      action={
        <Box display="flex" gap={2}>
          {isModify && (
            <Button variant="contained" color="warning" onClick={onClickDelete}>
              {loading ? <Spinner fit={true} /> : '삭제'}
            </Button>
          )}
          {isModify ? (
            <Button variant="contained" onClick={onSubmit} disabled={loading}>
              {loading ? <Spinner fit={true} /> : '수정'}
            </Button>
          ) : (
            <Button variant="contained" onClick={onSubmit} disabled={loading}>
              {loading ? <Spinner fit={true} /> : '등록'}
            </Button>
          )}
        </Box>
      }
      title={isModify ? '과정모듈 수정' : '과정모듈 등록'}
      maxWidth="lg"
      fullWidth
      // loading={loading}
      open={open}
      actionLoading={loading}
      onCloseModal={onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box component="form">
        <FormContainer>
          <FormControl className="form-control">
            <Typography>모듈명</Typography>
            <TextField
              {...register('moduleName', { required: '모듈명을 입력해주세요.' })}
              size="small"
              variant="outlined"
            />
            <ErrorMessage
              errors={errors}
              name="moduleName"
              as={<FormHelperText error />}
            />
          </FormControl>
          <FormControl className="form-control">
            <Typography>모듈 타입</Typography>
            <Select
              {...register('moduleType', {
                required: '모듈타입을 입력해주세요.',
                onChange: e => {
                  const saveName = watch().moduleName;
                  reset();
                  setSelectedSurveySeq(null);
                  setValue('moduleType', e.target.value);
                  setValue('moduleName', saveName);
                },
              })}
              value={watch().moduleType || ''}
            >
              {moduleTypeArr.map(item => (
                <MenuItem key={item.title} value={item.type}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
            <ErrorMessage
              errors={errors}
              name="moduleType"
              as={<FormHelperText error />}
            />
          </FormControl>
          {inputByType
            .filter(filt => watch().moduleType === filt.type)[0]
            ?.children.map(child => (
              <Box
                key={child.name}
                width="100%">
                <Typography>{child.name}</Typography>
                <Box>{child.element(register, watch, setValue)}</Box>
              </Box>
            ))}

          <FormControl className="form-control">
            <FormLabel focused={false}>상태</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="status"
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value={ProductStatus.APPROVE}
                    control={<Radio />}
                    label="정상"
                  />
                  <FormControlLabel
                    value={ProductStatus.REJECT}
                    control={<Radio />}
                    label="중지"
                  />{' '}
                </RadioGroup>
              )}
            />
          </FormControl>
          {watch().moduleType === CourseModuleType.COURSE_MODULE_SURVEY && (
            <CourseModuleSurveyList
              couserModuleSurveySeq={watch().surveySeq}
              selectedSurveySeq={selectedSurveySeq}
              onChangeSelect={onChangeSelect}
              watch={watch}
            />
          )}
        </FormContainer>
      </Box>
    </Modal>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

  .form-control {
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 30px;
    }

    .text-area {
      width: 100%;
      min-height: 120px;
    }

    .obj-type {
      width: 100%;
      display: flex;
      flex-direction: row;

      .item-container {
        display: flex;
        flex-direction: column;
        align-items: center;

        > :not(:last-child) {
          margin-bottom: 12px;
        }

        &.text-field {
          width: 100%;

          > * {
            height: 100%;
          }
        }
      }
    }
  }
`;
