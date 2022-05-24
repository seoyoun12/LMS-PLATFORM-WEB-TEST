export interface S3File {
  downloadCnt?: number;
  name?: string;
  path?: string;
  realName?: string;
  seq?: number;
  size?: number;
  type?: 'video/mp4';
}

export interface S3Files extends Array<S3File> {
}
