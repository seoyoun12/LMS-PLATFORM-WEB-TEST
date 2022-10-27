import { GET } from "@common/httpClient"
import { TermsResponseDto } from "./Api";

export function getTerms({termType } : 
  {termType : 'CONDITIONS_TERMS' | 'PERSONAL_INFORMATION_TERMS' | 'LOCATION_BASED_TERMS'
}) {
  return GET<{data: TermsResponseDto}>('/terms', {params : {termType}});
}
