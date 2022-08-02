import useSWR, {SWRResponse} from "swr";
import {GET} from "@common/httpClient";
import {UserMyinfoCertificatesResponseDto} from "@common/api/types/data-contracts";

export function useGetUserMyinfoCertificates () {
  const { data, mutate, error } = useSWR<SWRResponse<UserMyinfoCertificatesResponseDto>>(
    "/user/myinfo/certificates",
    GET
  );

  return {
    certificateList: data,
    mutate,
    error,
  }
}
