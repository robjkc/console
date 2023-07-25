import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useEnvironmentDeploymentHistory, useFetchEnvironment } from '@qovery/domains/environment'
import { deploymentMock } from '@qovery/shared/factories'
import { DeploymentService } from '@qovery/shared/interfaces'
import { BaseLink } from '@qovery/shared/ui'
import { mergeDeploymentServices } from '@qovery/shared/utils'
import PageDeployments from '../../ui/page-deployments/page-deployments'

export function PageDeploymentsFeature() {
  const { projectId = '', environmentId = '' } = useParams()

  const { data: environment } = useFetchEnvironment(projectId, environmentId)
  const {
    refetch,
    isLoading: loadingStatusDeployments,
    data: environmentDeploymentHistory,
  } = useEnvironmentDeploymentHistory(projectId, environmentId)

  const listHelpfulLinks: BaseLink[] = [
    {
      link: 'https://hub.qovery.com/docs/using-qovery/configuration/environment',
      linkLabel: 'How to manage my environment',
      external: true,
    },
  ]

  useEffect(() => {
    const fetchEnv = () => refetch()

    !environmentDeploymentHistory && fetchEnv()

    const pullDeployments = setInterval(() => refetch(), 2500)

    return () => clearInterval(pullDeployments)
  }, [environmentDeploymentHistory, refetch, environmentId, projectId, environment])

  return (
    <PageDeployments
      deployments={
        !loadingStatusDeployments
          ? environmentDeploymentHistory &&
            (mergeDeploymentServices(environmentDeploymentHistory) as DeploymentService[])
          : (mergeDeploymentServices([deploymentMock]) as DeploymentService[])
      }
      listHelpfulLinks={listHelpfulLinks}
      isLoading={loadingStatusDeployments}
    />
  )
}

export default PageDeploymentsFeature
