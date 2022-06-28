interface ReturnType {
  file: Blob,
  fileName: string | undefined
}

export const setFileConfig: (files: File[]) => ReturnType = (files) => {
  const file = !!files?.length ? files[0] : new Blob([]);
  const fileName = !!files?.length ? files[0].name : undefined;

  return {
    file,
    fileName
  };
};
