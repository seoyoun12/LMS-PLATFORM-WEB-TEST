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
import dateFormat from 'dateformat';
import SaveIcon from '@mui/icons-material/Save';

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
  // const { data } = qnaDetail(Number(qna.qnaSeq));
  const [loading, setLoading] = useState(false);

  // console.log('qna 답변 데이터 : ', data);

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
    <QnaAnswerBox
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      // encType="multipart/form-data"
      // noValidate
    >
      <FormControl sx={{ width: '100%' }}>
        <TableHeadFull colSpan={4} sx={{ display: 'table', width: '100%', mt: '20px' }}>
          1대1문의 답변
        </TableHeadFull>

        <TableBody sx={{ display: 'table', width: '100%' }}>
          <TableRow>
            <TableLeftCell align="center">등록날짜</TableLeftCell>
            {/* <TableRightCell>
              {data.qnaAnswer?.content
                ? dateFormat(data.qnaAnswer.createdDtime, 'isoDate')
                : ''}
            </TableRightCell> */}
            <TableRightCell>
              {data.qnaAnswer?.content ? data.qnaAnswer.createdDtime : ''}
            </TableRightCell>
            <TableLeftCell align="center">
              관리자
              <br />
              첨부파일
            </TableLeftCell>
            <TableRightCell>
              {data.qnaAnswer?.content ? (
                <div>
                  {data.qnaAnswer?.s3Files[0] ? (
                    <Button
                      onClick={async () => {
                        try {
                          const blobData = await downloadFile(
                            data.qnaAnswer?.s3Files[0].seq
                          );
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
                      {/* {data.qnaAnswer?.s3Files[0].name} */}
                      {data.qnaAnswer?.s3Files ? (
                        <FileChip
                          icon={<SaveIcon />}
                          sx={{ cursor: 'pointer' }}
                          label={
                            <Box sx={{ display: 'flex' }}>
                              <Box>{data?.qnaAnswer.s3Files[0].name}</Box>
                            </Box>
                          }
                        />
                      ) : null}
                    </Button>
                  ) : (
                    '파일없음'
                  )}
                </div>
              ) : (
                <Box>
                  {/* <FormLabel sx={{ mt: 2, mb: 1 }}>첨부파일업로드</FormLabel> */}
                  <div className="board-uploader">
                    <FileUploader
                      register={register}
                      regName="files"
                      onFileChange={handleFileChange}
                    >
                      {}
                    </FileUploader>
                    {fileName ? (
                      <FileChip
                        sx={{ ml: '5px' }}
                        icon={<SaveIcon />}
                        label={fileName}
                        onDelete={handleDeleteFile}
                      />
                    ) : null}
                  </div>
                </Box>
              )}
            </TableRightCell>
          </TableRow>
          <TableRow>
            <TableLeftCell align="center">답변</TableLeftCell>
            <TableLongCell colSpan={3}>
              {data.qnaAnswer?.content ? (
                <TuiViewerBox>
                  <TuiViewer initialValue={data.qnaAnswer?.content} />
                </TuiViewerBox>
              ) : (
                <TuiEditor
                  previewStyle="vertical"
                  initialEditType="wysiwyg"
                  useCommandShortcut={true}
                  ref={editorRef}
                />
              )}
            </TableLongCell>
          </TableRow>
        </TableBody>
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
    </QnaAnswerBox>
  );
}

// const boxStyles = css`
//   display: flex;
//   flex-direction: column;
//   margin-top: 8px;
// `;
const ButtonBox = styled(Box)`
  margin: 20px 0 20px 0;
`;
const SubmitBtn = styled(Button)`
  width: 15%;
  float: right;
  margin: 0 0 0 5px;
`;

const TuiViewerBox = styled(Box)`
  /* height: 600px; */
  /* padding: 20px; */
  /* font-size: 14px; 적용안됨 */
  padding: 30px 0 30px 0;
`;

/////////////////////

const QnaAnswerBox = styled(Box)`
  width: 100%;
`;

const TableHeadFull = styled(TableCell)`
  width: 100%;
  background: #f5f5f5;
  border: 1px solid #c4c4c4;
  font-weight: bold;
`;

const TableLeftCell = styled(TableCell)`
  width: 10%;
  background: #f5f5f5;
  border-right: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  &:first-of-type {
    border-left: 1px solid #c4c4c4;
    width: 10%;
  }
`;

const TableRightCell = styled(TableCell)`
  width: 40%;
  border-bottom: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
  font-size: 14px;
`;

const TableLongCell = styled(TableCell)`
  width: 90%;
  border-bottom: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
  /* padding-top: 50px;
  padding-bottom: 50px; */
  white-space: pre-wrap;
`;

const FileChip = styled(Chip)`
  height: 36.5px;
`;
