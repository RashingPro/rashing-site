"use server"

import ProfileCard from "@/modules/ProfileCard/module"
import ProfileDescription from "@/modules/ProfileDescription/module"
import GeneralInfo from "@/modules/GeneralInfo/module"
import AppLayout from "@/modules/AppLayout/module"
import "./style.css"

async function GetWeather() {
    const res = await fetch(`${process.env.MAIN_HOSTNAME}/api/weather?place=st.%20petersburg`, {
        next: {
            revalidate: 60*20
        }
    })
    if (!res.ok) return undefined;
    const weather = await res.json()
    return weather;
}

export default async function Page() {
    const date = new Date();
    const dateBirth = new Date(2011, 8, 13)
    const age = new Date(date.getTime() - dateBirth.getTime()).getFullYear() - 1970

    let wakatime;
    const wakatimeRes = await fetch("https://wakatime.com/share/@Rashing/2325798e-c1f6-46c6-8ad5-75178c1a3808.json")
    if (wakatimeRes.ok) {
        wakatime = (await wakatimeRes.json())["data"]["grand_total"]["total_seconds"]
    }
    const weather = await GetWeather()
    return <AppLayout>
        <GeneralInfo age={age} wakatime={wakatime} weather={weather}/>
    </AppLayout>
}