"use server"

import React from "react";
import "./module.css"

interface ModuleProps {
    children?: React.ReactNode
}

export default async function Module({children}: ModuleProps) {
    return <>
        <main className={"root-container"}>
            {children}
        </main>
    </>
}
