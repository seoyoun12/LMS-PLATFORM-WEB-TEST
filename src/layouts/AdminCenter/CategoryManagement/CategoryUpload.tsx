import styles from '@styles/common.module.scss';
import { Container } from '@mui/material';
import { CategoryUploadForm } from '@layouts/AdminCenter';
import {
  CategoryBoard,
  CategoryBoardInput,
  uploadCategoryBoard,
  useCategoryBoard,
} from '@common/api/categoryBoard';
import { BbsType, uploadFile } from '@common/api/adm/file';
import { useSnackbar } from '@hooks/useSnackbar';
import router from 'next/router';

export function CategoryUpload() {
  const snackbar = useSnackbar();

  const fileHandler = async (files: File[], category: CategoryBoard) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      await uploadFile({
        fileTypeId: category.seq,
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

  const handleSubmit = async ({
    files,
    categoryBoardInput,
  }: {
    files: File[];
    categoryBoardInput: CategoryBoardInput;
  }) => {
    try {
      const category = await uploadCategoryBoard(categoryBoardInput); // 게시판 내용 업로드. 파일보다 먼저
      await fileHandler(files, category.data); // 파일업로드. 게시판 뒤
      snackbar({ variant: 'success', message: '업로드 되었습니다.' });
      router.push(`/admin-center/category`);
    } catch (e: any) {
      console.error(e);
      snackbar({ variant: 'error', message: '업로드에 실패했습니다.' });
    }
  };

  return (
    <Container className={styles.globalContainer}>
      <CategoryUploadForm
        // mode = { seq ? "modify" : "upload" }
        onHandleSubmit={handleSubmit}
      />
    </Container>
  );
}
