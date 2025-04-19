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
import {useEffect, useState} from "react";

function ProfileTitle({weather, weatherIcon}: {weather: any, weatherIcon: any}) {
    return <div className={"general-info__title"}>
        <div className={"general-info__title__icon-container"}>
            <Image className={"general-info__title__icon"} src={profile_icon} alt={"profile icon"} />
        </div>
        <div className={"general-info__title__name-container"}>
            <h1>Rashing</h1>
            <h2>Programmer, fullstack web developer</h2>
            <h3 className={"flex gap-2"}>
                <GetWeatherIcon code={weatherIcon} />
                <span>{weather}</span>
            </h3>
        </div>
    </div>
}

function ProfileDescription({age, wakatime, localtime}: { age: number, wakatime: number, localtime: string }) {
    const wakaHours = Math.floor(wakatime / (60*60))
    const wakaMinutes = Math.floor((wakatime - wakaHours * 60 * 60) / 60)
    return <div className={"general-info__description"}>
        <div className={"general-info__description__text"}>
            <h1>Hi there!</h1>
            Меня зовут Кирилл, {age} лет, я из Санкт-Петербурга. Разрабатываю сайты, приложения, ботов и др.
        </div>
        <div className={"general-info__description__list"}>
            <span className={"font-medium"}>Wakatime:</span> {wakaHours} часов {wakaMinutes} минут<br />
            <span className={"font-medium"}>Локальное время:</span> {localtime}
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

function getTime() {
    return new Date().toLocaleString('ru-RU', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        timeZone: "+03"
    });
}

interface ModuleProps {
    age: number,
    wakatime: number,
    weather: { [key: string]: any }
}

export default function Module({age, wakatime, weather}: ModuleProps) {
    const [localTime, setLocalTime] = useState<string>(getTime());

    useEffect(() => {
        const interval = setInterval(() => setLocalTime(getTime()), 1000)

        return () => clearInterval(interval);
    }, []);

    const weatherMain = weather["weather"][0]
    let weatherCondition: string = weatherMain["main"]
    switch (weatherCondition.toLowerCase()) {
        case "clear": weatherCondition = "Ясно"; break;
        case "clouds": weatherCondition = "Облачно"; break;
        case "rain": weatherCondition = "Дождь"; break;
        case "thunderstorm": weatherCondition = "Гроза"; break;
        case "snow": weatherCondition = "Снег"; break;
    }

    const weatherTemp = Math.round(weather["main"]["temp"])
    const weatherText = `${weatherCondition}, ${weatherTemp}°C`
    const weatherIcon = parseInt(weatherMain["icon"].slice(0, 2))
    return <div className={"general-info-container"}>
        <ProfileTitle weather={weatherText} weatherIcon={weatherIcon}/>
        <ProfileDescription age={age} wakatime={wakatime} localtime={localTime}/>
    </div>
}
