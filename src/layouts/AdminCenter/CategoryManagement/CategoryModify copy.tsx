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

  const fileHandler = async (files: File[], category: {data : CategoryBoard}, isFileDelete: boolean) => {
    const isFileUpload = files.length > 0; // 이미 파일이 있으면이 아니고 파일을 첨부하면

    console.log(isFileUpload, files, files.length, isFileDelete)

    if (isFileUpload) {
      await uploadFile({
        // fileTypeId: category.seq, // undefined
        fileTypeId: data?.seq,
        fileType: BbsType.TYPE_POST_NOTICE || BbsType.TYPE_POST_FAQ || BbsType.TYPE_POST_GUIDE_AUTH || BbsType.TYPE_POST_GUIDE_EDU_REGI || BbsType.TYPE_POST_GUIDE_EDU_LEARNING , // Type Setting 필요
        files,
      });

    } else {
      if (isFileDelete) {
        console.log('나는 카텔ㅇㄴㄹㄴ', category)
        await deleteFile({
          fileTypeId: data?.seq,
          fileType: BbsType.TYPE_POST_NOTICE || BbsType.TYPE_POST_FAQ || BbsType.TYPE_POST_GUIDE_AUTH || BbsType.TYPE_POST_GUIDE_EDU_REGI || BbsType.TYPE_POST_GUIDE_EDU_LEARNING , // Type Setting 필요
          // fileSeqList: category.s3Files.map(v => v.seq),
          fileSeqList: category.data.s3Files.map(v => v.seq),
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
        await fileHandler(files, category, isFileDelete); // 파일업로드
        snackbar({ variant: 'success', message: '수정 되었습니다.' });
        router.push(`/admin-center/category`);
      }
    } catch (e: any) {
      console.error(e);
      // snackbar({ variant: 'error', message: e.data.message });
      snackbar({ variant: 'error', message: "수정에 실패했습니다." });
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
