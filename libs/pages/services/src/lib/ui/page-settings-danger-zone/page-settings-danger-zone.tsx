import { type Environment } from 'qovery-typescript-axios'
import { BlockContentDelete, HelpSection } from '@qovery/shared/ui'

export interface PageSettingsDangerZoneProps {
  deleteEnvironment: () => void
  environment?: Environment
}

export function PageSettingsDangerZone(props: PageSettingsDangerZoneProps) {
  const { deleteEnvironment, environment } = props

  return (
    <div className="flex flex-col justify-between w-full">
      <div className="p-8 max-w-content-with-navigation-left">
        <BlockContentDelete
          title="Delete Environment"
          list={[
            {
              text: 'Databases',
            },
            {
              text: 'Applications',
            },
          ]}
          ctaLabel="Delete environment"
          callback={deleteEnvironment}
          modalConfirmation={{
            mode: environment?.mode,
            title: 'Delete environment',
            name: environment?.name,
          }}
        />
      </div>
      <HelpSection
        description="Need help? You may find these links useful"
        links={[
          {
            link: 'https://hub.qovery.com/docs/using-qovery/configuration/environment/#delete-an-environment',
            linkLabel: 'How to delete my environment',
            external: true,
          },
        ]}
      />
    </div>
  )
}

export default PageSettingsDangerZone
