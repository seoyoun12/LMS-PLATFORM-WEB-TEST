import { RegisterType } from '@common/api/courseClass';
import {
  getSingleCourseUser,
  modifyCourseUserIndi,
  modifyCourseUserOrga,
  ModifyCourseUserReqDto,
  RegType,
} from '@common/api/courseUser';
import { Modal } from '@components/ui';
import { useDialog } from '@hooks/useDialog';
import { useSnackbar } from '@hooks/useSnackbar';
import { locationList } from '@layouts/MeEdit/MeEdit';
import {
  userBusinessTypeOne,
  userBusinessTypeTwo,
} from '@layouts/MeEdit/TransWorker/TransWorker';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  open: boolean;
  handleClose: () => void;
  courseUserSeq: number;
  regType: RegisterType;
}

export function EnrollHistoryModal({ open, handleClose, courseUserSeq, regType }: Props) {
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const { register, setValue, reset, watch } = useForm<ModifyCourseUserReqDto>();

  useEffect(() => {
    (async function () {
      try {
        const { data } = await getSingleCourseUser(
          courseUserSeq,
          (regType === RegisterType.TYPE_INDIVIDUAL ? 'individual' : 'organization') ===
            RegType.TYPE_INDIVIDUAL
            ? RegType.TYPE_INDIVIDUAL
            : RegType.TYPE_ORGANIZATION
        );
        setValue('businessName', data.userCompanyName);
        setValue('businessSubType', data.userSubBusinessType);
        setValue('businessType', data.userBusinessType);
        setValue('carNumber', data.carNumber);
        setValue('carRegisteredRegion', data.carRegisteredRegion);
        setValue('phone', data.phone);
        setPhone1(data.phone.slice(0, 3));
        setPhone2(data.phone.slice(3, 7));
        setPhone3(data.phone.slice(7, 11));
      } catch (e: any) {
        snackbar({ variant: 'error', message: e.data.message });
      }
    })();
  }, []);

  const onSubmit = async () => {
    try {
      const dialogConfirmed = await dialog({
        title: '정보 수정하기',
        description: '정말로 수정하시겠습니까?',
        confirmText: '수정하기',
        cancelText: '취소',
      });
      if (dialogConfirmed) {
        const dataValue = {
          ...watch(),
          phone: phone1 + phone2 + phone3,
        };
        if (regType === RegisterType.TYPE_INDIVIDUAL) {
          const data = await modifyCourseUserIndi(courseUserSeq, dataValue);
        }
        if (regType === RegisterType.TYPE_ORGANIZATION) {
          const data = await modifyCourseUserOrga(courseUserSeq, dataValue);
        }
        snackbar({ variant: 'success', message: '성공적으로 수정완료 했씁니다.' });
        handleClose();
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  return (
    <Modal
      open={open}
      onCloseModal={handleClose}
      title="모달"
      maxWidth="lg"
      action={
        <Box width="100%" display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            color="warning"
            sx={{ width: '100px' }}
            onClick={() => handleClose()}
          >
            취소
          </Button>
          <Button variant="contained" sx={{ width: '100px' }} onClick={onSubmit}>
            수정
          </Button>
        </Box>
      }
    >
      <Box>
        <Table sx={{ width: '800px' }}>
          <TableBody>
            <TableRow>
              <TableCell>회사명</TableCell>
              <TableCell>
                <TextField {...register('businessName')} fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>차량번호</TableCell>
              <TableCell>
                <TextField {...register('carNumber')} fullWidth />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>운수구분(userBusinessType)</TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <Select
                    labelId="businessType"
                    id="businessType"
                    {...register('businessType')}
                    value={watch().businessType || ''}
                  >
                    {userBusinessTypeOne.map(item => (
                      <MenuItem key={item.enType} value={item.enType}>
                        {item.type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>업종구분(userSubBusinessType)</TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <Select
                    labelId="businessSubType"
                    id="businessSubType"
                    placeholder="업종 유형선택"
                    {...register('businessSubType')}
                    value={watch().businessSubType || ''}
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
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>차량등록지(carRegisteredRegion)</TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <Select
                    {...register('carRegisteredRegion')}
                    value={watch().carRegisteredRegion || ''}
                  >
                    {locationList.map(item => (
                      <MenuItem key={item.en} value={item.en}>
                        {item.ko}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>phone</TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <TextField
                    value={phone1}
                    onChange={e => {
                      if (e.target.value.length > 3) return;
                      setPhone1(e.target.value.replace(/[^0-9]/g, ''));
                    }}
                  />
                  -
                  <TextField
                    value={phone2}
                    onChange={e => {
                      if (e.target.value.length > 4) return;
                      setPhone2(e.target.value.replace(/[^0-9]/g, ''));
                    }}
                  />
                  -
                  <TextField
                    value={phone3}
                    onChange={e => {
                      if (e.target.value.length > 4) return;
                      setPhone3(e.target.value.replace(/[^0-9]/g, ''));
                    }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Modal>
  );
}
