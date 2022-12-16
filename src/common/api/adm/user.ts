import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { PaginationResult } from 'types/fetch';
import { authoritiesType, regCategoryType, User, UserInput } from '@common/api/user';
import { RoleType } from 'src/staticDataDescElements/staticType';

export function userList({ page, elementCnt, roleType, keyword }: {
  page: number,
  elementCnt?: number,
  roleType?: RoleType | string,
  // roleType: string ,
  keyword: string
}) {
  const { data, error, mutate } = useSWR<SWRResponse<PaginationResult<User[]>>>([
    `/user/adm`, {
      params: { page, elementCnt, roleType, keyword }
    }
  ], GET);

  return {
    data: data?.data,
    error,
    mutate
  };
}

// export async function modifyUser(userInput: UserInput) {
//   return await PUT(`/user/adm/${userInput.seq}`, userInput);
// }

export async function modifyUser({ seq, userInput} : {
  seq: number,
  userInput: UserInput,
}) {
  return await PUT(`/user/adm/${seq}`, userInput);
}

export async function removeUser(seq: number) {
  return await DELETE(`/user/adm/${seq}`);
}

export function useUser(userSeq: number | null) {
  const { data, error } = useSWR<SWRResponse<User>>(userSeq ? `/user/adm/${userSeq}` : null, GET);
  return {
    user: data?.data,
    userError: error,
  };
}