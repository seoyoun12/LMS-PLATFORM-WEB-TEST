import { BbsType, deleteFile, uploadFile } from "@common/api/adm/file";
import { CategoryBoard, CategoryBoardInput, modifyCategoryBoard, useCategoryBoard } from "@common/api/categoryBoard";
import { CategoryUploadForm } from "@components/admin-center";
import { useSnackbar } from "@hooks/useSnackbar";
import { Box, Container } from "@mui/material";
import { useRouter } from "next/router"
import styles from '@styles/common.module.scss';
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { Tabs } from "@components/ui";


enum TabValue {
  test1 = 'test1',
  test2 = 'test2',
}
const tabsConfig = [
  { label: 'test1', value: TabValue.test1 },
  { label: 'test2', value: TabValue.test2 },
];

export function CategoryModify() {

  const router = useRouter();

  const { categorySeq, tab } = router.query;

  const snackbar = useSnackbar();
  // const [categorySeq , setCategorySeq] = useState() 
  // const categorySeq = router.query;
  const { data, error } = useCategoryBoard(Number(categorySeq));

  const fileHandler = async (files: File[], category: CategoryBoard, isFileDelete: boolean) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      await uploadFile({
        fileTypeId: category.seq, // undefined
        fileType: BbsType.TYPE_POST_NOTICE, // Type Setting 필요
        files
      });
    } else {
      if (isFileDelete) {
        await deleteFile({
          fileTypeId: category.seq,
          fileType: BbsType.TYPE_POST_NOTICE,
          fileSeqList: category.s3Files.map(v => v.seq),
        });
      }
    } 
  };

  // const handleSubmit = useCallback(async ({ files, isFileDelete, categoryBoardInput, categorySeq } : {
  const handleSubmit = async ({ files, isFileDelete, categoryBoardInput, categorySeq } : {
    files: File[],
    isFileDelete: boolean,
    categoryBoardInput: CategoryBoardInput,
    categorySeq?: number;
  }) => {
    console.log("1. categorySeq : ", categorySeq);

    try {
      console.log("2. categorySeq : ", categorySeq);
      if (categorySeq) {
        const category = await modifyCategoryBoard({seq: categorySeq, categoryBoardInput });
        await fileHandler(files, category.data, isFileDelete ); // 파일업로드 
        snackbar({ variant: 'success', message: '수정 되었습니다.' });
        router.push(`/admin-center/category`);
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  }
  // },[categorySeq])

  //
  // useEffect(()=>{
  //   console.log("라우", router)
  //   if(!router.query)
  //   setCategorySeq(router.query)
  // },[router.query])


//   return (
//     <Container className={styles.globalContainer}>
//       <CategoryUploadForm
//         mode="modify"
//         category={data}
//         courseSeq={data?.courseSeq}
//         onHandleSubmit={handleSubmit}
//       />
//     </Container>
//   )
// }

return (
  <Container className={styles.globalContainer}>
    <Box sx={{ mb: '30px' }}>
      <Tabs tabsConfig={tabsConfig} variant={'standard'} />
    </Box>
    {
      {
        [TabValue.test1]:
          <CategoryUploadForm
            mode="modify"
            category={data}
            courseSeq={data?.courseSeq}
            onHandleSubmit={handleSubmit}
          />,
        [TabValue.test2]:
          <div>asd</div>,
      }[tab as string]
    }
  </Container>
);
}
