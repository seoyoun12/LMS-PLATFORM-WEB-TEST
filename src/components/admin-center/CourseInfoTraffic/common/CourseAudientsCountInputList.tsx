import React from 'react'
import CourseAudientsCountInputGroup from './CourseAudientsCountInputGroup'
import { SubType } from '@hooks/useDominCourse';

interface Props {
  courseSubType: string;
  editTarget: boolean;
  courseAudientCount: {[key: string]: string};
  onChangeCourseAudientCount: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CourseAudientsCountInputList({ courseSubType, editTarget, courseAudientCount, onChangeCourseAudientCount }:Props) {
  return (
    <>
    { !courseSubType
      ? null
      : courseSubType === SubType.TYPE_KINDERGARTEN
      ? <CourseAudientsCountInputGroup
          diabled={!editTarget}
          length={3}
          startCount={3}
          countSuffix="세"
          name="age"
          value={courseAudientCount}
          onChange={onChangeCourseAudientCount}
        />
      : courseSubType === SubType.TYPE_ELEMENTARY
      ? <CourseAudientsCountInputGroup
          diabled={!editTarget}
          length={6}
          startCount={1}
          countSuffix="학년"
          name="grade"
          value={courseAudientCount}
          onChange={onChangeCourseAudientCount}
        />
      : (courseSubType === SubType.TYPE_MIDDLE || courseSubType === SubType.TYPE_HIGH)
      ? <CourseAudientsCountInputGroup
          diabled={!editTarget}
          length={3}
          startCount={1}
          countSuffix="학년"
          name="grade"
          value={courseAudientCount}
          onChange={onChangeCourseAudientCount}
        />
      : courseSubType === SubType.TYPE_SELF_DRIVER
      ? <CourseAudientsCountInputGroup
          diabled={!editTarget}
          length={1}
          startCount={0}
          countSuffix="자가운전자"
          name="selfDriver"
          value={courseAudientCount}
          onChange={onChangeCourseAudientCount}
        />
      : courseSubType === SubType.TYPE_ELDERLY
      ? <CourseAudientsCountInputGroup
          diabled={!editTarget}
          length={1}
          startCount={0}
          countSuffix="어르신"
          name="elderly"
          value={courseAudientCount}
          onChange={onChangeCourseAudientCount}
        />
      : null
    }
    </>
  )
  
}
