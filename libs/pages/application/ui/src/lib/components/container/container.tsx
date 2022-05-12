import { IconEnum } from '@console/shared/enums'
import {
  Button,
  ButtonIcon,
  ButtonIconStyle,
  ButtonSize,
  ButtonStyle,
  Header,
  Icon,
  Skeleton,
  StatusChip,
  StatusMenu,
  Tabs,
  Tag,
  TagMode,
} from '@console/shared/ui'
import { APPLICATION_URL } from '@console/shared/utils'
import { Environment, GlobalDeploymentStatus } from 'qovery-typescript-axios'
import { useLocation, useParams } from 'react-router'
import { ApplicationEntity } from '@console/shared/interfaces'

export interface ContainerProps {
  application?: ApplicationEntity
  environment?: Environment
}

export function Container(props: ContainerProps) {
  const { application, environment } = props
  const { organizationId, projectId, environmentId, applicationId } = useParams()
  const location = useLocation()

  const copyContent = `Organization ID: ${organizationId}\nProject ID: ${projectId}\nEnvironment ID: ${environmentId}\nService ID: ${applicationId}`

  const headerButtons = (
    <div className="hidden">
      <ButtonIcon icon="icon-solid-terminal" style={ButtonIconStyle.STROKED} />
      <ButtonIcon icon="icon-solid-scroll" style={ButtonIconStyle.STROKED} />
      <ButtonIcon icon="icon-solid-clock-rotate-left" style={ButtonIconStyle.STROKED} />
      <Button iconRight="icon-solid-link" style={ButtonStyle.STROKED} size={ButtonSize.SMALL}>
        Open links
      </Button>
    </div>
  )

  const headerActions = (
    <>
      <Skeleton width={150} height={24} show={!application?.status}>
        <StatusMenu status={application?.status ? application?.status.state : GlobalDeploymentStatus.RUNNING} />
      </Skeleton>
      {environment && (
        <Skeleton width={80} height={24} show={!environment?.mode}>
          <TagMode status={environment?.mode} />
        </Skeleton>
      )}
      <Skeleton width={100} height={24} show={!environment?.cloud_provider}>
        <div className="border border-element-light-lighter-400 bg-white h-6 px-2 rounded text-xs items-center inline-flex font-medium gap-2">
          <Icon name={environment?.cloud_provider.provider as IconEnum} width="16" />
          <p className="max-w-[54px] truncate">{environment?.cloud_provider.cluster}</p>
        </div>
      </Skeleton>
      <Tag className="bg-element-light-lighter-300 gap-2 hidden">
        <span className="w-2 h-2 rounded-lg bg-progressing-300"></span>
        <span className="w-2 h-2 rounded-lg bg-accent3-500"></span>
      </Tag>
    </>
  )

  const tabsItems = [
    {
      icon: (
        <Skeleton width={16} height={16} rounded show={application?.status ? false : true}>
          <StatusChip status={application?.status && application?.status.state} />
        </Skeleton>
      ),
      name: 'Overview',
      active: location.pathname === APPLICATION_URL(organizationId, projectId, environmentId, applicationId),
      link: APPLICATION_URL(organizationId, projectId, environmentId, applicationId),
    },
  ]

  return (
    <div>
      <Header
        title={application?.name}
        icon={IconEnum.APPLICATION}
        buttons={headerButtons}
        copyTitle
        copyContent={copyContent}
        actions={headerActions}
      />
      <Tabs items={tabsItems} />
    </div>
  )
}

export default Container
