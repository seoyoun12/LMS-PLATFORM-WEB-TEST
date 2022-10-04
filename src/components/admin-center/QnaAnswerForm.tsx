import { ChangeEvent, useRef, useState } from 'react';
import { Editor as EditorType } from '@toast-ui/react-editor';
import { SubmitHandler, useForm } from 'react-hook-form';
import { QnaAnswerInput, qnaDetail } from '@common/api/qna';
import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  FormLabel,
  styled,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { TuiEditor, TuiViewer } from '@components/common/TuiEditor';
import { FileUploader } from '@components/ui/FileUploader';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import { css } from '@emotion/css';
import router from 'next/router';
import { downloadFile } from '@common/api/file';
import { Spinner } from '@components/ui';

interface Props {
  qnaSeq?: number;
  onHandleSubmit: ({
    qnaAnswerInput,
    files,
    qnaSeq,
    setLoading,
  }: {
    qnaAnswerInput: QnaAnswerInput;
    files?: File[];
    qnaSeq?: number;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) => void;
}

interface FormType extends QnaAnswerInput {
  files: File[];
}

export function QnaAnswerForm({ onHandleSubmit }: Props) {
  const editorRef = useRef<EditorType>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const { qnaSeq } = router.query;
  const { data } = qnaDetail(Number(qnaSeq));
  const [loading, setLoading] = useState(false);

  // const { data } = qnaDetail(Number(qna.qnaSeq));

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    resetField,
  } = useForm<FormType>();

  const handleFileChange = (e: ChangeEvent) => {
    e.preventDefault();
    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    setFileName(files[0].name);
  };

  const handleDeleteFile = async () => {
    resetField('files');
    setFileName(null);
  };

  const onSubmit: SubmitHandler<FormType> = async ({ files, ...qnaAnswer }, event) => {
    event?.preventDefault();

    if (!editorRef.current) return;
    const markdownContent = editorRef.current.getInstance().getMarkdown();
    const qnaAnswerInput = {
      ...qnaAnswer,
      content: markdownContent,
    };
    onHandleSubmit({ qnaAnswerInput, files, setLoading });
  };

  return (
    <Box
      component="form"
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={boxStyles}
    >
      <FormControl>
        <TableBody className={pt20} sx={{ display: 'table', width: '100%' }}>
          <TableRow>
            <TableCellLeft sx={{ width: '10%', textAlign: 'center' }}>답변</TableCellLeft>
            {data.qnaAnswer?.content ? (
              <TuiViewerBox>
                <TuiViewer initialValue={data.qnaAnswer?.content} />
              </TuiViewerBox>
            ) : (
              <TuiEditor
                previewStyle="vertical"
                height="600px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                ref={editorRef}
              />
            )}
          </TableRow>
        </TableBody>
        {data.qnaAnswer?.content ? (
          <div>
            {data.qnaAnswer?.s3Files[0] ? (
              <Button
                onClick={async () => {
                  try {
                    const blobData = await downloadFile(data.qnaAnswer?.s3Files[0].seq);
                    const url = window.URL.createObjectURL(new Blob([blobData]));
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${data.qnaAnswer?.s3Files[0].name}`;
                    a.click();
                    a.remove();
                  } catch (e: any) {
                    console.log(e);
                  }
                }}
              >
                {data.qnaAnswer?.s3Files[0].name}
              </Button>
            ) : (
              '파일없음'
            )}
          </div>
        ) : (
          <>
            <FormLabel sx={{ mt: 2, mb: 1 }}>첨부파일업로드</FormLabel>
            <div className="board-uploader">
              <FileUploader
                register={register}
                regName="files"
                onFileChange={handleFileChange}
              >
                {}
              </FileUploader>
              {fileName ? (
                <Chip
                  sx={{ mt: '8px' }}
                  icon={<OndemandVideoOutlinedIcon />}
                  label={fileName}
                  onDelete={handleDeleteFile}
                />
              ) : null}
            </div>
          </>
        )}
      </FormControl>
      <ButtonBox>
        {data.qnaAnswer?.content ? (
          <SubmitBtn variant="contained" href="/admin-center/qna">
            돌아가기
          </SubmitBtn>
        ) : (
          <SubmitBtn variant="contained" type="submit" disabled={loading}>
            {loading ? <Spinner fit={true} /> : '문의 답변 등록'}
          </SubmitBtn>
        )}
      </ButtonBox>
    </Box>
  );
}

const TableCellLeft = styled(TableCell)`
  background: #e0e0e0;
  border-top: 1px solid #b4b4b4;
  border-bottom: 1px solid #b4b4b4;
  width: 20%;
  text-align: center;
`;

const boxStyles = css`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;
const ButtonBox = styled(Box)`
  margin: 20px 0 20px 0;
`;
const SubmitBtn = styled(Button)`
  width: 15%;
  float: right;
  margin: 0 0 0 5px;
`;

const pt20 = css`
  border: 1px solid #b4b4b4;
`;

const TuiViewerBox = styled(Box)`
  height: 600px;
  padding: 20px;
`;
