import { ApplicationEntity, EnvironmentEntity } from '@qovery/shared/interfaces'
import {
  Avatar,
  AvatarStyle,
  Button,
  ButtonSize,
  ButtonStyle,
  Icon,
  IconAwesomeEnum,
  InputCheckbox,
  LoaderSpinner,
  ScrollShadowWrapper,
  TagCommit,
  Truncate,
} from '@qovery/shared/ui'

export interface UpdateAllModalProps {
  applications?: ApplicationEntity[]
  environment?: EnvironmentEntity
  closeModal?: () => void
  submitDisabled?: boolean
  onSubmit?: () => void
  submitLoading?: boolean
  checkService: (serviceId: string) => void
  selectedServiceIds: string[]
  unselectAll: () => void
  selectAll: () => void
  listLoading?: boolean
  getAvatarForCommit: (application: ApplicationEntity, commitId?: string) => string | undefined
  getNameForCommit: (application: ApplicationEntity, commitId?: string) => string | undefined
}

export function UpdateAllModal(props: UpdateAllModalProps) {
  const isChecked = (serviceId: string) => props.selectedServiceIds.includes(serviceId)

  return (
    <div className="p-6">
      <h2 className={`h4 text-text-600 max-w-sm truncate mb-1`}>Deploy latest version</h2>
      <p className="mb-4 text-text-400 text-sm">Select service to update to the latest version</p>

      <div className="text-text-500 text-sm mb-4 flex justify-between items-center">
        <p>
          For{' '}
          <strong className="text-text-600 font-medium">
            <Truncate truncateLimit={60} text={props.environment?.name || ''} />
          </strong>
        </p>

        {props.applications &&
          props.applications.length > 0 &&
          (props.selectedServiceIds.length > 0 ? (
            <Button
              onClick={props.unselectAll}
              dataTestId="deselect-all"
              size={ButtonSize.TINY}
              style={ButtonStyle.STROKED}
            >
              Deselect All
            </Button>
          ) : (
            <Button
              onClick={props.selectAll}
              dataTestId="select-all"
              size={ButtonSize.TINY}
              style={ButtonStyle.STROKED}
            >
              Select All
            </Button>
          ))}
      </div>
      {props.listLoading ? (
        <LoaderSpinner className="mx-auto block" />
      ) : props.applications && props.applications.length ? (
        <ScrollShadowWrapper className="max-h-[440px]">
          <ul>
            {props.applications.map((application, index) => (
              <li
                data-testid={`outdated-service-row`}
                onClick={() => props.checkService(application.id)}
                key={application.id}
                className={`${index === 0 ? 'rounded-t' : ''} ${
                  props.applications && props.applications.length - 1 === index ? 'rounded-b !border-b' : ''
                } border border-b-0  p-4 flex justify-between ${
                  isChecked(application.id) ? `bg-brand-50 border border-brand-500` : 'border-element-light-lighter-500'
                } ${props.applications && isChecked(props.applications[index - 1]?.id) && 'border-t-brand-500'}`}
              >
                <div className="text-text-600 font-medium flex">
                  <InputCheckbox
                    name={application.id}
                    value={application.id}
                    isChecked={isChecked(application.id)}
                    className="mr-4"
                  />
                  <Truncate truncateLimit={31} text={application.name} />
                </div>
                <div className="flex ml-auto">
                  <div
                    data-testid="current-commit-block"
                    className={`flex items-center ${isChecked(application.id) ? 'opacity-50' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {}
                    <Avatar
                      size={28}
                      className="mr-2"
                      style={AvatarStyle.STROKED}
                      firstName={
                        props.getNameForCommit(application, application.git_repository?.deployed_commit_id) || 'Unknown'
                      }
                      url={props.getAvatarForCommit(application, application.git_repository?.deployed_commit_id)}
                    />
                    <TagCommit withBackground commitId={application.git_repository?.deployed_commit_id} />
                  </div>
                  <Icon name={IconAwesomeEnum.ARROW_LEFT} className="-scale-100 text-text-500 mx-2" />
                  {application.commits?.items && (
                    <div
                      data-testid="last-commit-block"
                      className={`flex items-center ${!isChecked(application.id) ? 'opacity-50' : ''}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Avatar
                        size={28}
                        className="mr-2"
                        style={AvatarStyle.STROKED}
                        firstName={application.commits?.items[0].author_name || ''}
                        url={application.commits?.items[0].author_avatar_url || ''}
                      />
                      <TagCommit withBackground commitId={application.commits?.items[0].git_commit_id} />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </ScrollShadowWrapper>
      ) : (
        <div className="text-center px-3 py-6" data-testid="empty-state">
          <Icon name={IconAwesomeEnum.WAVE_PULSE} className="text-text-400" />
          <p className="text-text-400 font-medium text-xs mt-1">No outdated services found</p>
        </div>
      )}

      <div className="flex gap-3 justify-end -mb-6 py-6 bg-white sticky bottom-0">
        <Button
          dataTestId="cancel-button"
          className="btn--no-min-w"
          style={ButtonStyle.STROKED}
          size={ButtonSize.XLARGE}
          onClick={props.closeModal}
        >
          Cancel
        </Button>
        <Button
          dataTestId="submit-button"
          disabled={props.selectedServiceIds.length === 0 || props.submitDisabled}
          className="btn--no-min-w"
          type="submit"
          size={ButtonSize.XLARGE}
          onClick={props.onSubmit}
          loading={props.submitLoading}
        >
          Update {props.selectedServiceIds.length} service{props.selectedServiceIds.length > 1 ? 's' : ''}
        </Button>
      </div>
    </div>
  )
}

export default UpdateAllModal