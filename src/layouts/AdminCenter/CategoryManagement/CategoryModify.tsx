import { BbsType, deleteFile, uploadFile } from '@common/api/adm/file';
import { CategoryBoard, CategoryBoardInput, modifyCategoryBoard, useCategoryBoard } from '@common/api/categoryBoard';
import { CategoryUploadForm } from '@components/admin-center';
import { useSnackbar } from '@hooks/useSnackbar';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import styles from '@styles/common.module.scss';
import { Spinner } from '@components/ui';

export function CategoryModify() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const categorySeq = router.query;
  const { data, error } = useCategoryBoard(Number(categorySeq.categorySeq)); // 중괄호 비구조화할당

  const fileHandler = async (files: File[], category: CategoryBoard, isFileDelete: boolean) => {
    const isFileUpload = files.length < 0;
    if (isFileUpload) {
      await uploadFile({
        fileTypeId: category.seq, // undefined
        fileType: BbsType.TYPE_POST_NOTICE || BbsType.TYPE_POST_FAQ || BbsType.TYPE_POST_GUIDE_AUTH || BbsType.TYPE_POST_GUIDE_EDU_REGI || BbsType.TYPE_POST_GUIDE_EDU_LEARNING , // Type Setting 필요
        files,
      });
    } else {
      if (isFileDelete) {
        await deleteFile({
          fileTypeId: category.seq,
          fileType: BbsType.TYPE_POST_NOTICE || BbsType.TYPE_POST_FAQ || BbsType.TYPE_POST_GUIDE_AUTH || BbsType.TYPE_POST_GUIDE_EDU_REGI || BbsType.TYPE_POST_GUIDE_EDU_LEARNING , // Type Setting 필요
          // fileSeqList: category.s3Files.map(v => v.seq),
          fileSeqList: category.s3Files.map(v => v.seq),
        });
      }
    }
  };

  // const handleSubmit = useCallback(async ({ files, isFileDelete, categoryBoardInput, categorySeq } : {
  const handleSubmit = async ({
    files,
    isFileDelete,
    categoryBoardInput,
    categorySeq,
  }: {
    files: File[];
    isFileDelete: boolean;
    categoryBoardInput: CategoryBoardInput;
    categorySeq?: number;
  }) => {
    try {
      if (data?.seq) {
        const category = await modifyCategoryBoard({ seq: data?.seq, categoryBoardInput });
        await fileHandler(files, category.data, isFileDelete); // 파일업로드
        snackbar({ variant: 'success', message: '수정 되었습니다.' });
        router.push(`/admin-center/category`);
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  if (error) return <div>...ERROR</div>;
  if (!data) return <Spinner />;

  return (
    <Container className={styles.globalContainer}>
      <CategoryUploadForm mode="modify" category={data} courseSeq={data?.courseSeq} onHandleSubmit={handleSubmit} />
    </Container>
  );
}
