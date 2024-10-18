import Error from '../Error'
import Width from '../Width'
import {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/common/Select'

interface SelectField {
  name: string
  label?: string | null
  width?: number | null
  defaultValue?: string | null
  options?:
    | {
        label: string
        value: string
        id?: string | null
      }[]
    | null
  required?: boolean | null
  id?: string | null
  blockName?: string | null
  blockType: 'select'
}

const SelectField: React.FC<
  SelectField & {
    setValue: UseFormSetValue<any>
    register: UseFormRegister<FieldValues & any>
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
  }
> = ({
  name,
  label,
  options,
  defaultValue,
  width,
  register,
  setValue,
  required: requiredFromProps,
  errors,
}) => {
  return (
    <Width width={width as number}>
      <div className='flex flex-col gap-1'>
        <label className='block text-sm font-medium capitalize'>{label}</label>

        <Select onValueChange={value => setValue(name, value)}>
          <SelectTrigger className='w-full flex-shrink-0'>
            <SelectValue
              {...register(name, { required: requiredFromProps as boolean })}
              placeholder={defaultValue || 'Select'}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Options</SelectLabel>
              {options?.map((option, index) => (
                <SelectItem
                  key={index}
                  value={option?.value}
                  className='capitalize'>
                  {option?.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {requiredFromProps && errors[name] && (
          <Error error={errors[name]} label={label!} />
        )}
      </div>
    </Width>
  )
}
export default SelectField
