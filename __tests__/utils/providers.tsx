import { Auth0Provider } from '@auth0/auth0-react'
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip'
import { configureStore } from '@reduxjs/toolkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ComponentType, type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { ModalProvider } from '@qovery/shared/ui'
import { RootState, initialRootState, rootReducer } from '@qovery/state/store'
import ResizeObserver from './resize-observer'

type Params = {
  Component?: ComponentType<any>
  compProps?: Record<string, unknown>
  reduxState?: Partial<RootState>
  route?: string
}

export type Props = {
  children?: ReactNode
} & Omit<Params, 'Component'>

const queryClient = new QueryClient()

export const Wrapper = ({ children, reduxState = initialRootState(), route = '/' }: Props) => {
  window.history.pushState({}, 'Test page', route)
  window.ResizeObserver = ResizeObserver

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: reduxState,
  })

  return (
    <Auth0Provider clientId="__test_client_id__" domain="__test_domain__">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <TooltipProvider>
            <ModalProvider>
              <MemoryRouter>{children}</MemoryRouter>
            </ModalProvider>
          </TooltipProvider>
        </Provider>
      </QueryClientProvider>
    </Auth0Provider>
  )
}
