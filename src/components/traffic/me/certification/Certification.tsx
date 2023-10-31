import { useGetUserMyinfoCertificates } from '@common/api/user/myinfo/certificates';
import React from 'react'

export default function Certification() {
  const { certificateList, error, mutate} = useGetUserMyinfoCertificates();
  return (
    <div>Certification</div>
  )
}
