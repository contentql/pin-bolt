import Error from '../Error'
import Width from '../Width'
import Image from 'next/image'
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
import { trpc } from '@/trpc/client'

interface CountryField {
  name: string
  label?: string | null
  width?: number | null
  required?: boolean | null
  id?: string | null
  blockName?: string | null
  blockType: 'country'
}
const Country: React.FC<
  CountryField & {
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
  width,
  register,
  setValue,
  required: requiredFromProps,
  errors,
}) => {
  const { data: countries, isLoading: isCountriesLoading } =
    trpc?.form?.getAllCountries.useQuery()
  return (
    <Width width={width as number}>
      <div className='flex flex-col gap-1'>
        <label className='block text-sm font-medium capitalize'>{label}</label>

        <Select onValueChange={value => setValue(name, value)}>
          <SelectTrigger className='w-full flex-shrink-0'>
            <SelectValue
              {...register(name, { required: requiredFromProps as boolean })}
              placeholder={isCountriesLoading ? 'Loading...' : 'Select country'}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Options</SelectLabel>
              {countries?.flatMap((country: any, index: number) => (
                <SelectItem
                  key={index}
                  value={country?.name}
                  className='capitalize'>
                  <div className='flex items-center gap-x-2'>
                    <Image src={country?.flag} alt='' width={28} height={14} />
                    <p>{country?.name}</p>
                  </div>
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
export default Country
