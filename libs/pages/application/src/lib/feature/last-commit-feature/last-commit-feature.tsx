import { type Commit } from 'qovery-typescript-axios'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getApplicationsState, getCountNewCommitsToDeploy } from '@qovery/domains/application'
import { isJob } from '@qovery/shared/enums'
import { type ApplicationEntity, type LoadingStatus } from '@qovery/shared/interfaces'
import { type RootState } from '@qovery/state/store'
import LastCommit from '../../ui/last-commit/last-commit'

export function LastCommitFeature() {
  const { applicationId = '' } = useParams()
  const commitDeltaCount = useSelector(getCountNewCommitsToDeploy(applicationId))
  const application = useSelector<RootState, ApplicationEntity | undefined>(
    (state) => getApplicationsState(state).entities[applicationId]
  )

  const getCommitById = (commits?: Commit[]) => {
    const deployedCommitId = isJob(application)
      ? application?.source?.docker?.git_repository?.deployed_commit_id
      : application?.git_repository?.deployed_commit_id

    const deployedCommit = commits?.find((commit) => commit.git_commit_id === deployedCommitId)

    if (deployedCommit) {
      return deployedCommit
    } else {
      return isJob(application) ? application?.source?.docker?.git_repository : application?.git_repository
    }
  }

  const loadingStatus = (): LoadingStatus => {
    if (!application) {
      return 'loading'
    }
    if (isJob(application)) {
      return 'loaded'
    }
    return application?.commits?.loadingStatus
  }

  return (
    <LastCommit
      commit={getCommitById(application?.commits?.items)}
      loadingStatus={loadingStatus()}
      commitDeltaCount={commitDeltaCount}
    />
  )
}

export default LastCommitFeature
