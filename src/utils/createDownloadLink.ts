

const createDownloadLink = (url: string, downloadName: string) => {
  const a = document.createElement('a');
      a.href = url;
      a.download = downloadName;
      a.click();
      a.remove();
}


export default createDownloadLink