import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { S3Files } from 'types/file';
import { ProductStatus } from './course';

export interface banner {
  title: string;
  content: string;
  endDate: string;
  startDate: string;
  status: ProductStatus;
  toUrl: string;
}

export interface BannerRes extends banner {
  createdDtime: string;
  modifiedDtime: string;
  s3Files: S3Files;
  seq: number;
}

export function useBannerList() {
  const { data, error } = useSWR<SWRResponse<BannerRes[]>>('/banner', GET);
  return {
    data: data?.data,
    error,
  };
}

export function useBannerListAdm() {
  const { data, error, mutate } = useSWR<SWRResponse<BannerRes[]>>('/banner/adm', GET);
  return {
    data: data?.data,
    error,
    mutate,
  };
}

export function useSingleBannerAdm(bannerSeq: number) {
  const { data, error, mutate } = useSWR<SWRResponse<BannerRes>>(`/banner/adm/${bannerSeq}`, GET);
  return {
    data: data?.data,
    error,
    mutate,
  };
}

export function getSingleBannerAdm(bannerSeq: number) {
  return GET<{ data: BannerRes }>(`/banner/adm/${bannerSeq}`);
}

export async function createBannerAdm(data: banner) {
  return await POST(`/banner/adm`, data);
}

export async function modifyBannerAdm(bannerSeq: number, data: banner) {
  return await PUT(`banner/adm/${bannerSeq}`, data);
}

export async function removeBannerAdm(bannerSeq: number) {
  return await DELETE(`/banner/adm/${bannerSeq}`);
}
