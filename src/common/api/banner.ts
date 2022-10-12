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
  bannerTypeEnums: BannerTypeEnums;
}

export interface BannerRes extends banner {
  createdDtime: string;
  modifiedDtime: string;
  s3Files: S3Files;
  seq: number;
}
export enum BannerTypeEnums {
  BANNER_TYPE_TRANSPORT_WORKER ='BANNER_TYPE_TRANSPORT_WORKER', // 운수종사자
  BANNER_TYPE_LOW_FLOOR_BUS ='BANNER_TYPE_LOW_FLOOR_BUS', // 저상버스
  BANNER_TYPE_PROVINCIAL ='BANNER_TYPE_PROVINCIAL', // 도민교통
}

export const bannerTypeEnums = [
  { type: BannerTypeEnums.BANNER_TYPE_TRANSPORT_WORKER, ko: '운수종사자' },
  { type: BannerTypeEnums.BANNER_TYPE_LOW_FLOOR_BUS, ko: '저상버스' },
  { type: BannerTypeEnums.BANNER_TYPE_PROVINCIAL, ko: '도민교통' },
];


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
