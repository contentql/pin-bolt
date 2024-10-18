import Error from '../Error'
import Width from '../Width'
import { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/common/Input'

interface TextField {
  name: string
  label?: string | null
  width?: number | null
  defaultValue?: string | null
  required?: boolean | null
  id?: string | null
  blockName?: string | null
  blockType: 'text'
}
const Text: React.FC<
  TextField & {
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
      <div className='flex flex-col gap-1'>
        <label
          className='block text-sm font-medium capitalize'
          htmlFor={label ?? ''}>
          {label}
        </label>

        <Input
          type='text'
          id={label ?? ''}
          {...register(name, { required: requiredFromProps as boolean })}
        />
        {requiredFromProps && errors[name] && (
          <Error error={errors[name]} label={label!} />
        )}
      </div>
    </Width>
  )
}
export default Text
