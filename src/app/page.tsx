"use server"

import ProfileCard from "@/modules/ProfileCard/module"
import ProfileDescription from "@/modules/ProfileDescription/module"
import AppLayout from "@/modules/AppLayout/module"
import "./style.css"


export default async function Page() {
    const date = new Date();
    const dateBirth = new Date(2011, 8, 13)
    const age = new Date(date.getTime() - dateBirth.getTime()).getFullYear() - 1970
    return <AppLayout>
        <div className={"main-info-container"}>
            <ProfileCard />
            <ProfileDescription age={age}/>
        </div>

    </AppLayout>
}