"use server"

export default async function Page() {
    const res = await fetch(`${process.env.MAIN_HOSTNAME}/api/weather?place=st.%20petersburg`, {
        next: {
            revalidate: 60*20
        }
    })
    const weather = await res.json()
    if (!res.ok) {
        console.error(weather["error"])
        return <>Ошибка!</>
    } else {
        return <>Сейчас {weather["main"]["temp"]}</>
    }
}