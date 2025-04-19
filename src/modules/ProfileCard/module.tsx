"use server"

import logo from "@/../public/logo.png";
import Image from "next/image";
import "./module.css"

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

export default async function Module() {
    const weather = await GetWeather();
    const weatherMain = weather["weather"][0]
    return <div className={"profile-card-container"}>
        <div className={"profile-card-container__icon-container"}>
            <Image src={logo} alt={"logo"} className={"profile-card-container__icon"} />
        </div>
        <div className={"profile-card-container__info-container"}>
            <div className={"profile-card-container__info-title"}>
                <h1>Rashing</h1>
                <h2>Developer, web designer</h2>
            </div>
        </div>
    </div>
}