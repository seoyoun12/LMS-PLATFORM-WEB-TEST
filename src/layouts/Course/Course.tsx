import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from '@styles/common.module.scss';
import { getCourse, Course } from '@common/api';

export function Course() {
  const [ course, setCourse ] = useState<Course>();
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getCourse({ courseId: 1 });
      setCourse(res);
      setLoading(false);
    })();

  }, []);

  return (
    course ?
      <Container>
        <div>{course.courseSubName}</div>
        <div>{course.courseName}</div>
        <div>{course.content1}</div>
        <div>{course.content1Title}</div>
      </Container> :
      <div>...loading</div>
  );
}
