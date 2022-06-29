import { createContext, useContext } from 'react';

export const FileUploaderContext = createContext<null>(null);
FileUploaderContext.displayName = 'FileUploaderContext';

export function useFileUploaderContext(component: string) {
  const context = useContext(FileUploaderContext);
  if (context === null) {
    const err = new Error(`<${component} /> is missing a parent <FileUploader /> component.`);
    if (Error.captureStackTrace) Error.captureStackTrace(err, useFileUploaderContext);
    throw err;
  }
  return context;
}
