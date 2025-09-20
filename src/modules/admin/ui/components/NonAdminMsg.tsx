import Link from 'next/link'
import React from 'react'

const NonAdminMsg = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full bg-card rounded-lg shadow-lg border border-border p-6 text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">
            Access Restricted
          </h2>

          <p className="text-muted-foreground mb-6">
            You don&apos;t have administrator privileges to access this page.
            Please contact your system administrator if you believe this is an
            error.
          </p>
          <Link href={"/"}>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Go to home page
            </button>
          </Link>
        </div>
      </div>
  )
}

export default NonAdminMsg
