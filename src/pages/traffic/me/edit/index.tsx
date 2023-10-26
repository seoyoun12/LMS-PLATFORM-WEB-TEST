import Me from '@components/traffic/me/MeLayout'
import { MeEdit } from '@layouts/MeEdit'
import React from 'react'

export default function EditPage() {
  return (
    <Me title="정보수정">
      <MeEdit />
    </Me>
  )
}
