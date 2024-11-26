'use client'

import { Params } from '../types'
import { FormType } from '@payload-types'
import React from 'react'

import FormComponent from './Components/Form'

interface FormProps extends FormType {
  params: Params
}
const FormBlock: React.FC<FormProps> = ({ params, ...block }) => {
  const form =
    block?.form?.value && typeof block?.form?.value === 'object'
      ? block?.form?.value
      : undefined

  return (
    <section className='max-w-3xl'>
      <h4 className='mb-8 text-lg font-semibold'>{block?.title}</h4>
      {form ? <FormComponent form={form} /> : null}
    </section>
  )
}

export default FormBlock
