"use client"

import {
    IconSun,
    IconCloud,
    IconCloudFilled,
    IconCloudRain,
    IconCloudStorm,
    IconSnowflake,
    IconMist,

    IconBrandGithub,
    IconTipJar,
    IconBrandTelegram
} from "@tabler/icons-react"
import Image from "next/image"
import profile_icon from "@/../public/logo.png";
import "./module.css"
import {JSX, useEffect, useState} from "react";
import HoverEffect from "@/modules/HoverEffect/module"
import Link from "next/link";


function LinkButton({text, link, icon = <></>}: {text: string, link: string, icon?: JSX.Element}) {
    return <Link className={"general-info__description__link"} href={link}>
        {icon}
        {text}
    </Link>
}

function ProfileTitle({weather, weatherIcon}: {weather: string, weatherIcon: number}) {
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
            <span className={"font-medium"}>Wakatime:</span> {wakaHours} hrs {wakaMinutes > 0 && wakaMinutes + " min"}<br />
            <span className={"font-medium"}>Локальное время:</span> {localtime} <span style={{"color": "grey"}}>UTC+3</span>
        </div>
        <div className={"general-info__description__link-container"}>
            <HoverEffect scale={1.05} duration={200}>
                <LinkButton text={"GitHub"} link={"https://github.com/RashingPro/"} icon={<IconBrandGithub />} />
            </HoverEffect>
            <HoverEffect scale={1.05} duration={200}>
                <LinkButton text={"Boosty"} link={"https://boosty.to/rashing"} icon={<IconTipJar />} />
            </HoverEffect>
            <HoverEffect scale={1.05} duration={200}>
                <LinkButton text={"Telegram"} link={"https://t.me/rashing_pro"} icon={<IconBrandTelegram />} />
            </HoverEffect>
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
    weather: { [key: string]: string | any },
    time: string
}

export default function Module({age, wakatime, weather, time}: ModuleProps) {
    const [localTime, setLocalTime] = useState<string>(time);

    useEffect(() => {
        const getTime = () => {
            return new Date().toLocaleString('ru-RU', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false,
                timeZone: "Europe/Moscow"
            });
        }

        setLocalTime(getTime())
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
