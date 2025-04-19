"use server"

import "./module.css";

interface ModuleProps {
    age?: number
}

export default async function Module({age = 13}: ModuleProps) {
    return <div className={"profile-description-container"}>
        <h1>Привет!</h1>
        Я Кирилл, мне {age} лет, я программист из Санкт-Петербурга. Разрабатываю сайты, приложения, ботов и др. Полный список навыков ниже.
    </div>
}
