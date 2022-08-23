import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '@/libs/queries/AxiosBaseQuery'

export const userApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: '',
  }),
  endpoints(build) {
    return {
      query: build.query({ query: () => ({ url: '/query', method: 'get' }) }),
      mutation: build.mutation({
        query: () => ({ url: '/mutation', method: 'post' }),
      }),
    }
  },
})