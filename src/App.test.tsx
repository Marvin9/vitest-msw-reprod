import App from './App'
import {render, waitFor} from '@testing-library/react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'

const server = setupServer(
    rest.get('http://localhost:8080/api/foo/bar', (req, res, ctx) => {
      console.log('request...')
      return res(ctx.json({greeting: 'hello there'}))
    }),
  )

beforeAll(() => server.listen({
  onUnhandledRequest: 'error'
}))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('App', async () => {
    const screen = render(<App />)

    await waitFor(() => {
        screen.getByText('Done')
    })
})