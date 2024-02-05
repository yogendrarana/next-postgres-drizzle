import { withAuth } from "next-auth/middleware"

export default withAuth(
    {
        pages: {
            signIn: "/join"
        }
    }
)

export const config = {
    matcher: [
        "/dashboard/:path*",
    ]
}