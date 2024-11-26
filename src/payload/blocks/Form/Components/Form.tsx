'use client'

import { Form as FormType } from '@payload-types'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Button from '@/components/common/Button'
import { trpc } from '@/trpc/client'

import { fieldsJsx } from './Fields'

const Form = ({
  form,
  className = '',
}: {
  form: FormType
  className?: string
}) => {
  const router = useRouter()
  const {
    fields,
    confirmationType,
    redirect,
    confirmationMessage,
    submitButtonLabel,
    id,
  } = form

  const buildInitialFormState = () => {
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
    defaultValues: buildInitialFormState(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
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
        reset()
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
    <form
      id={id.toString()}
      onSubmit={handleSubmit(onsubmit)}
      className={className}>
      <div className='flex w-full flex-wrap gap-4 sm:gap-6'>
        {fields &&
          fields?.map((field, index) => {
            const Field: React.FC<any> = fieldsJsx[field?.blockType]
            if (Field) {
              return (
                <React.Fragment key={index}>
                  <Field
                    form={form}
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

      <Button
        type='submit'
        className='mt-8'
        isLoading={isFormSubmissionPending}
        disabled={isFormSubmissionPending}>
        {submitButtonLabel ? submitButtonLabel : 'Submit'}
      </Button>
    </form>
  )
}

export default Form
