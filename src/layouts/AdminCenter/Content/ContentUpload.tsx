import styles from '@styles/common.module.scss';
import { Container } from '@mui/material';
import { ContentUploadForm } from '@layouts/AdminCenter';
import { ContentInput, uploadContent } from '@common/api/contentData';

export function ContentUpload() {
  const handleSubmit = ({ formData }: { formData: ContentInput }) => {
    try {
      return uploadContent(formData);
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <Container className={styles.globalContainer}>
      <ContentUploadForm onHandleSubmit={handleSubmit} />
    </Container>
  );
}
