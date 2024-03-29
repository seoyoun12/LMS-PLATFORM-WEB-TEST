import styles from '@styles/common.module.scss';
import { Container } from '@mui/material';
import { ContentUploadForm } from '@layouts/AdminCenter';
import { ContentInput } from '@common/api/content';
import { uploadContent } from '@common/api/adm/content';
import router from 'next/router';
import { useSnackbar } from '@hooks/useSnackbar';

export function ContentUpload() {

  const snackbar = useSnackbar();

  const handleSubmit = async ({ contentInput, setLoading }: {
    contentInput: ContentInput,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  }) => {
    try {
      setLoading(true);
      await uploadContent(contentInput);
      snackbar({ variant: 'success', message: '업로드 되었습니다.' });
      router.push(`/admin-center/content`);
      setLoading(false);
    } catch (e: any) {
      console.error(e);
      snackbar({ variant: "error", message: '업로드에 실패했습니다.' });
      setLoading(false);
    }
  };

  return (
    <Container className={styles.globalContainer}>
      <ContentUploadForm onHandleSubmit={handleSubmit} />
    </Container>
  );
}
