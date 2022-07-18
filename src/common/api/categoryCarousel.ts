import useSWR, { SWRResponse } from "swr";
import { S3Files } from "types/file";
import { GET, POST, PUT, DELETE } from "@common/httpClient";

export interface CategoryCarousel {
  createdDtime: string;
  endDate: string;
  modifiedDtime: string;
  s3Files: S3Files;
  seq: number;
  startDate: string;
  status: number;
  title: string;
  toUrl: string;
}

export function categoryBoardCarouselList() {
  
  const { data, error } = useSWR<SWRResponse<CategoryCarousel[]>>([
    `/banner`
  ], GET);

  return {

    data: data?.data,
    error

  }

}