import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { NextRequest } from 'next/server'

export const getServerSideUser = async (
  cookies: NextRequest['cookies'] | ReadonlyRequestCookies
) => {
  const token = cookies.get('payload-token')?.value
  const meRes = await fetch('http://localhost:8000/api/sessions/current', {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })
  const { user } = await meRes.json()
  return { user }
}
