// Ref: https://stackoverflow.com/questions/27159179/how-to-convert-blob-to-file-in-javascript
export const convertBlobToFile = ({ blob, fileName }: { blob: Blob; fileName: string }): File => {
  const newBlob: any = blob;
  newBlob.lastModifiedDate = new Date();
  newBlob.name = fileName;
  return newBlob as File;
};
