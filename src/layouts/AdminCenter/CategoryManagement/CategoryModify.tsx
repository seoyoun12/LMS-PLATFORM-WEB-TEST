import { BbsType, deleteFile, uploadFile } from '@common/api/adm/file';
import {
  CategoryBoardInput,
  modifyCategoryBoard,
  useCategoryBoard,
} from '@common/api/categoryBoard';
import { useSnackbar } from '@hooks/useSnackbar';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import styles from '@styles/common.module.scss';
import { Spinner } from '@components/ui';
import { CategoryTrafficUploadForm } from '@components/admin-center/CategoryTrafficUploadForm';

export function CategoryModify() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const categorySeq = router.query;
  const { data, error } = useCategoryBoard(Number(categorySeq.categorySeq));

  const handleSubmit = async ({
    files,
    categoryBoardInput,
    setLoading,
  }: {
    files: File[];
    categoryBoardInput: CategoryBoardInput;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    try {
      setLoading(true);
      if (data?.seq) {
        await modifyCategoryBoard({ seq: data?.seq, categoryBoardInput });
        await fileHandler(files);
        snackbar({ variant: 'success', message: '수정 되었습니다.' });
        router.push(`/admin-center/category`);
        setLoading(false);
      }
    } catch (e: any) {
      console.error(e);
      snackbar({ variant: 'error', message: '수정에 실패했습니다.' });
      setLoading(false);
    }
  };

  const fileHandler = async (files: File[]) => {
    if (files == undefined) {
      await deleteFile({
        fileTypeId: data?.seq,
        fileType:
          BbsType.TYPE_POST_NOTICE ||
          BbsType.TYPE_POST_FAQ ||
          BbsType.TYPE_POST_GUIDE_AUTH ||
          BbsType.TYPE_POST_GUIDE_EDU_REGI ||
          BbsType.TYPE_POST_GUIDE_EDU_LEARNING, // Type Setting 필요
        fileSeqList: data.s3Files.map(v => v.seq),
      });
    } else if (files.length > 0) {
      await deleteFile({
        fileTypeId: data?.seq,
        fileType:
          BbsType.TYPE_POST_NOTICE ||
          BbsType.TYPE_POST_FAQ ||
          BbsType.TYPE_POST_GUIDE_AUTH ||
          BbsType.TYPE_POST_GUIDE_EDU_REGI ||
          BbsType.TYPE_POST_GUIDE_EDU_LEARNING, // Type Setting 필요
        fileSeqList: data.s3Files.map(v => v.seq),
      });
      await uploadFile({
        fileTypeId: data?.seq,
        fileType:
          BbsType.TYPE_POST_NOTICE ||
          BbsType.TYPE_POST_FAQ ||
          BbsType.TYPE_POST_GUIDE_AUTH ||
          BbsType.TYPE_POST_GUIDE_EDU_REGI ||
          BbsType.TYPE_POST_GUIDE_EDU_LEARNING, // Type Setting 필요
        files,
      });
    }
  };

  if (error) return <div>...ERROR</div>;
  if (!data) return <Spinner />;

  return (
    <Container className={styles.globalContainer}>
      <CategoryTrafficUploadForm
        mode="modify"
        category={data}
        courseSeq={data?.courseSeq}
        onHandleSubmit={handleSubmit}
      />
    </Container>
  );
}
