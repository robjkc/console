import { StateEnum } from 'qovery-typescript-axios'
import { RunningState } from '@qovery/shared/enums'

export const isDeployAvailable = (status: StateEnum): boolean => {
  return (
    (status === StateEnum.READY || status === StateEnum.STOPPED || status === StateEnum.DELETED) &&
    !isCancelBuildAvailable(status)
  )
}

export const isRestartAvailable = (runningStatus: RunningState, status: StateEnum): boolean => {
  return (
    (runningStatus === RunningState.RUNNING || runningStatus === RunningState.DEPLOYED) && isRedeployAvailable(status)
  )
}

export const isRedeployAvailable = (status: StateEnum): boolean => {
  return (
    (status === StateEnum.BUILDING ||
      status === StateEnum.BUILD_ERROR ||
      status === StateEnum.QUEUED ||
      status === StateEnum.STOP_QUEUED ||
      status === StateEnum.DELETE_QUEUED ||
      status === StateEnum.DEPLOYING ||
      status === StateEnum.DEPLOYMENT_ERROR ||
      status === StateEnum.RESTART_ERROR ||
      status === StateEnum.DEPLOYED ||
      status === StateEnum.RESTARTED ||
      status === StateEnum.STOPPING ||
      status === StateEnum.STOP_ERROR ||
      status === StateEnum.DELETING ||
      status === StateEnum.DELETE_ERROR ||
      status === StateEnum.DEPLOYMENT_QUEUED ||
      status === StateEnum.RESTART_QUEUED ||
      status === StateEnum.CANCELED) &&
    !isCancelBuildAvailable(status)
  )
}

export const isStopAvailable = (status: StateEnum): boolean => {
  return (
    (status === StateEnum.BUILDING ||
      status === StateEnum.BUILD_ERROR ||
      status === StateEnum.QUEUED ||
      status === StateEnum.STOP_QUEUED ||
      status === StateEnum.DELETE_QUEUED ||
      status === StateEnum.DEPLOYED ||
      status === StateEnum.RESTARTED ||
      status === StateEnum.DEPLOYMENT_ERROR ||
      status === StateEnum.RESTART_ERROR ||
      status === StateEnum.DEPLOYMENT_QUEUED ||
      status === StateEnum.RESTART_QUEUED ||
      status === StateEnum.STOP_ERROR ||
      status === StateEnum.CANCELED) &&
    !isCancelBuildAvailable(status)
  )
}

export const isDeleteAvailable = (status: StateEnum): boolean => {
  return (
    status === StateEnum.READY ||
    status === StateEnum.BUILD_ERROR ||
    status === StateEnum.DEPLOYMENT_ERROR ||
    status === StateEnum.RESTART_ERROR ||
    status === StateEnum.STOP_ERROR ||
    status === StateEnum.DELETE_ERROR ||
    status === StateEnum.STOPPED ||
    status === StateEnum.DEPLOYED ||
    status === StateEnum.RESTARTED ||
    status === StateEnum.CANCELED ||
    status === StateEnum.DELETED
  )
}

export const isUpdateAvailable = (status: StateEnum): boolean => {
  return (
    status === StateEnum.DEPLOYMENT_ERROR ||
    status === StateEnum.BUILD_ERROR ||
    status === StateEnum.STOP_ERROR ||
    status === StateEnum.DELETE_ERROR ||
    status === StateEnum.STOPPED ||
    status === StateEnum.DELETED ||
    status === StateEnum.RESTARTED ||
    status === StateEnum.DEPLOYED
  )
}

export const isCancelBuildAvailable = (status: StateEnum): boolean => {
  return (
    status === StateEnum.BUILDING ||
    status === StateEnum.DEPLOYING ||
    status === StateEnum.RESTARTING ||
    status === StateEnum.STOPPING ||
    status === StateEnum.DELETING ||
    status === StateEnum.STOP_QUEUED ||
    status === StateEnum.DEPLOYMENT_QUEUED ||
    status === StateEnum.RESTART_QUEUED ||
    status === StateEnum.DELETE_QUEUED
  )
}

export const getStatusClusterMessage = (status?: StateEnum, isAlreadyDeployed?: boolean): string => {
  switch (status) {
    case StateEnum.DEPLOYMENT_QUEUED:
      if (!isAlreadyDeployed) return 'Installation queued'
      else return 'Update queued'
    case StateEnum.DEPLOYMENT_ERROR:
      if (!isAlreadyDeployed) return 'Installation error'
      else return 'Update error'
    case StateEnum.DEPLOYING:
      if (!isAlreadyDeployed) return 'Installing...'
      else return 'Updating...'
    case StateEnum.QUEUED:
      if (!isAlreadyDeployed) return 'Installing queued'
      else return 'Updating queued'
    case StateEnum.STOP_QUEUED:
      return 'Pause queued'
    case StateEnum.BUILD_ERROR:
      return 'Build error'
    case StateEnum.STOP_ERROR:
      return 'Pause error'
    case StateEnum.STOPPING:
      return 'Pausing...'
    case StateEnum.STOPPED:
      return 'Paused'
    case StateEnum.DELETE_QUEUED:
      return 'Deletion queued'
    case StateEnum.DELETING:
      return 'Deleting...'
    case StateEnum.DELETE_ERROR:
      return 'Deletion error'
    case StateEnum.READY:
    case StateEnum.DELETED:
    case StateEnum.DEPLOYED:
    default:
      return ''
  }
}
