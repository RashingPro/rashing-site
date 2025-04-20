// "use server"

import GeneralInfo from "@/modules/GeneralInfo/module"
import AppLayout from "@/modules/AppLayout/module"
import BackgroundEffect from "@/modules/BackgroundEffect/module"
import "./style.css"

async function GetWeather() {
    const res = await fetch(`${process.env.MAIN_HOSTNAME}/api/weather?place=st.%20petersburg`, {
        next: {
            revalidate: 60*10
        }
    })
    if (!res.ok) return {notFound: true};
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
        <BackgroundEffect blur={20} spawnChance={30} minSize={50} maxSize={200} minTime={7} maxTime={40} />
        <GeneralInfo age={age} wakatime={wakatime} weather={weather} time={date.toLocaleString('ru-RU', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
            timeZone: "Europe/Moscow"
        })}/>
    </AppLayout>
}

// export const dynamic = "force-dynamic";
