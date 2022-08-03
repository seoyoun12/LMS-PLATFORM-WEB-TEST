import useSWR, {SWRResponse} from "swr";
import {GET} from "@common/httpClient";
import {UserMyinfoCertificatesResponseDto} from "@common/api/types/Api";

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
