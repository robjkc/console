import { render } from '__tests__/utils/setup-jest'
import { EnvironmentModeEnum } from 'qovery-typescript-axios'
import TagMode, { type TagModeProps } from './tag-mode'

describe('TagMode', () => {
  const props: TagModeProps = {
    status: EnvironmentModeEnum.PRODUCTION,
  }

  it('should render successfully', () => {
    const { baseElement } = render(<TagMode {...props} />)
    expect(baseElement).toBeTruthy()
  })
})
