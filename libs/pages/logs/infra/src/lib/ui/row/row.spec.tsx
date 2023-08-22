import { render, screen } from '__tests__/utils/setup-jest'
import { ClusterLogsStepEnum } from 'qovery-typescript-axios'
import { LogsType } from '@qovery/shared/enums'
import { clusterLogFactoryMock } from '@qovery/shared/factories'
import Row, { RowProps } from './row'

describe('Row', () => {
  const props: RowProps = {
    data: clusterLogFactoryMock(1, true)[0],
    index: 1,
    firstDate: new Date(),
  }

  it('should render successfully', () => {
    const { baseElement } = render(<Row {...props} />)
    expect(baseElement).toBeTruthy()
  })

  it('should have warning index color', () => {
    props.data = {
      type: LogsType.WARNING,
    }

    render(<Row {...props} />)

    const index = screen.getByTestId('index')

    expect(index).toHaveClass('bg-element-light-darker-300 text-zinc-350 group-hover:bg-element-light-darker-200')
  })

  it('should have error index color', () => {
    props.data = {
      type: LogsType.ERROR,
    }

    render(<Row {...props} />)

    const index = screen.getByTestId('index')

    expect(index).toHaveClass('bg-element-light-darker-300 text-zinc-350 group-hover:bg-element-light-darker-200')
  })

  it('should have real error index color', () => {
    props.data = {
      type: LogsType.ERROR,
      step: ClusterLogsStepEnum.DELETE_ERROR,
    }

    render(<Row {...props} />)

    const index = screen.getByTestId('index')

    expect(index).toHaveClass('bg-red-500 text-zinc-800 group-hover:bg-red-600')
  })

  it('should have success index color', () => {
    props.data = {
      step: ClusterLogsStepEnum.CREATED,
    }

    render(<Row {...props} />)

    const index = screen.getByTestId('index')

    expect(index).toHaveClass('bg-green-500 text-zinc-800 group-hover:bg-green-600')
  })

  it('should have warning cell date color', () => {
    props.data = {
      type: LogsType.WARNING,
    }

    render(<Row {...props} />)

    const cellDate = screen.getByTestId('cell-date')

    expect(cellDate).toHaveClass('py-1 px-2 text-yellow-500')
  })

  it('should have error cell date color', () => {
    props.data = {
      type: LogsType.ERROR,
    }

    render(<Row {...props} />)

    const cellDate = screen.getByTestId('cell-date')

    expect(cellDate).toHaveClass('py-1 px-2 text-red-500')
  })

  it('should have success cell date color', () => {
    props.data = {
      step: ClusterLogsStepEnum.CREATED,
    }

    render(<Row {...props} />)

    const cellDate = screen.getByTestId('cell-date')

    expect(cellDate).toHaveClass('py-1 px-2 text-green-500')
  })

  it('should have cell message', () => {
    props.data = {
      step: ClusterLogsStepEnum.CREATED,
      message: {
        safe_message: 'hello world',
      },
    }

    render(<Row {...props} />)

    const cellMsg = screen.getByTestId('cell-msg')

    expect(cellMsg?.textContent).toBe(`${ClusterLogsStepEnum.CREATED} - hello world`)
  })

  it('should have cell error message', () => {
    props.data = {
      type: LogsType.ERROR,
      step: ClusterLogsStepEnum.DELETE_ERROR,
      error: {
        user_log_message: 'error message',
      },
    }

    render(<Row {...props} />)

    const cellMsg = screen.getByTestId('cell-msg')

    expect(cellMsg?.textContent).toBe(`${ClusterLogsStepEnum.DELETE_ERROR} - error message`)
  })
})
