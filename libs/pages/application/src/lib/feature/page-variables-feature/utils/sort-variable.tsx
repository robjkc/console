import { APIVariableScopeEnum } from 'qovery-typescript-axios'
import { type EnvironmentVariableEntity, type EnvironmentVariableSecretOrPublic } from '@qovery/shared/interfaces'

export function sortVariable(
  variables: EnvironmentVariableSecretOrPublic[],
  secret: EnvironmentVariableSecretOrPublic[]
): EnvironmentVariableSecretOrPublic[] {
  const merged: EnvironmentVariableSecretOrPublic[] = [...variables, ...secret]

  const sortedAscii = merged
    .filter(
      (sorted) =>
        !sorted.aliased_variable && !sorted.overridden_variable && !sorted.aliased_secret && !sorted.overridden_secret
    )
    .sort((a, b) => {
      let serviceNameSorting = 0
      let scopeOrdering = 0
      if (a.scope === APIVariableScopeEnum.BUILT_IN && b.scope !== APIVariableScopeEnum.BUILT_IN) {
        scopeOrdering = -1
      }

      if (a.scope !== APIVariableScopeEnum.BUILT_IN && b.scope === APIVariableScopeEnum.BUILT_IN) {
        scopeOrdering = 1
      }

      if ((a as EnvironmentVariableEntity).service_name && (b as EnvironmentVariableEntity).service_name) {
        serviceNameSorting = a.service_name.localeCompare(b.service_name)
      } else {
        if (!(a as EnvironmentVariableEntity).service_name && (b as EnvironmentVariableEntity).service_name) {
          serviceNameSorting = 1
        } else if ((a as EnvironmentVariableEntity).service_name && !(b as EnvironmentVariableEntity).service_name) {
          serviceNameSorting = -1
        } else {
          serviceNameSorting = 0
        }
      }

      let keySorting = 0
      if (a.key && b.key) {
        keySorting = a.key.localeCompare(b.key)
      }
      if (a.key && !b.key) {
        keySorting = -1
      }
      if (!a.key && b.key) {
        keySorting = 1
      }

      return scopeOrdering || serviceNameSorting || keySorting
    })

  const withAliasOrOverride = merged.filter(
    (sorted) =>
      sorted.aliased_variable || sorted.overridden_secret || sorted.aliased_secret || sorted.overridden_variable
  )

  const final: EnvironmentVariableSecretOrPublic[] = []

  sortedAscii.map((el) => {
    final.push(el)
    withAliasOrOverride.some((elAliasOrOverride) => {
      if (
        elAliasOrOverride.aliased_variable?.key === el.key ||
        elAliasOrOverride.overridden_variable?.key === el.key ||
        elAliasOrOverride.aliased_secret?.key === el.key ||
        elAliasOrOverride.overridden_secret?.key === el.key
      ) {
        final.push(elAliasOrOverride)
      }
    })
  })

  return final
}
