import { APIVariableScopeEnum } from 'qovery-typescript-axios'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteEnvironmentVariable, deleteSecret } from '@qovery/domains/environment-variable'
import { ExternalServiceEnum, ServiceTypeEnum } from '@qovery/shared/enums'
import {
  EnvironmentVariableEntity,
  EnvironmentVariableSecretOrPublic,
  SecretEnvironmentVariableEntity,
} from '@qovery/shared/interfaces'
import {
  ButtonIconActionElementProps,
  Icon,
  IconAwesomeEnum,
  MenuItemProps,
  TableFilterProps,
  TableHeadProps,
  useModal,
  useModalConfirmation,
} from '@qovery/shared/ui'
import { environmentVariableFile } from '@qovery/shared/utils'
import { AppDispatch } from '@qovery/state/store'
import { ApplicationContext } from '../../ui/container/container'
import TableRowEnvironmentVariable from '../../ui/table-row-environment-variable/table-row-environment-variable'
import CrudEnvironmentVariableModalFeature, {
  EnvironmentVariableCrudMode,
  EnvironmentVariableType,
} from '../crud-environment-variable-modal-feature/crud-environment-variable-modal-feature'

export interface TableRowEnvironmentVariableFeatureProps {
  variable: EnvironmentVariableSecretOrPublic
  dataHead: TableHeadProps<EnvironmentVariableEntity>[]
  filter: TableFilterProps[]
  isLoading: boolean
  columnsWidth?: string
  serviceType?: ServiceTypeEnum
}

