import styled from '@emotion/styled';
import { MyCourse } from '@hooks/useDominMe';
import { Box, Button, Modal } from '@mui/material'
import React from 'react'
import Details from './Details';
import { ConvertEnum } from '@utils/convertEnumToHangle';
import { Close } from '@material-ui/icons';



interface Props {
  onClose: () => void;
  detailCourse: MyCourse;
}

export default function CourseDetailModal({onClose, detailCourse}: Props) {
  return (
    <Modal
      open={!!detailCourse}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <InnerWrapper>
        <TitleBox>
          {detailCourse.courseName}
          <Button onClick={onClose}><Close /></Button>
        </TitleBox>
        
        <Details
          title="NO"
          value={detailCourse.seq + ''} title2="신청자" value2={detailCourse.organization}  />
        <Details
          title="과정 타입"
          value={ConvertEnum(detailCourse.eduTargetMain)}
          title2="과정 세부타입"
          value2={ConvertEnum(detailCourse.eduTargetSub)} />
          <Details
            title="과정 신청일"
            value={(detailCourse.createdDtime).substring(0,10)}
            title2="과정 만료일"
            value2={detailCourse.expiredDtime} />
            <Details
              title="지역" value={ConvertEnum(detailCourse.region)}
            />
            <Details
              title="상태" value={detailCourse.status === 1 ? '진행중' : '종료'}
            />
            {
              detailCourse.age3 && 
              Array.from({length:3})
              .map((_,index) => (
                <Details
                  key={index}
                  title={`${index+3}세`}
                  value={detailCourse[`age${index+3} 명`] }
                />
              ))
            }
            {
              detailCourse.grade1 && 
              Array.from({length:6})
              .map((_,index) => (
                <Details
                  key={index}
                  title={`${index+1}학년`}
                  value={detailCourse[`grade${index+1} 명`]}
                />
              ))
            }
      </InnerWrapper>

    </Modal>
  )
}

const TitleBox = styled(Box)`
  width: 100%;
  align-self: flex-start;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const InnerWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`