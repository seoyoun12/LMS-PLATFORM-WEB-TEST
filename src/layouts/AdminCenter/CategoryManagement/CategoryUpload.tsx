import styles from '@styles/common.module.scss';
import { Container } from '@mui/material';
import { CategoryUploadForm } from '@layouts/AdminCenter';
import { CategoryBoard, CategoryBoardNoticeInput, uploadCategoryBoardNotice } from '@common/api/categoryBoard';
import { BbsType, uploadFile } from '@common/api/adm/file';

export function CategoryUpload() {

  const fileHandler =async (files: File[], category: CategoryBoard) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      await uploadFile({
        fileTypeId: category.seq,
        fileType: BbsType.TYPE_CATEGORY,
        files
      });
    }
  };

  const handleSubmit = async ({ files, categoryBoardNoticeInput } : {
    files: File[],
    categoryBoardNoticeInput: CategoryBoardNoticeInput,
  }) => {
    try {
      const category = await uploadCategoryBoardNotice(categoryBoardNoticeInput);
      await fileHandler(files, category);
    } catch (e: any) {
      console.error(e);
    }
  }

  return (
    <Container className={styles.globalContainer}>
      <CategoryUploadForm onHandleSubmit={handleSubmit} />
    </Container>
  )

}