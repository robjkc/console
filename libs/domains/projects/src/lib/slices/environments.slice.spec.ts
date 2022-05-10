import { fetchEnvironments, environmentsAdapter, environments } from './environments.slice'

describe('environments reducer', () => {
  it('should handle initial state', () => {
    const expected = environmentsAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    })

    expect(environments(undefined, { type: '' })).toEqual(expected)
  })

  it('should handle fetchEnvironments', () => {
    let state = environments(undefined, fetchEnvironments.pending(null, null))

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    )

    state = environments(state, fetchEnvironments.fulfilled([{ id: 1 }], null, null))

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    )

    state = environments(state, fetchEnvironments.rejected(new Error('Uh oh'), null, null))

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    )
  })
})