import styles from '@styles/common.module.scss';
import { Container } from '@mui/material';
import { CategoryUploadForm } from '@layouts/AdminCenter';
import { CategoryBoard, CategoryBoardInput, uploadCategoryBoard } from '@common/api/categoryBoard';
import { BbsType, uploadFile } from '@common/api/adm/file';
import { CourseInput, CourseRes } from '@common/api/course';
import { useSnackbar } from '@hooks/useSnackbar';
import { useState } from 'react';

export function CategoryUpload() {
  // const [ seq, setSeq ] = useState<number | null>(null);
  const snackbar = useSnackbar();
  const fileHandler = async (files: File[], category: CategoryBoard) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      await uploadFile({
        fileTypeId: category.seq, // undefined
        fileType: BbsType.TYPE_POST_NOTICE || BbsType.TYPE_POST_FAQ, // Type Setting 필요
        files
      });
    }
  };

  const handleSubmit = async ({ files, categoryBoardInput } : {
    files: File[],
    categoryBoardInput: CategoryBoardInput,
  }) => {
    try {
      const category = await uploadCategoryBoard(categoryBoardInput); // 게시판 내용 업로드. 파일보다 먼저
      await fileHandler(files, category.data); // 파일업로드. 게시판 뒤
      snackbar({ variant: 'success', message: '업로드 되었습니다.' });
    } catch (e: any) {
      console.error(e);
    }
  }

  return (
    <Container className={styles.globalContainer}>
      <CategoryUploadForm
        // mode = { seq ? "modify" : "upload" }
        onHandleSubmit={handleSubmit}
      />
    </Container>
  )

}