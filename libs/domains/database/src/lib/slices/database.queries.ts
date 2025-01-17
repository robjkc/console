import { useQuery } from '@tanstack/react-query'
import { type AxiosResponse } from 'axios'
import {
  CloudProviderApi,
  CloudProviderEnum,
  type DatabaseTypeEnum,
  type ManagedDatabaseInstanceTypeResponse,
  type ManagedDatabaseInstanceTypeResponseList,
} from 'qovery-typescript-axios'
import { toastError } from '@qovery/shared/ui'

const cloudProviderApi = new CloudProviderApi()

export const useFetchDatabaseInstanceTypes = (
  provider?: CloudProviderEnum,
  databaseType?: DatabaseTypeEnum,
  region?: string
) => {
  return useQuery<ManagedDatabaseInstanceTypeResponse[], Error>(
    ['databaseInstanceTypes', provider, region, databaseType],
    async () => {
      let response: AxiosResponse<ManagedDatabaseInstanceTypeResponseList>

      if (provider === CloudProviderEnum.AWS && region) {
        response = await cloudProviderApi.listAWSManagedDatabaseInstanceType(region, databaseType || '')
      } else {
        response = await cloudProviderApi.listSCWManagedDatabaseInstanceType(databaseType || '')
      }

      return response.data.results as ManagedDatabaseInstanceTypeResponse[]
    },
    {
      onError: (err) => toastError(err),
    }
  )
}
