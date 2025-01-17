import { wrapWithReactHookForm } from '__tests__/utils/wrap-with-react-hook-form'
import {
  applicationFactoryMock,
  databaseFactoryMock,
  environmentFactoryMock,
  projectsFactoryMock,
} from '@qovery/shared/factories'
import { renderWithProviders, screen } from '@qovery/shared/util-tests'
import CloneEnvironmentModal, { type CloneServiceModalProps } from './clone-service-modal'

const mockProjects = projectsFactoryMock(3)
const mockEnvironments = environmentFactoryMock(3)

const props: CloneServiceModalProps = {
  closeModal: jest.fn(),
  environments: mockEnvironments,
  loading: false,
  onSubmit: jest.fn(),
  projects: mockProjects,
  serviceToClone: applicationFactoryMock(1)[0],
  isFetchEnvironmentsLoading: false,
}

describe('CloneEnvironmentModal', () => {
  let defaultValues: {
    environment: string
    name: string
  }

  beforeEach(() => {
    defaultValues = {
      environment: mockEnvironments[0].id,
      name: '',
    }
  })

  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(
      wrapWithReactHookForm(<CloneEnvironmentModal {...props} />, {
        defaultValues,
      })
    )
    expect(baseElement).toBeTruthy()
  })

  it('should submit form on click on button', async () => {
    const spy = jest.fn().mockImplementation((e) => e.preventDefault())
    props.onSubmit = spy
    const { userEvent } = renderWithProviders(
      wrapWithReactHookForm(<CloneEnvironmentModal {...props} />, {
        defaultValues,
      })
    )

    const submitButton = screen.getByRole('button', { name: /clone/i })

    const input = screen.getByLabelText('New service name')
    await userEvent.type(input, 'test')

    await userEvent.click(submitButton)

    expect(spy).toHaveBeenCalled()
  })

  describe('with application', () => {
    it('should render 2 input and 2 selects with default values', () => {
      renderWithProviders(wrapWithReactHookForm(<CloneEnvironmentModal {...props} />))

      const inputs = screen.getAllByRole('textbox')
      screen.getByTestId('input-select-environment')
      screen.getByTestId('input-select-project')

      expect(inputs).toHaveLength(2)
      if (props.serviceToClone) screen.getByDisplayValue(props.serviceToClone?.name)
    })

    it('should render input with a specific label for clone', () => {
      renderWithProviders(wrapWithReactHookForm(<CloneEnvironmentModal {...props} />))

      screen.getByLabelText('New service name')
    })

    it('should render confirm button with Clone', () => {
      renderWithProviders(wrapWithReactHookForm(<CloneEnvironmentModal {...props} />))

      screen.getByRole('button', { name: 'Clone' })
    })
  })

  describe('with database', () => {
    const propsUpdated: CloneServiceModalProps = {
      ...props,
      serviceToClone: databaseFactoryMock(1)[0],
    }

    it('should render 2 input and 2 selects with default values', () => {
      renderWithProviders(wrapWithReactHookForm(<CloneEnvironmentModal {...propsUpdated} />))

      const inputs = screen.getAllByRole('textbox')
      screen.getByTestId('input-select-environment')
      screen.getByTestId('input-select-project')

      expect(inputs).toHaveLength(2)
      if (propsUpdated.serviceToClone) screen.getByDisplayValue(propsUpdated.serviceToClone?.name)
    })

    it('should render input with a specif label for clone', () => {
      renderWithProviders(wrapWithReactHookForm(<CloneEnvironmentModal {...propsUpdated} />))

      screen.getByLabelText('New service name')
    })

    it('should render confirm button with Clone', () => {
      renderWithProviders(wrapWithReactHookForm(<CloneEnvironmentModal {...propsUpdated} />))

      screen.getByRole('button', { name: 'Clone' })
    })
  })
})
