import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  editApplicationAdvancedSettings,
  fetchApplicationAdvancedSettings,
  fetchDefaultApplicationAdvancedSettings,
  getApplicationsState,
  postApplicationActionsRedeploy,
  selectApplicationById,
} from '@qovery/domains/application'
import { type ServiceTypeEnum, getServiceType } from '@qovery/shared/enums'
import { type AdvancedSettings, type ApplicationEntity } from '@qovery/shared/interfaces'
import { DEPLOYMENT_LOGS_URL, ENVIRONMENT_LOGS_URL } from '@qovery/shared/routes'
import { objectFlattener } from '@qovery/shared/util-js'
import { type AppDispatch, type RootState } from '@qovery/state/store'
import PageSettingsAdvanced from '../../ui/page-settings-advanced/page-settings-advanced'
import { initFormValues } from './init-form-values/init-form-values'

export function PageSettingsAdvancedFeature() {
  const { organizationId = '', projectId = '', environmentId = '', applicationId = '' } = useParams()

  const application = useSelector<RootState, ApplicationEntity | undefined>(
    (state) => selectApplicationById(state, applicationId),
    (a, b) => {
      return a?.id === b?.id && a?.advanced_settings?.loadingStatus === b?.advanced_settings?.loadingStatus
    }
  )
  const defaultSettings = useSelector<RootState, AdvancedSettings | undefined>(
    (state) => getApplicationsState(state).defaultApplicationAdvancedSettings.settings
  )
  const [keys, setKeys] = useState<string[]>([])

  const dispatch = useDispatch<AppDispatch>()
  const methods = useForm({ mode: 'onChange' })
  const navigate = useNavigate()
  const [serviceType, setServiceType] = useState<ServiceTypeEnum>()

  useEffect(() => {
    if (application) setServiceType(getServiceType(application))
  }, [application])

  // at the init fetch the default settings advanced settings
  useEffect(() => {
    if (serviceType) dispatch(fetchDefaultApplicationAdvancedSettings({ serviceType: serviceType }))
  }, [dispatch, serviceType])

  // when application is ready, and advanced setting has never been fetched before
  useEffect(() => {
    if (application && !application.advanced_settings?.loadingStatus) {
      dispatch(fetchApplicationAdvancedSettings({ applicationId, serviceType: getServiceType(application) }))
    }
  }, [dispatch, application, applicationId])

  // init the keys when application is updated
  useEffect(() => {
    if (application) {
      if (
        application.advanced_settings?.current_settings &&
        application.advanced_settings?.loadingStatus === 'loaded'
      ) {
        setKeys(Object.keys(application.advanced_settings.current_settings).sort())
      }
    }
  }, [application])

  // init form
  useEffect(() => {
    if (application && application.advanced_settings?.loadingStatus === 'loaded') {
      methods.reset(initFormValues(keys, application, getServiceType(application)))
    }
  }, [application, keys, methods])

  const toasterCallback = () => {
    if (application) {
      dispatch(
        postApplicationActionsRedeploy({
          applicationId,
          environmentId,
          serviceType: getServiceType(application),
          callback: () =>
            navigate(
              ENVIRONMENT_LOGS_URL(organizationId, projectId, environmentId) + DEPLOYMENT_LOGS_URL(applicationId)
            ),
        })
      )
    }
  }

  const onSubmit = methods.handleSubmit((data) => {
    let dataFormatted = { ...data }

    Object.keys(dataFormatted).forEach((key) => {
      if (key.includes('.')) {
        delete dataFormatted[key]
      }
    })

    dataFormatted = objectFlattener(dataFormatted)

    // below is a hack to handle the weird way the payload behaves
    // empty string must be sent as ''
    // empty numbers must be sent as null
    // the thing is we don't know in advance if the value is a string or a number
    // the interface has this information, but we can't check the type of the property of the interface
    // we can't do ApplicationAdvanceSettings[key] === 'string' or 'number'
    // so if field is empty string replace by value found in defaultSettings (because default value is well typed)
    Object.keys(dataFormatted).forEach((key) => {
      // check if we can convert this string to object
      try {
        JSON.parse(dataFormatted[key])
      } catch (e) {
        if (dataFormatted[key] === '') {
          dataFormatted[key] = defaultSettings ? defaultSettings[key as keyof AdvancedSettings] : ''
        }
        return
      }
      dataFormatted[key] = JSON.parse(dataFormatted[key])
    })

    if (application) {
      dispatch(
        editApplicationAdvancedSettings({
          applicationId,
          settings: dataFormatted,
          serviceType: getServiceType(application),
          toasterCallback,
        })
      )
    }
  })

  return (
    <FormProvider {...methods}>
      <PageSettingsAdvanced
        defaultAdvancedSettings={defaultSettings}
        advancedSettings={application?.advanced_settings?.current_settings}
        loading={application?.advanced_settings?.loadingStatus}
        keys={keys}
        discardChanges={() => {
          methods.reset()
        }}
        onSubmit={() => {
          onSubmit().then()
        }}
      />
    </FormProvider>
  )
}

export default PageSettingsAdvancedFeature
