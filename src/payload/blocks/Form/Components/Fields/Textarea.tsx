import Error from '../Error'
import Width from '../Width'
import { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Textarea } from '@/components/common/Textarea'

interface TextareaField {
  name: string
  label?: string | null
  width?: number | null
  defaultValue?: string | null
  required?: boolean | null
  id?: string | null
  blockName?: string | null
  blockType: 'textarea'
}
const TextArea: React.FC<
  TextareaField & {
    register: UseFormRegister<FieldValues & any>
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
  }
> = ({ name, label, width, register, required: requiredFromProps, errors }) => {
  return (
    <Width width={width as number}>
      <div className='flex flex-col gap-2'>
        <label className='text-md text-neutral-content/60 font-semibold capitalize'>
          {label}
        </label>
        <Textarea
          {...register(name, { required: requiredFromProps as boolean })}
        />
        {requiredFromProps && errors[name] && (
          <Error error={errors[name]} label={label!} />
        )}
      </div>
    </Width>
  )
}
export default TextArea
