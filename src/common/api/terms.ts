import { GET } from "@common/httpClient"

export function getTerms({termType } : 
  {termType : 'CONDITIONS_TERMS' | 'PERSONAL_INFORMATION_TERMS' | 'LOCATION_BASED_TERMS'
}) {
  return GET('/terms', {params : {termType}});
}
