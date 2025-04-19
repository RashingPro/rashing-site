"use client"

import {
    IconSun,
    IconCloud,
    IconCloudFilled,
    IconCloudRain,
    IconCloudStorm,
    IconSnowflake,
    IconMist
} from "@tabler/icons-react"
import Image from "next/image"
import profile_icon from "@/../public/logo.png";
import "./module.css"

function ProfileTitle() {
    return <div className={"general-info__title"}>
        <div className={"general-info__title__icon-container"}>
            <Image className={"general-info__title__icon"} src={profile_icon} alt={"profile icon"} />
        </div>
        <div className={"general-info__title__name-container"}>
            <h1>Rashing</h1>
            <h2>Programmer, fullstack web developer</h2>
        </div>
    </div>
}

function ProfileDescription({age, wakatime}: { age: number, wakatime: number }) {
    const wakaHours = Math.floor(wakatime / (60*60))
    const wakaMinutes = Math.floor((wakatime - wakaHours * 60 * 60) / 60)
    return <div className={"general-info__description"}>
        <div className={"general-info__description__text"}>
            <h1>Hi there!</h1>
            Меня зовут Кирилл, {age} лет, я из Санкт-Петербурга. Разрабатываю сайты, приложения, ботов и др. Полный список навыков ниже.
        </div>
        <div className={"general-info__description__list"}>
            <span className={"font-medium"}>Wakatime:</span> {wakaHours} часов {wakaMinutes} минут
        </div>
        <div className={"general-info__description__links"}>

        </div>
    </div>
}

function GetWeatherIcon({code}: {code: number}) {
    switch (code) {
        case 2: return <IconCloud />;
        case 3:
        case 4: return <IconCloudFilled />;
        case 9:
        case 10: return <IconCloudRain />;
        case 11: return <IconCloudStorm />;
        case 13: return <IconSnowflake />;
        case 50: return <IconMist />;
        default: return <IconSun />;
    }
}

interface ModuleProps {
    age: number,
    wakatime: number,
    weather: { [key: string]: any }
}

export default function Module({age, wakatime, weather}: ModuleProps) {
    const weatherMain = weather["weather"][0]
    const weatherIcon = GetWeatherIcon({code: parseInt(weatherMain["icon"].slice(0, 2))})
    return <div className={"general-info-container"}>
        <ProfileTitle />
        <ProfileDescription age={age} wakatime={wakatime}/>
    </div>
}
