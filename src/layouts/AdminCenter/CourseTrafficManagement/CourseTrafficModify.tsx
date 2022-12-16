import { courseTrafficDetail } from '@common/api/adm/course-traffic';
import { ProvincialBoardSaveRequestDto } from '@common/api/Api';
import { useSnackbar } from '@hooks/useSnackbar';
import { useRouter } from 'next/router';
import { courseTrafficModify } from '@common/api/adm/course-traffic';
import { BbsType, deleteFile, uploadFile } from '@common/api/adm/file';
import { Spinner } from '@components/ui';
import { Container } from '@mui/material';
import { CourseTrafficUploadForm } from '@components/admin-center/CourseTrafficUploadForm';
import styles from '@styles/common.module.scss';

export function CourseTrafficModify() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { boardSeq } = router.query;
  const { data, error } = courseTrafficDetail(Number(boardSeq));

  // console.log('courseTrafficData : ', data);

  //

  const fileHandler = async (files: File[]) => {
    if (files == undefined) {
      await deleteFile({
        fileTypeId: data?.seq,
        fileType: BbsType.TYPE_PROVINCIAL_BOARD,
        fileSeqList: data.s3Files.map(v => v.seq),
      });
    } else if (files.length > 0) {
      await deleteFile({
        fileTypeId: data?.seq,
        fileType: BbsType.TYPE_PROVINCIAL_BOARD,
        fileSeqList: data.s3Files.map(v => v.seq),
      });
      await uploadFile({
        fileTypeId: data?.seq,
        fileType: BbsType.TYPE_PROVINCIAL_BOARD,
        files,
      });
    }
  };

  const handleSubmit = async ({
    files,
    courseTrafficInput,
    isFileDelete,
    setLoading,
  }: {
    files: File[];
    courseTrafficInput: ProvincialBoardSaveRequestDto;
    isFileDelete: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    // seq?: number;
  }) => {
    setLoading(true);
    try {
      if (data?.seq) {
        await courseTrafficModify({
          boardSeq: data.seq,
          courseTrafficInput,
        });
        await fileHandler(files);
        snackbar({ variant: 'success', message: '성공적으로 수정되었습니다.' });
        router.push('/admin-center/course-traffic');
        setLoading(false);
      }
    } catch (e: any) {
      console.error(e);
      snackbar({ variant: 'error', message: '업로드에 실패했습니다.' });
      setLoading(false);
    }
  };

  if (error) return <div>...ERROR</div>;
  if (!data) return <Spinner />;

  //

  return (
    <Container className={styles.globalContainer}>
      <CourseTrafficUploadForm
        mode="modify"
        courseTraffic={data}
        onHandleSubmit={handleSubmit}
      />
    </Container>
  );
}
