import { act, render } from '__tests__/utils/setup-jest'
import { inviteMembersMock, membersMock } from '@qovery/shared/factories'
import { dateYearMonthDayHourMinuteSecond, timeAgo } from '@qovery/shared/util-dates'
import RowMember, { type RowMemberProps } from './row-member'

describe('RowMember', () => {
  const props: RowMemberProps = {
    member: membersMock(1)[0],
    editMemberRole: jest.fn(),
    deleteMember: jest.fn(),
    transferOwnership: jest.fn(),
    loading: false,
    columnsWidth: '',
    filter: [],
    availableRoles: [
      {
        id: '1',
        name: 'Owner',
      },
      {
        id: '2',
        name: 'Admin',
      },
    ],
  }

  it('should render successfully', () => {
    const { baseElement } = render(<RowMember {...props} />)
    expect(baseElement).toBeTruthy()
  })

  it('should have disabled input', () => {
    const memberOwner = membersMock(1)[0]
    memberOwner.role_name = 'Owner'

    props.member = memberOwner

    const { getByTestId } = render(<RowMember {...props} />)

    const input = getByTestId('input')

    expect(input).toHaveClass('bg-neutral-100 border-neutral-250 text-neutral-350')
  })

  it('should have loading input', () => {
    props.loadingUpdateRole = true

    const { getByTestId } = render(<RowMember {...props} />)

    getByTestId('spinner')
  })

  it('should have an avatar + render name and email', () => {
    const { getByTestId, getByText } = render(<RowMember {...props} />)

    const avatar = getByTestId('avatar')

    const name = props.member.name?.split(' ') || []

    getByText(props.member.name || '')
    getByText(props.member.email || '')
    expect(avatar.textContent).toBe(`${name[0].charAt(0)}${name[1].charAt(0)}`)
  })

  it('should have last activity and created date', () => {
    const { getByTestId } = render(<RowMember {...props} />)

    const dateLastActivity = getByTestId('last-activity')
    const dateCreatedAt = getByTestId('created-at')

    expect(dateLastActivity.textContent).toBe(`${timeAgo(new Date(props.member.last_activity_at || ''))} ago`)
    expect(dateCreatedAt.textContent).toBe(
      dateYearMonthDayHourMinuteSecond(new Date(props.member.created_at || ''), false)
    )
  })

  it('should have menu with edit member role action', async () => {
    const spy = jest.fn()
    props.editMemberRole = spy
    props.member = membersMock(1)[0]

    const { getAllByTestId } = render(<RowMember {...props} />)

    const items = getAllByTestId('menuItem')

    await act(() => {
      items[2].click()
    })

    expect(spy).toBeCalled()
  })

  it('should have menu with transfer member role action', async () => {
    const spy = jest.fn()
    props.transferOwnership = spy
    props.userIsOwner = true
    props.member = membersMock(1)[0]

    const { getAllByTestId } = render(<RowMember {...props} />)

    const items = getAllByTestId('menuItem')

    await act(() => {
      items[0].click()
    })

    expect(spy).toBeCalled()
  })

  it('should have menu with transfer member role action', async () => {
    const spy = jest.fn()
    props.transferOwnership = spy
    props.userIsOwner = true
    props.member = membersMock(1)[0]

    const { getAllByTestId } = render(<RowMember {...props} />)

    const items = getAllByTestId('menuItem')

    await act(() => {
      items[0].click()
    })

    expect(spy).toBeCalled()
  })

  it('should have menu with resend invite action', async () => {
    const spy = jest.fn()
    props.resendInvite = spy
    props.member = inviteMembersMock(1)[0]

    const { getAllByTestId } = render(<RowMember {...props} />)

    const items = getAllByTestId('menuItem')

    await act(() => {
      items[0].click()
    })

    expect(spy).toBeCalled()
  })
})
