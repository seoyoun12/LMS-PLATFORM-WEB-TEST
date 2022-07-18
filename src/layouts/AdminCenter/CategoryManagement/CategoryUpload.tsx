import styles from '@styles/common.module.scss';
import { Container } from '@mui/material';
import { CategoryUploadForm } from '@layouts/AdminCenter';
import { CategoryBoard, CategoryBoardInput, uploadCategoryBoard } from '@common/api/categoryBoard';
import { BbsType, uploadFile } from '@common/api/adm/file';
import { CourseInput, CourseRes } from '@common/api/course';
import { useSnackbar } from '@hooks/useSnackbar';
import { useState } from 'react';

export function CategoryUpload() {
  
  const [ seq, setSeq ] = useState<number | null>(null);
  const snackbar = useSnackbar();
  const fileHandler =async (files: File[], category: CategoryBoard) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      await uploadFile({
        fileTypeId: category.seq, // undefined
        fileType: BbsType.TYPE_POST_NOTICE, // Type Setting 필요
        files
      });
    }
    console.log("1. category.seq : ", category.seq);
  };

  const handleSubmit = async ({ files, categoryBoardInput } : {
    files: File[],
    categoryBoardInput: CategoryBoardInput,
  }) => {
    console.log("2. categoryBoardInput: ", categoryBoardInput)
    try {
      const category = await uploadCategoryBoard(categoryBoardInput);
      console.log("3. category: " , category);
      console.log("4. category: " , category.data.seq);

      await fileHandler(files, category.data); // 파일업로드 
      snackbar({ variant: 'success', message: '업로드 되었습니다.' });
      
    } catch (e: any) {
      console.error(e);
    }
  } 

  console.log("seq : ", seq);

  return (
    <Container className={styles.globalContainer}>
      <CategoryUploadForm
        // mode = { seq ? "modify" : "upload" }
        onHandleSubmit={handleSubmit}
      />
    </Container>
  )

}