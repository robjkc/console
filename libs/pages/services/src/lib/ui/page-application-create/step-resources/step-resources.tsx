import { type EnvironmentModeEnum } from 'qovery-typescript-axios'
import { type FormEventHandler } from 'react'
import { useFormContext } from 'react-hook-form'
import { ApplicationSettingsResources } from '@qovery/shared/console-shared'
import { type ApplicationResourcesData } from '@qovery/shared/interfaces'
import { Button, ButtonSize, ButtonStyle } from '@qovery/shared/ui'

export interface StepResourcesProps {
  onBack: () => void
  onSubmit: FormEventHandler<HTMLFormElement>
  maximumInstances?: number
  environmentMode?: EnvironmentModeEnum
}

export function StepResources({ maximumInstances, onSubmit, onBack, environmentMode }: StepResourcesProps) {
  const { formState } = useFormContext<ApplicationResourcesData>()

  return (
    <>
      <div className="mb-10">
        <h3 className="text-neutral-400 text-lg mb-2">Set resources</h3>
      </div>

      <form onSubmit={onSubmit}>
        <ApplicationSettingsResources
          maxInstances={maximumInstances}
          displayWarningCpu={false}
          environmentMode={environmentMode}
        />

        <div className="flex justify-between">
          <Button
            onClick={onBack}
            className="btn--no-min-w"
            type="button"
            size={ButtonSize.XLARGE}
            style={ButtonStyle.STROKED}
          >
            Back
          </Button>
          <Button
            dataTestId="button-submit"
            type="submit"
            disabled={!formState.isValid}
            size={ButtonSize.XLARGE}
            style={ButtonStyle.BASIC}
          >
            Continue
          </Button>
        </div>
      </form>
    </>
  )
}

export default StepResources
