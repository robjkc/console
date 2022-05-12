import { useDocumentTitle } from '@console/shared/utils'
import { Container } from '@console/pages/applications/ui'
import { useParams } from 'react-router'
import { selectApplicationsEntitiesByEnvId } from '@console/domains/application'
import { useSelector } from 'react-redux'
import { useEnvironments } from '@console/domains/projects'
import { selectEnvironmentById } from '@console/domains/environment'
import { RootState } from '@console/shared/interfaces'
import { Application, Environment } from 'qovery-typescript-axios'

export function ApplicationsPage() {
  useDocumentTitle('Applications - Qovery')
  const { environmentId = '', projectId } = useParams()
  const { getEnvironmentsStatus } = useEnvironments()
  const environment = useSelector<RootState, Environment | undefined>((state) =>
    selectEnvironmentById(state, environmentId)
  )
  const applicationsByEnv = useSelector<RootState, Application[]>((state: RootState) =>
    selectApplicationsEntitiesByEnvId(state, environmentId)
  )

  // useEffect(() => {
  //   setTimeout(() => {
  //     projectId && getEnvironmentsStatus(projectId)
  //   })
  // }, [projectId, environmentId, getEnvironmentsStatus])

  return <Container applications={applicationsByEnv} environment={environment} />
}

export default ApplicationsPage
