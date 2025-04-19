"use server"

import ProfileCard from "@/modules/ProfileCard/module"
import ProfileDescription from "@/modules/ProfileDescription/module"
import AppLayout from "@/modules/AppLayout/module"
import "./style.css"


export default async function Page() {
    const date = new Date();
    const dateBirth = new Date(2011, 8, 13)
    const age = new Date(date.getTime() - dateBirth.getTime()).getFullYear() - 1970

    let wakatime;
    const wakatimeRes = await fetch("https://api.wakatime.com/api/v1/users/b1c25f74-0bce-4dc9-bd10-50b9bb1f9d05/all_time_since_today")
    console.log(wakatimeRes.status)
    if (wakatimeRes.ok) {
        wakatime = (await wakatimeRes.json())["total_seconds"]
    }
    console.log(wakatime)
    return <AppLayout>
        <div className={"main-info-container"}>
            <ProfileCard />
            <ProfileDescription age={age} wakatime={wakatime}/>
        </div>

    </AppLayout>
}