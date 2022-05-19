import styles from '@styles/common.module.scss';
import { Container } from '@mui/material';
import { ContentUploadForm } from '@layouts/AdminCenter';
import { ContentInput, uploadContent } from '@common/api/content';

export function ContentUpload() {
  const handleSubmit = ({ contentInput }: {
    contentInput: ContentInput
  }) => {
    try {
      return uploadContent(contentInput);
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
