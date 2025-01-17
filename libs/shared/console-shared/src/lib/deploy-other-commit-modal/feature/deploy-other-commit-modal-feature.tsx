import { type Commit } from 'qovery-typescript-axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  fetchApplicationCommits,
  getCommitsGroupedByDate,
  postApplicationActionsDeployByCommitId,
  selectApplicationById,
} from '@qovery/domains/application'
import { getServiceType } from '@qovery/shared/enums'
import { type ApplicationEntity } from '@qovery/shared/interfaces'
import { DEPLOYMENT_LOGS_URL, ENVIRONMENT_LOGS_URL } from '@qovery/shared/routes'
import { useModal } from '@qovery/shared/ui'
import { type AppDispatch, type RootState } from '@qovery/state/store'
import DeployOtherCommitModal from '../ui/deploy-other-commit-modal'

export interface DeployOtherCommitModalFeatureProps {
  organizationId: string
  projectId: string
  environmentId: string
  applicationId: string
}

export function DeployOtherCommitModalFeature({
  organizationId,
  projectId,
  environmentId,
  applicationId,
}: DeployOtherCommitModalFeatureProps) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { closeModal } = useModal()

  const [selectedCommitId, setSelectedCommitId] = useState<string | null>(null)
  const [deployLoading, setDeployLoading] = useState(false)
  const [search, setSearch] = useState('')

  const commitsByDay = useSelector<RootState, Record<string, Commit[]>>((state) =>
    getCommitsGroupedByDate(state, applicationId)
  )

  const [commitsByDayFiltered, setCommitsByDayFiltered] = useState<Record<string, Commit[]>>({})

  const application = useSelector<RootState, ApplicationEntity | undefined>((state) =>
    selectApplicationById(state, applicationId)
  )
  const isLoading = application?.commits?.loadingStatus

  const buttonDisabled = () => {
    return selectedCommitId === null || selectedCommitId === application?.git_repository?.deployed_commit_id
  }

  useEffect(() => {
    if (application && (!application?.commits || application?.commits?.loadingStatus === 'not loaded')) {
      dispatch(fetchApplicationCommits({ applicationId, serviceType: getServiceType(application) }))
    }
  }, [application, applicationId, dispatch])

  const handleDeploy = () => {
    if (selectedCommitId && application) {
      setDeployLoading(true)
      dispatch(
        postApplicationActionsDeployByCommitId({
          applicationId,
          git_commit_id: selectedCommitId,
          environmentId: environmentId,
          serviceType: getServiceType(application),
          callback: () =>
            navigate(
              ENVIRONMENT_LOGS_URL(organizationId, projectId, environmentId) + DEPLOYMENT_LOGS_URL(applicationId)
            ),
        })
      ).then(() => {
        closeModal()
      })
    }
  }

  const onSearch = (search: string) => {
    setSearch(search)
    setCommitsByDayFiltered(filterCommits(search))
  }

  const filterCommits = (search: string): Record<string, Commit[]> => {
    // for all commits in commitsByDay if commit message or commit id contains search string then add to filtered commits by day
    const filteredCommitsByDay: Record<string, Commit[]> = {}
    Object.keys(commitsByDay).forEach((date) => {
      const filteredCommits = commitsByDay[date].filter((commit) => {
        return (
          commit.message.toLowerCase().includes(search.toLowerCase()) ||
          commit.git_commit_id.toLowerCase().includes(search.toLowerCase())
        )
      })
      if (filteredCommits.length > 0) {
        filteredCommitsByDay[date] = filteredCommits
      }
    })
    return filteredCommitsByDay
  }

  return (
    <DeployOtherCommitModal
      commitsByDay={search.length ? commitsByDayFiltered : commitsByDay}
      isLoading={isLoading === 'loading'}
      selectedCommitId={selectedCommitId}
      setSelectedCommitId={setSelectedCommitId}
      currentCommitId={
        application?.git_repository?.deployed_commit_id ||
        application?.source?.docker?.git_repository?.deployed_commit_id
      }
      buttonDisabled={buttonDisabled()}
      handleDeploy={handleDeploy}
      deployLoading={deployLoading}
      onSearch={onSearch}
      serviceName={application?.name}
    />
  )
}

export default DeployOtherCommitModalFeature
