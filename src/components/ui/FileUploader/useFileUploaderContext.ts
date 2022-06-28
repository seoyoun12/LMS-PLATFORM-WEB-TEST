import { createContext, useContext } from 'react';

export let FileUploaderContext = createContext<null>(null);
FileUploaderContext.displayName = 'FileUploaderContext';

export function useFileUploaderContext(component: string) {
  let context = useContext(FileUploaderContext);
  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <FileUploader /> component.`);
    if (Error.captureStackTrace) Error.captureStackTrace(err, useFileUploaderContext);
    throw err;
  }
  return context;
}
