import { type CompanySizeEnum } from 'qovery-typescript-axios'
import { type Dispatch, type SetStateAction } from 'react'
import { type Control, Controller } from 'react-hook-form'
import { type Value } from '@qovery/shared/interfaces'
import { Button, ButtonSize, ButtonStyle, InputSelect, InputText } from '@qovery/shared/ui'

export interface StepCompanyProps {
  dataSize: Array<Value>
  dataRole: Array<Value>
  onSubmit: () => void
  control: Control<{
    company_name?: string
    company_size?: CompanySizeEnum
    user_role?: string
  }>
  setStepCompany: Dispatch<SetStateAction<boolean>>
}

export function StepCompany(props: StepCompanyProps) {
  const { dataSize, dataRole, onSubmit, control, setStepCompany } = props

  return (
    <div className="pb-10">
      <h1 className="h3 text-neutral-400 mb-3">About your company</h1>
      <p className="text-sm mb-10 text-neutral-400">We need some information to proceed with your account creation.</p>
      <form onSubmit={onSubmit}>
        <Controller
          name="company_name"
          control={control}
          rules={{ required: 'Please enter your company name.' }}
          render={({ field, fieldState: { error } }) => (
            <InputText
              className="mb-3"
              label="Company"
              name={field.name}
              onChange={field.onChange}
              value={field.value}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="company_size"
          control={control}
          rules={{ required: 'Please enter your company size.' }}
          render={({ field, fieldState: { error } }) => (
            <InputSelect
              className="mb-3"
              label="Company size"
              options={dataSize}
              onChange={field.onChange}
              value={field.value}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="user_role"
          control={control}
          rules={{ required: 'Please enter your role.' }}
          render={({ field, fieldState: { error } }) => (
            <InputSelect
              className="mb-3"
              label="Role"
              options={dataRole}
              onChange={field.onChange}
              value={field.value}
              error={error?.message}
            />
          )}
        />
        <div className="mt-10 pt-5 flex justify-between border-t border-neutral-200">
          <Button
            onClick={() => setStepCompany(false)}
            size={ButtonSize.XLARGE}
            style={ButtonStyle.STROKED}
            iconLeft="icon-solid-arrow-left"
          >
            Back
          </Button>
          <Button size={ButtonSize.XLARGE} style={ButtonStyle.BASIC} type="submit">
            Continue
          </Button>
        </div>
      </form>
    </div>
  )
}

export default StepCompany
