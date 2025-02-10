import React from 'react'

const AuthLayout = ({
                        children,
                    }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <section className={"container mx-auto flex flex-col items-center justify-center min-h-screen"}>
            {children}
        </section>
    )
}
export default AuthLayout