export function TableRowEnvironmentVariableFeature(props: TableRowEnvironmentVariableFeatureProps) {
  const { variable, filter, dataHead, columnsWidth = '30% 10% 30% 15% 15%' } = props
  const { openModal, closeModal } = useModal()
  const { applicationId = '', projectId = '', environmentId = '' } = useParams()
  const { openModalConfirmation } = useModalConfirmation()
  const { showHideAllEnvironmentVariablesValues: defaultShowHideValue } = useContext(ApplicationContext)

  const dispatch = useDispatch<AppDispatch>()

  const edit = (type: EnvironmentVariableType) => ({
    name: 'Edit',
    onClick: () => {
      openModal({
        content: (
          <CrudEnvironmentVariableModalFeature
            closeModal={closeModal}
            variable={variable}
            mode={EnvironmentVariableCrudMode.EDITION}
            applicationId={applicationId}
            projectId={projectId}
            environmentId={environmentId}
            type={type}
            serviceType={props.serviceType}
            isFile={environmentVariableFile(variable)}
          />
        ),
      })
    },
    contentLeft: <Icon name="icon-solid-pen" className="text-sm text-brand-500" />,
  })

  const createOverride = {
    name: 'Create override',
    disabled: variable.scope === APIVariableScopeEnum.APPLICATION,
    tooltip:
      variable.scope === APIVariableScopeEnum.APPLICATION
        ? 'You can’t override variables on the application scope'
        : undefined,
    onClick: () => {
      openModal({
        content: (
          <CrudEnvironmentVariableModalFeature
            closeModal={closeModal}
            variable={variable}
            type={EnvironmentVariableType.OVERRIDE}
            mode={EnvironmentVariableCrudMode.CREATION}
            applicationId={applicationId}
            projectId={projectId}
            environmentId={environmentId}
            serviceType={props.serviceType}
            isFile={environmentVariableFile(variable)}
          />
        ),
      })
    },
    contentLeft: <Icon name="icon-solid-pen-line" className="text-sm text-brand-500" />,
  }

  const createAlias = {
    name: 'Create alias',
    onClick: () => {
      openModal({
        content: (
          <CrudEnvironmentVariableModalFeature
            closeModal={closeModal}
            variable={variable}
            type={EnvironmentVariableType.ALIAS}
            mode={EnvironmentVariableCrudMode.CREATION}
            applicationId={applicationId}
            projectId={projectId}
            environmentId={environmentId}
            serviceType={props.serviceType}
            isFile={environmentVariableFile(variable)}
          />
        ),
      })
    },
    contentLeft: <Icon name="icon-solid-pen-swirl" className="text-sm text-brand-500" />,
  }

  const computeMenuActions = (): MenuItemProps[] => {
    const menu = []
    let variableType: EnvironmentVariableType = EnvironmentVariableType.NORMAL

    if (
      (variable as EnvironmentVariableEntity).overridden_variable ||
      (variable as SecretEnvironmentVariableEntity).overridden_secret
    ) {
      variableType = EnvironmentVariableType.OVERRIDE
    } else if (
      (variable as EnvironmentVariableEntity).aliased_variable ||
      (variable as SecretEnvironmentVariableEntity).aliased_secret
    ) {
      variableType = EnvironmentVariableType.ALIAS
    }

    if (variable.scope !== APIVariableScopeEnum.BUILT_IN) menu.push(edit(variableType))

    if (
      !(
        (variable as EnvironmentVariableEntity).overridden_variable ||
        (variable as SecretEnvironmentVariableEntity).overridden_secret
      ) &&
      !(
        (variable as EnvironmentVariableEntity).aliased_variable ||
        (variable as SecretEnvironmentVariableEntity).aliased_secret
      )
    ) {
      menu.push(createAlias)

      if (variable.scope !== APIVariableScopeEnum.BUILT_IN) menu.push(createOverride)
    }

    return menu
  }

  const rowActions: ButtonIconActionElementProps[] = [
    {
      iconLeft: <Icon name={IconAwesomeEnum.ELLIPSIS_V} />,
      menus: [
        {
          items:
            variable.owned_by === ExternalServiceEnum.DOPPLER
              ? [
                  {
                    name: 'Edit in Doppler',
                    contentLeft: (
                      <Icon name={IconAwesomeEnum.ARROW_UP_RIGHT_FROM_SQUARE} className="text-sm text-brand-500" />
                    ),
                    link: {
                      url: 'https://dashboard.doppler.com',
                      external: true,
                    },
                  },
                ]
              : computeMenuActions(),
        },
      ],
    },
  ]

  if (variable.owned_by === 'QOVERY' && variable.scope !== APIVariableScopeEnum.BUILT_IN) {
    rowActions[0]?.menus?.push({
      items: [
        {
          name: 'Delete',
          textClassName: '!text-error-600',
          onClick: () => {
            openModalConfirmation({
              title: 'Delete variable',
              name: variable?.key,
              isDelete: true,
              action: () => {
                let entityId: string
                switch (variable.scope) {
                  case APIVariableScopeEnum.ENVIRONMENT:
                    entityId = environmentId
                    break
                  case APIVariableScopeEnum.PROJECT:
                    entityId = projectId
                    break
                  case APIVariableScopeEnum.APPLICATION:
                  default:
                    entityId = applicationId
                    break
                }

                if (variable.variable_kind === 'public') {
                  if (props.serviceType) {
                    dispatch(
                      deleteEnvironmentVariable({
                        entityId,
                        environmentVariableId: variable.id,
                        scope: variable.scope,
                        serviceType: props.serviceType,
                      })
                    )
                  }
                } else {
                  if (props.serviceType) {
                    dispatch(
                      deleteSecret({
                        entityId,
                        environmentVariableId: variable.id,
                        scope: variable.scope,
                        serviceType: props.serviceType,
                      })
                    )
                  }
                }
              },
            })
          },
          contentLeft: <Icon name={IconAwesomeEnum.TRASH} className="text-sm text-error-600" />,
        },
      ],
    })
  }

  return (
    <TableRowEnvironmentVariable
      variable={variable}
      filter={filter}
      dataHead={dataHead}
      rowActions={rowActions}
      isLoading={props.isLoading}
      columnsWidth={columnsWidth}
      defaultShowHidePassword={defaultShowHideValue}
    />
  )
}

export default TableRowEnvironmentVariableFeature
