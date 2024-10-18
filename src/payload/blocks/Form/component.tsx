'use client'

import { Params } from '../types'
import { Form, FormType } from '@payload-types'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Button from '@/components/common/Button'
import { trpc } from '@/trpc/client'

import { fieldsJsx } from './Components/Fields'

interface FormProps extends FormType {
  params: Params
}
const FormBlock: React.FC<FormProps> = ({ params, ...block }) => {
  const router = useRouter()
  const {
    title,
    fields,
    emails,
    redirect,
    id,
    confirmationMessage,
    submitButtonLabel,
    confirmationType,
  } = block?.form?.value as Form

  const buildInitialFormState = (fields: Form['fields']) => {
    return fields?.reduce(
      (acc, field) => {
        if ('name' in field && field.name) {
          // Handle fields that have a 'name' property
          switch (field.blockType) {
            case 'checkbox':
              acc[field.name] = field?.defaultValue || false
              break
            case 'number':
              acc[field.name] = field.defaultValue || null
              break
            case 'text':
            case 'textarea':
              acc[field?.name] = field.defaultValue || ''
              break
            case 'select':
            case 'country':
              acc[field.name] = ''
              break
            case 'email':
              acc[field.name] = ''
              break
            default:
              acc[field] = ''
              break
          }
        } else if (field.blockType === 'message') {
          acc['message'] = field.message || ''
        }
        return acc
      },
      {} as Record<string, any>,
    )
  }

  const formMethod = useForm({
    defaultValues: buildInitialFormState((block?.form?.value as Form).fields),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = formMethod

  const { mutate: newFormSubmit, isPending: isFormSubmissionPending } =
    trpc?.form?.newFormSubmission?.useMutation({
      onSuccess: () => {
        if (confirmationType === 'redirect' && redirect) {
          const { url } = redirect
          const redirectUrl = url
          if (redirectUrl) router.push(redirectUrl)
        } else if (confirmationType === 'message' && confirmationMessage)
          toast.success('Form successfully submitted')
      },
      onError: () => {
        toast.error('Failed to submit Form, try again.')
      },
    })
  const onsubmit = (data: any) => {
    const dataToSend = Object.entries(data)

      .map(([name, value]) => ({
        field: name,
        value: value !== undefined && value !== null ? value.toString() : '',
      }))
    newFormSubmit({ id: id, data: dataToSend })
  }

  return (
    <div className='mx-auto max-w-5xl'>
      <h4 className='mb-8 text-lg font-semibold'>{block?.title}</h4>
      <form id={block?.id!} onSubmit={handleSubmit(onsubmit)}>
        <div className='flex w-full flex-grow flex-wrap gap-4'>
          {block &&
            fields &&
            fields?.map((field, index) => {
              const Field: React.FC<any> = fieldsJsx[field?.blockType]
              if (Field) {
                return (
                  <React.Fragment key={index}>
                    <Field
                      form={block?.form}
                      {...field}
                      {...formMethod}
                      register={register}
                      errors={errors}
                      setValue={setValue}
                      control={control}
                    />
                  </React.Fragment>
                )
              }
            })}
        </div>
        <div className='mt-8 flex justify-end'>
          <Button
            type='submit'
            isLoading={isFormSubmissionPending}
            disabled={isFormSubmissionPending}>
            {submitButtonLabel ? submitButtonLabel : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default FormBlock
