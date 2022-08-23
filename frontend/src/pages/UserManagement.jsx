import React from 'react'
import TwoColumnLayout from '@/layouts/TwoColumnLayout'
import { useSelector, useDispatch } from 'react-redux'
import { listUsers } from '@/store/users/usersSlice'

export function UserManagement() {
    const users = useSelector((state) => state.users)
    const dispatch = useDispatch()

    return (
        <TwoColumnLayout>

        </TwoColumnLayout>
    )
}