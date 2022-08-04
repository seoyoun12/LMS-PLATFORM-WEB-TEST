import { GET } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { S3Files } from 'types/file';

export interface BannerRes {
  createDtime: string;
  endDate: string;
  modifiedDtime: string;
  s3Files: S3Files;
  seq: number;
  startDate: string;
  status: number;
  title: string;
  toUrl: string;
}

export function useBannerList() {
  const { data, error } = useSWR<SWRResponse<BannerRes[]>>('/banner', GET);
  return {
    data: data?.data,
    error,
  };
}

export function useBannerListAdm() {
  const { data, error } = useSWR<SWRResponse<BannerRes[]>>('/banner/adm', GET);
  return {
    data: data?.data,
    error,
  };
}
