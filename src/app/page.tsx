"use server"

import ProfileCard from "@/modules/ProfileCard/module"
import ProfileDescription from "@/modules/ProfileDescription/module"
import AppLayout from "@/modules/AppLayout/module"


export default async function Page() {
    return <AppLayout>
        <div className={"main-info-container"}>
            <ProfileCard />
            <ProfileDescription />
        </div>

    </AppLayout>
}