import React from 'react'

const DashBoardLayout = ({
                             children,
                         }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <section className={"container mx-auto p-2 min-h-screen"}>
            {children}
        </section>
    )
}
export default DashBoardLayout
