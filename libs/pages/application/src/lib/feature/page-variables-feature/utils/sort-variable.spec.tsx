import { APIVariableScopeEnum, APIVariableTypeEnum, LinkedServiceTypeEnum } from 'qovery-typescript-axios'
import { sortVariable } from './sort-variable'

const publicVars = [
  {
    id: 'd5c5d912-7947-41c5-a2de-8a21795c830b',
    created_at: '2022-07-21T09:59:42.01426Z',
    updated_at: '2022-07-21T09:59:42.014261Z',
    key: 'QOVERY_APPLICATION_Z45A4FDD4_HOST_INTERNAL',
    value: 'app-z45a4fdd4',
    scope: APIVariableScopeEnum.BUILT_IN,
    service_id: '45a4fdd4-1537-4f33-9d49-5109af2971b1',
    service_name: 'test bis',
    service_type: LinkedServiceTypeEnum.APPLICATION,
    variable_kind: 'public' as const,
  },
  {
    id: '9208ffd6-d0fc-4359-b1aa-17ab184f3bad',
    created_at: '2022-07-19T10:40:28.811491Z',
    updated_at: '2022-07-21T09:21:45.261572Z',
    key: 'public',
    value: 'jdfghdfgh',
    scope: APIVariableScopeEnum.PROJECT,
    service_name: '',
    variable_kind: 'public' as const,
  },
  {
    id: '9f3d192c-dc99-42ce-89c8-b287749465e0',
    created_at: '2022-07-21T10:52:54.036043Z',
    updated_at: '2022-07-21T10:52:54.036044Z',
    key: 'public',
    value: 'jdfghdfghd',
    scope: APIVariableScopeEnum.ENVIRONMENT,
    overridden_variable: {
      id: '9208ffd6-d0fc-4359-b1aa-17ab184f3bad',
      key: 'public',
      value: 'jdfghdfgh',
      scope: APIVariableScopeEnum.PROJECT,
      mount_path: '',
      variable_type: APIVariableTypeEnum.OVERRIDE,
    },
    service_name: '',
    variable_kind: 'public' as const,
  },
  {
    id: '48903a30-f661-4f78-85ad-9a4435428ea6',
    created_at: '2022-07-21T10:50:40.339856Z',
    updated_at: '2022-07-21T10:50:40.339857Z',
    key: 'public_alias',
    value: 'public',
    scope: APIVariableScopeEnum.ENVIRONMENT,
    aliased_variable: {
      id: '9f3d192c-dc99-42ce-89c8-b287749465e0',
      key: 'public',
      value: 'jdfghdfghd',
      scope: APIVariableScopeEnum.ENVIRONMENT,
      mount_path: '',
      variable_type: APIVariableTypeEnum.ALIAS,
    },
    service_name: '',
    variable_kind: 'public' as const,
  },
  {
    id: 'bda35a61-eb2a-479f-8484-36092f4e08dc',
    created_at: '2022-07-21T09:59:41.999006Z',
    updated_at: '2022-07-21T09:59:41.999007Z',
    key: 'QOVERY_APPLICATION_Z45A4FDD4_HOST_EXTERNAL',
    value: 'z9f6deef0-zc5151395-gtw.z37bb94b9.prm.sh',
    scope: APIVariableScopeEnum.BUILT_IN,
    service_id: '45a4fdd4-1537-4f33-9d49-5109af2971b1',
    service_name: 'test bis',
    service_type: LinkedServiceTypeEnum.APPLICATION,
    variable_kind: 'public' as const,
  },
  {
    id: '1a83837d-b73d-442f-ab1d-f30c12beccf3',
    created_at: '2022-07-12T16:33:26.479098Z',
    updated_at: '2022-07-12T16:33:26.479099Z',
    key: 'QOVERY_APPLICATION_Z3469ED41_GIT_COMMIT_ID',
    value: '26b1095feec5d993c88cd73d847eca81996a5534',
    scope: APIVariableScopeEnum.BUILT_IN,
    service_id: '3469ed41-f87f-470e-a46e-1042e2f059a9',
    service_name: 'test',
    service_type: LinkedServiceTypeEnum.APPLICATION,
    variable_kind: 'public' as const,
  },
  {
    id: 'ac54565e-5065-429d-83a5-169a3a5b11e2',
    created_at: '2022-07-12T16:33:26.484009Z',
    updated_at: '2022-07-12T16:33:26.484011Z',
    key: 'QOVERY_APPLICATION_Z3469ED41_GIT_BRANCH',
    value: 'main',
    scope: APIVariableScopeEnum.BUILT_IN,
    service_id: '3469ed41-f87f-470e-a46e-1042e2f059a9',
    service_name: 'test',
    service_type: LinkedServiceTypeEnum.APPLICATION,
    variable_kind: 'public' as const,
  },
  {
    id: '78ada4b9-4f39-4e5f-b74e-c8376ac9f46e',
    created_at: '2022-07-12T16:33:04.867714Z',
    updated_at: '2022-07-12T16:33:04.867715Z',
    key: 'QOVERY_PROJECT_ID',
    value: '1d36e7bc-ce22-439a-9564-03dc5e42d975',
    scope: APIVariableScopeEnum.BUILT_IN,
    service_name: '',
    variable_kind: 'public' as const,
  },
  {
    id: '856c2566-36b1-4a02-bd28-30787c4e01be',
    created_at: '2022-07-12T16:33:26.499877Z',
    updated_at: '2022-07-12T16:33:26.499878Z',
    key: 'QOVERY_APPLICATION_ID',
    value: '3469ed41-f87f-470e-a46e-1042e2f059a9',
    scope: APIVariableScopeEnum.BUILT_IN,
    service_name: '',
    variable_kind: 'public' as const,
  },
]
const secretVars = [
  {
    id: '3e52a6ff-5037-45bf-8318-1591d7ae9dc3',
    created_at: '2022-07-21T09:21:38.688293Z',
    updated_at: '2022-07-21T09:21:38.688293Z',
    key: 'secret',
    scope: APIVariableScopeEnum.PROJECT,
    service_name: '',
    variable_kind: 'secret' as const,
  },
  {
    id: 'd106c481-0750-4839-92de-27ee0fc949f4',
    created_at: '2022-07-21T10:53:27.277098Z',
    updated_at: '2022-07-21T10:53:27.277099Z',
    key: 'secret',
    scope: APIVariableScopeEnum.ENVIRONMENT,
    overridden_secret: {
      id: '3e52a6ff-5037-45bf-8318-1591d7ae9dc3',
      key: 'secret',
      scope: APIVariableScopeEnum.PROJECT,
      variable_type: APIVariableTypeEnum.OVERRIDE,
      mount_path: '',
    },
    service_name: '',
    variable_kind: 'secret' as const,
  },
  {
    id: '2db3aaed-f2dc-4b01-9a26-bb634b2b5b1c',
    created_at: '2022-07-21T10:53:09.513804Z',
    updated_at: '2022-07-21T10:53:09.513805Z',
    key: 'secret_dfsf',
    scope: APIVariableScopeEnum.PROJECT,
    aliased_secret: {
      id: 'd106c481-0750-4839-92de-27ee0fc949f4',
      key: 'secret',
      scope: APIVariableScopeEnum.ENVIRONMENT,
      mount_path: '',
      variable_type: APIVariableTypeEnum.ALIAS,
    },
    service_name: '',
    variable_kind: 'secret' as const,
  },
]
const sortedData = [
  {
    id: 'ac54565e-5065-429d-83a5-169a3a5b11e2',
    created_at: '2022-07-12T16:33:26.484009Z',
    updated_at: '2022-07-12T16:33:26.484011Z',
    key: 'QOVERY_APPLICATION_Z3469ED41_GIT_BRANCH',
    value: 'main',
    scope: APIVariableScopeEnum.BUILT_IN,
    service_id: '3469ed41-f87f-470e-a46e-1042e2f059a9',
    service_name: 'test',
    service_type: LinkedServiceTypeEnum.APPLICATION,
    variable_kind: 'public' as const,
  },
  {
    id: '1a83837d-b73d-442f-ab1d-f30c12beccf3',
    created_at: '2022-07-12T16:33:26.479098Z',
    updated_at: '2022-07-12T16:33:26.479099Z',
    key: 'QOVERY_APPLICATION_Z3469ED41_GIT_COMMIT_ID',
    value: '26b1095feec5d993c88cd73d847eca81996a5534',
    scope: APIVariableScopeEnum.BUILT_IN,
    service_id: '3469ed41-f87f-470e-a46e-1042e2f059a9',
    service_name: 'test',
    service_type: LinkedServiceTypeEnum.APPLICATION,
    variable_kind: 'public' as const,
  },
  {
    id: 'bda35a61-eb2a-479f-8484-36092f4e08dc',
    created_at: '2022-07-21T09:59:41.999006Z',
    updated_at: '2022-07-21T09:59:41.999007Z',
    key: 'QOVERY_APPLICATION_Z45A4FDD4_HOST_EXTERNAL',
    value: 'z9f6deef0-zc5151395-gtw.z37bb94b9.prm.sh',
    scope: APIVariableScopeEnum.BUILT_IN,
    service_id: '45a4fdd4-1537-4f33-9d49-5109af2971b1',
    service_name: 'test bis',
    service_type: LinkedServiceTypeEnum.APPLICATION,
    variable_kind: 'public' as const,
  },
  {
    id: 'd5c5d912-7947-41c5-a2de-8a21795c830b',
    created_at: '2022-07-21T09:59:42.01426Z',
    updated_at: '2022-07-21T09:59:42.014261Z',
    key: 'QOVERY_APPLICATION_Z45A4FDD4_HOST_INTERNAL',
    value: 'app-z45a4fdd4',
    scope: APIVariableScopeEnum.BUILT_IN,
    service_id: '45a4fdd4-1537-4f33-9d49-5109af2971b1',
    service_name: 'test bis',
    service_type: LinkedServiceTypeEnum.APPLICATION,
    variable_kind: 'public' as const,
  },
  {
    id: '856c2566-36b1-4a02-bd28-30787c4e01be',
    created_at: '2022-07-12T16:33:26.499877Z',
    updated_at: '2022-07-12T16:33:26.499878Z',
    key: 'QOVERY_APPLICATION_ID',
    value: '3469ed41-f87f-470e-a46e-1042e2f059a9',
    scope: APIVariableScopeEnum.BUILT_IN,
    service_name: '',
    variable_kind: 'public' as const,
  },
  {
    id: '78ada4b9-4f39-4e5f-b74e-c8376ac9f46e',
    created_at: '2022-07-12T16:33:04.867714Z',
    updated_at: '2022-07-12T16:33:04.867715Z',
    key: 'QOVERY_PROJECT_ID',
    value: '1d36e7bc-ce22-439a-9564-03dc5e42d975',
    scope: APIVariableScopeEnum.BUILT_IN,
    service_name: '',
    variable_kind: 'public' as const,
  },
  {
    id: '9208ffd6-d0fc-4359-b1aa-17ab184f3bad',
    created_at: '2022-07-19T10:40:28.811491Z',
    updated_at: '2022-07-21T09:21:45.261572Z',
    key: 'public',
    value: 'jdfghdfgh',
    scope: APIVariableScopeEnum.PROJECT,
    service_name: '',
    variable_kind: 'public' as const,
  },
  {
    id: '9f3d192c-dc99-42ce-89c8-b287749465e0',
    created_at: '2022-07-21T10:52:54.036043Z',
    updated_at: '2022-07-21T10:52:54.036044Z',
    key: 'public',
    value: 'jdfghdfghd',
    scope: APIVariableScopeEnum.ENVIRONMENT,
    overridden_variable: {
      id: '9208ffd6-d0fc-4359-b1aa-17ab184f3bad',
      key: 'public',
      value: 'jdfghdfgh',
      scope: 'PROJECT',
      mount_path: '',
      variable_type: APIVariableTypeEnum.OVERRIDE,
    },
    service_name: '',
    variable_kind: 'public' as const,
  },
  {
    id: '48903a30-f661-4f78-85ad-9a4435428ea6',
    created_at: '2022-07-21T10:50:40.339856Z',
    updated_at: '2022-07-21T10:50:40.339857Z',
    key: 'public_alias',
    value: 'public',
    scope: APIVariableScopeEnum.ENVIRONMENT,
    aliased_variable: {
      id: '9f3d192c-dc99-42ce-89c8-b287749465e0',
      key: 'public',
      value: 'jdfghdfghd',
      scope: APIVariableScopeEnum.ENVIRONMENT,
      mount_path: '',
      variable_type: APIVariableTypeEnum.ALIAS,
    },
    service_name: '',
    variable_kind: 'public' as const,
  },
  {
    id: '3e52a6ff-5037-45bf-8318-1591d7ae9dc3',
    created_at: '2022-07-21T09:21:38.688293Z',
    updated_at: '2022-07-21T09:21:38.688293Z',
    key: 'secret',
    scope: APIVariableScopeEnum.PROJECT,
    service_name: '',
    variable_kind: 'secret' as const,
  },
  {
    id: 'd106c481-0750-4839-92de-27ee0fc949f4',
    created_at: '2022-07-21T10:53:27.277098Z',
    updated_at: '2022-07-21T10:53:27.277099Z',
    key: 'secret',
    scope: APIVariableScopeEnum.ENVIRONMENT,
    overridden_secret: {
      id: '3e52a6ff-5037-45bf-8318-1591d7ae9dc3',
      key: 'secret',
      scope: APIVariableScopeEnum.PROJECT,
      variable_type: APIVariableTypeEnum.OVERRIDE,
      mount_path: '',
    },
    service_name: '',
    variable_kind: 'secret' as const,
  },
  {
    id: '2db3aaed-f2dc-4b01-9a26-bb634b2b5b1c',
    created_at: '2022-07-21T10:53:09.513804Z',
    updated_at: '2022-07-21T10:53:09.513805Z',
    key: 'secret_dfsf',
    scope: APIVariableScopeEnum.PROJECT,
    aliased_secret: {
      id: 'd106c481-0750-4839-92de-27ee0fc949f4',
      key: 'secret',
      scope: APIVariableScopeEnum.ENVIRONMENT,
      mount_path: '',
      variable_type: APIVariableTypeEnum.ALIAS,
    },
    service_name: '',
    variable_kind: 'secret' as const,
  },
]

describe('sorting function for environment variables', () => {
  it('should sort the unordered environment variables in the good order', () => {
    const sortedResult = sortVariable(publicVars, secretVars)

    expect(sortedResult).toEqual(sortedData)
  })
})
