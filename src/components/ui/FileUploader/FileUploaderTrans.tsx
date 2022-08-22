import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import { grey } from '@mui/material/colors';
import { ChangeEvent, ReactNode, useRef } from 'react';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { FileUploaderContext } from './useFileUploaderContext';

// Compound Components 패턴으로 개발한 컴포넌트 (Google에 'Compound Components 패턴' 검색)
interface Props {
  onFileChange: (e: ChangeEvent) => null | undefined | void;
  children: ReactNode;
  register: UseFormRegister<any>;
  regName: string;
  accept?: string | undefined;
}

function Label({ children }: { children: ReactNode }) {
  return (
    <Typography variant="subtitle2" className="subtitle">
      {children}
    </Typography>
  );
}

const FileUploaderRoot = ({ onFileChange, register, regName, accept = undefined, children }: Props) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const { onChange, onBlur, name, ref } = register(regName);

  const handleChanges = async (e: ChangeEvent) => {
    e.preventDefault();
    await onChange(e);
    onFileChange(e);
  };

  return (
    <FileUploaderContext.Provider value={null}>
      <label htmlFor="input-file">
        <div ref={inputRef}>
          <input
            style={{ display: 'none' }}
            id="input-file"
            type="file"
            accept={accept}
            multiple={true}
            onBlur={onBlur}
            name={name}
            ref={ref}
            onChange={handleChanges}
          />
        </div>
        <Button
          // variant="outlined"
          // startIcon={<UploadOutlinedIcon htmlColor={grey[700]} />}
          onClick={() => inputRef.current?.click()}
        >
          <Box sx={{ margin: 'auto' }}>{children}</Box>
        </Button>
      </label>
    </FileUploaderContext.Provider>
  );
};

export const FileUploaderTrans = Object.assign(FileUploaderRoot, { Label });
