import SignIn from '@/pages/SignIn'
import SignUp from '@/pages/SignUp'

const routes = [
    {
        path: "/",
        exact: true,
        index: true,
        element: <SignIn />
    },
    {
        path: "/sign-in",
        exact: true,
        element: <SignIn />
    },
    {
        path: "/sign-up",
        element: <SignUp />
    },
]

export default routes