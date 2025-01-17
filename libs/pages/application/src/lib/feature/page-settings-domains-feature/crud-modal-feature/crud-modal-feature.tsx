import { type CustomDomain } from 'qovery-typescript-axios'
import { useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  createCustomDomain,
  editCustomDomain,
  fetchApplicationLinks,
  getCustomDomainsState,
  postApplicationActionsRedeploy,
} from '@qovery/domains/application'
import { getServiceType } from '@qovery/shared/enums'
import { type ApplicationEntity, type LoadingStatus } from '@qovery/shared/interfaces'
import { DEPLOYMENT_LOGS_URL, ENVIRONMENT_LOGS_URL } from '@qovery/shared/routes'
import { useModal } from '@qovery/shared/ui'
import { type AppDispatch, type RootState } from '@qovery/state/store'
import CrudModal from '../../../ui/page-settings-domains/crud-modal/crud-modal'

export interface CrudModalFeatureProps {
  organizationId: string
  projectId: string
  customDomain?: CustomDomain
  application?: ApplicationEntity
  onClose: () => void
}

export function CrudModalFeature(props: CrudModalFeatureProps) {
  const methods = useForm({
    defaultValues: { domain: props.customDomain ? props.customDomain.domain : '' },
    mode: 'onChange',
  })
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const loadingStatus = useSelector<RootState, LoadingStatus>((state) => getCustomDomainsState(state).loadingStatus)
  const { enableAlertClickOutside } = useModal()

  const toasterCallback = () => {
    if (props.application) {
      dispatch(
        postApplicationActionsRedeploy({
          applicationId: props.application.id,
          environmentId: props.application.environment?.id || '',
          serviceType: getServiceType(props.application),
          callback: () =>
            navigate(
              ENVIRONMENT_LOGS_URL(props.organizationId, props.projectId, props.application?.environment?.id) +
                DEPLOYMENT_LOGS_URL(props.application?.id)
            ),
        })
      )
    }
  }

  useEffect(() => {
    enableAlertClickOutside(methods.formState.isDirty)
  }, [methods.formState, enableAlertClickOutside])

  const onSubmit = methods.handleSubmit((data) => {
    if (!props.application) return

    if (props.customDomain) {
      dispatch(
        editCustomDomain({
          applicationId: props.application.id,
          customDomain: props.customDomain,
          domain: data.domain,
          serviceType: getServiceType(props.application),
          toasterCallback,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(fetchApplicationLinks({ applicationId: props.application?.id || '' }))
          props.onClose()
        })
        .catch((e) => console.error(e))
    } else {
      dispatch(
        createCustomDomain({
          applicationId: props.application.id,
          domain: data.domain,
          serviceType: getServiceType(props.application),
          toasterCallback,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(fetchApplicationLinks({ applicationId: props.application?.id || '' }))
          props.onClose()
        })
        .catch((e) => console.error(e))
    }
  })

  const defaultLink = useMemo(() => {
    const links = props.application?.links?.items
    const defaultLinkItem = links?.find((link) => link.is_qovery_domain && link.is_default)

    return defaultLinkItem?.url?.replace('https://', '') || ''
  }, [props.application?.links?.items])

  return (
    <FormProvider {...methods}>
      <CrudModal
        customDomain={props.customDomain}
        onSubmit={onSubmit}
        onClose={props.onClose}
        loading={loadingStatus === 'loading'}
        isEdit={!!props.customDomain}
        link={defaultLink}
      />
    </FormProvider>
  )
}

export default CrudModalFeature
