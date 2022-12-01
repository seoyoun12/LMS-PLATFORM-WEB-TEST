import useSWR, { SWRResponse } from "swr";
import { PaginationResult } from "types/fetch";
import { S3Files } from "types/file";
import { ProductStatus } from "./course";
import { GET, POST, PUT, DELETE } from "@common/httpClient";
import { LearningMaterialResponseDto } from "@common/api/Api";

export enum MaterialType {
  TYPE_BY_AGE = "TYPE_BY_AGE",
  TYPE_EDUCATIONAL = "TYPE_EDUCATIONAL",
  TYPE_VIDEO = "TYPE_VIDEO",
  TYPE_OTHER_ORGAN = "TYPE_OTHER_ORGAN",
  TYPE_MEDIA = 'TYPE_MEDIA',
}

export enum MaterialSubType {
  TYPE_CHILDREN = "TYPE_CHILDREN",
  TYPE_TEENAGER = "TYPE_TEENAGER",
  TYPE_ELDERLY = "TYPE_ELDERLY",
  TYPE_SELF_DRIVING = "TYPE_SELF_DRIVING",
}

// LearningMaterial Interface
export interface LearningMaterial {
  materialType: MaterialType;
  materialSubType: MaterialSubType;
  seq: number;
  title: string;
  content: string;
  createdDtime: string;
  modifiedDtime: string;
  origin: string;
  s3Files: S3Files;
  status: ProductStatus;
}

// LearningMaterialInput Interface
export type LearningMaterialInput = Partial<LearningMaterial>;

// [관리자] 학습자료 전체 조회
export function learningMaterialList({
  page,
  elementCnt,
  materialType,
  materialSubType,
}: {
  page: number;
  elementCnt?: number;
  materialType?: string;
  materialSubType?: string;
}) {
  const { data, error, mutate } = useSWR<
    SWRResponse<PaginationResult<LearningMaterial[]>>
  >(
    [
      `/learning-material/adm`,
      {
        params: { page, elementCnt, materialType, materialSubType },
      },
    ],
    GET
  );
  return {
    data: data?.data,
    error,
    mutate,
  };
}

// [관리자] 학습 자료 단건 조회
export function learningMaterialDetail(seq: number | null) {
  const { data, error, mutate } = useSWR<SWRResponse<LearningMaterial>>(
    seq ? `/learning-material/adm/${seq}` : null,
    GET
  );
  return {
    data: data?.data,
    error,
    mutate,
  };
}

// [관리자] 학습 자료 생성
export async function learningMaterialUpload(
  learningMaterialInput: LearningMaterialInput
) {
  return await POST(`/learning-material/adm`, learningMaterialInput);
}

// [관리자] 학습 자료 수정
export async function learningMaterialModify({
  seq,
  learningMaterialInput,
}: {
  seq: number;
  learningMaterialInput: LearningMaterialInput;
}) {
  return await PUT(`/learning-material/adm/${seq}`, learningMaterialInput);
}

// [관리자] 학습 자료 삭제
export async function learningMaterialRemove(seq: number) {
  return await DELETE(`/learning-material/adm/${seq}`);
}

export function useGetLearningMaterial(
  materialType: MaterialType,
  materialSubType: MaterialSubType | ""
) {
  const data = useSWR<SWRResponse<LearningMaterialResponseDto[]>>(
    [
      `/learning-material`,
      {
        params: {
          materialType,
          materialSubType,
        },
      },
    ],
    GET
  );

  return data;
}

export function useGetLearningMaterialDetail(
  learningMaterialSeq: number | string
) {
  const data = useSWR<SWRResponse<LearningMaterialResponseDto>>(
    [`/learning-material/${learningMaterialSeq}`],
    GET
  );

  return data;
}
