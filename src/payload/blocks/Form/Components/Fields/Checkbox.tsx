import Width from '../Width'
import {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

import { Checkbox } from '@/components/common/Checkbox'

interface CheckboxField {
  name: string
  label?: string | null
  width?: number | null
  required?: boolean | null
  defaultValue?: boolean | null
  id?: string | null
  blockName?: string | null
  blockType: 'checkbox'
}

const CheckboxField: React.FC<
  CheckboxField & {
    register: UseFormRegister<FieldValues & any>
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    setValue: UseFormSetValue<FieldValues>
    watch: UseFormWatch<FieldValues>
  }
> = ({
  name,
  defaultValue,
  label,
  width,
  register,
  required: requiredFromProps,
  errors,
  setValue,
  watch,
}) => {
  // Watch the checkbox value
  const checkedValue = watch(name, defaultValue || false)

  return (
    <Width width={width as number}>
      <div className='flex flex-row items-center gap-2 text-start'>
        <Checkbox
          id={label ?? ''}
          {...register(name, { required: requiredFromProps as boolean })}
          checked={checkedValue}
          onCheckedChange={(checked: boolean) => setValue(name, checked)}
        />
        <label
          className='text-md text-neutral-content/60'
          htmlFor={label ?? ''}>
          {label}
        </label>
      </div>
      {requiredFromProps && errors[name] && (
        <p className=' text-md mt-2 text-red-500'>
          {errors[name]?.type as any}
        </p>
      )}
    </Width>
  )
}
export default CheckboxField
