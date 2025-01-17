import { render } from '__tests__/utils/setup-jest'
import {
  type DeploymentStageWithServicesStatuses,
  ServiceDeploymentStatusEnum,
  StateEnum,
} from 'qovery-typescript-axios'
import { Route, Routes } from 'react-router-dom'
import { LogsType } from '@qovery/shared/enums'
import DeploymentLogsFeature, {
  type DeploymentLogsFeatureProps,
  getServiceStatuesById,
} from './deployment-logs-feature'

const services: DeploymentStageWithServicesStatuses[] = [
  {
    stage: {
      id: 'a9cb8c98-c502-4a6e-93d4-80152eb12d7d',
      name: 'DATABASE DEFAULT',
    },
    applications: [],
    containers: [],
    databases: [],
    jobs: [],
  },
  {
    stage: {
      id: 'c5b554bc-850b-4ddb-bb45-3d47112c3e82',
      name: 'APPLICATION DEFAULT',
    },
    applications: [
      {
        id: '052613b3-de4e-4077-8c89-7228bddda8f9',
        state: StateEnum.DEPLOYED,
        service_deployment_status: ServiceDeploymentStatusEnum.UP_TO_DATE,
        last_deployment_date: '2023-04-14T09:40:37.451334Z',
        is_part_last_deployment: false,
      },
    ],
    containers: [],
    databases: [],
    jobs: [],
  },
]

describe('DeploymentLogsFeature', () => {
  const props: DeploymentLogsFeatureProps = {
    logs: [
      {
        type: LogsType.INFO,
        timestamp: new Date().toString(),
        details: {
          stage: {
            step: 'Deployed',
          },
        },
        message: {
          safe_message: 'Log 1',
        },
      },
    ],
    statusStages: services,
  }

  it('should render successfully', () => {
    const { baseElement } = render(
      <Routes location="/organization/1/project/2/environment/3/logs/">
        <Route
          path="/organization/1/project/2/environment/3/logs/4/deployment-logs"
          element={<DeploymentLogsFeature {...props} />}
        />
      </Routes>
    )
    expect(baseElement).toBeTruthy()
  })

  it('should return the service with the given id', () => {
    const serviceId = '052613b3-de4e-4077-8c89-7228bddda8f9'
    const expectedService = {
      id: '052613b3-de4e-4077-8c89-7228bddda8f9',
      state: StateEnum.DEPLOYED,
      service_deployment_status: ServiceDeploymentStatusEnum.UP_TO_DATE,
      last_deployment_date: '2023-04-14T09:40:37.451334Z',
      is_part_last_deployment: false,
    }
    expect(getServiceStatuesById(services, serviceId)).toEqual(expectedService)
  })
})
