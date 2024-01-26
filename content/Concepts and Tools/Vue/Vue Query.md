---
title: Vue Query
draft: false
tags:
  - "#vue"
  - "#frontend"
  - http
---


## Examples

```ts
import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query'
import axios from 'axios'

export type UserState = {
  id: string
}
type Claim = {
  type: string
  value: string
}

async function getUser() {
  const { data } = await axios<Claim[]>({
    method: 'GET',
    url: '/api/user'
  })
  if (data) {
    const userId = data.find((x) => x.type === 'stream_id')?.value
    return { id: userId } as UserState
  } else {
    return { id: '' } as UserState
  }
}

export function useAuthCheck(): UseQueryReturnType<UserState, Error> {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: (_, error) => {
      const e = error as any
      if (e?.response?.status === 401) {
        return false
      }
      return true
    },
    refetchInterval: 50_000
  })
}

```