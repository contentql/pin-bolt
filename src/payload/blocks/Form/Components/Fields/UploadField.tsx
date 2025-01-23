import Error from '../Error'
import Width from '../Width'
import { File, Upload } from 'lucide-react'
import { useRef } from 'react'
import {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import { toast } from 'sonner'

import Button from '@/components/common/Button'
import { Input } from '@/components/common/Input'

interface TextField {
  name: string
  label?: string | null
  width?: number | null
  size: number
  required?: boolean | null
  id?: string | null
  blockName?: string | null
  multiple: boolean
  blockType: 'text'
}

const UploadField: React.FC<
  TextField & {
    register: UseFormRegister<FieldValues & any>
    setValue: UseFormSetValue<Record<string, any>>
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
  }
> = ({
  name,
  label,
  width,
  multiple,
  register,
  errors,
  size,
  setValue,
  required,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { setError, clearErrors, getValues } = useFormContext()
  const addedFields = useWatch({ name }) as File[] | null | []

  return (
    <Width width={width as number}>
      <div className='flex flex-col gap-1'>
        <div className='relative w-max'>
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              inputRef.current?.click()
            }}>
            <Upload size={20} className='mr-2' />

            {`Upload ${label}`}
          </Button>

          <p className='mt-1 text-sm'>Max. file size: {size}MB</p>

          <Input
            ref={inputRef}
            aria-label='Upload file'
            className='absolute left-0 top-0 hidden w-full'
            id={label ?? ''}
            type='file'
            accept='image/*,application/*,text/*'
            multiple={multiple}
            // Adding required as true when required = true and when there are no files added
            required={!!required && !addedFields}
            onChange={e => {
              const files = e.target.files || []
              const existingFiles = getValues(
                name,
              ) as unknown as FileList | null

              // if no files are selected in onChange & there are few files already selected skipping the state update
              if ((files === null || !files.length) && existingFiles) {
                return
              }

              // handling multiple file validation
              if (multiple) {
                const filesClone = [...files]
                const filteredFiles: File[] = []

                filesClone.forEach(file => {
                  const isValidSize = file.size <= size * 1024 * 1024
                  if (isValidSize) {
                    filteredFiles.push(file)
                  } else {
                    toast.error(`File size can't be larger than ${size}MB`)
                  }
                })

                setValue(name, filteredFiles)
              }
              // handling single file validation
              else {
                const singleFile = files?.[0]

                if (!singleFile) {
                  return setValue(name, null, { shouldValidate: true })
                }

                const isValidSize = singleFile.size <= size * 1024 * 1024

                if (isValidSize) {
                  setValue(name, [singleFile], { shouldValidate: true })
                  clearErrors(name)
                } else {
                  setValue(name, [], { shouldValidate: true })

                  setError(name, {
                    message: `File size can't be larger than ${size}MB`,
                  })
                }
              }
            }}
          />
        </div>

        {required && errors[name] && (
          <Error error={errors[name]} label={label!} />
        )}

        {addedFields ? (
          <div className='my-2 space-y-1'>
            {addedFields.map(file => (
              <div
                key={file.name}
                className='flex items-center gap-2 text-sm text-secondary'>
                <File size={16} />
                {file.name}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Width>
  )
}

export default UploadField
