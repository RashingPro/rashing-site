import {NextRequest, NextResponse} from "next/server";
import rateLimit from 'next-rate-limit';

const limiter = rateLimit({
    interval: 60 * 1000,
    uniqueTokenPerInterval: 30
})

export async function GET(req: NextRequest) {
    let rl_limit;
    let rl_remaining;
    try {
        const headers = limiter.checkNext(req, 30)
        rl_limit = headers.get("X-RateLimit-Limit")
        rl_remaining = headers.get("X-RateLimit-Remaining")
    } catch {
        return NextResponse.json({"error": "Rate limit exceeded"}, {status: 429})
    }
    if (!rl_limit || !rl_remaining) {
        return NextResponse.json({}, {status: 500})
    }

    if (req.headers.has("Cache-Control")) {
        return NextResponse.json({"error": "Cache-Control header is not allowed"}, {status: 400})
    }

    const url = req.nextUrl
    const queryParams = url.searchParams
    if (!url || !queryParams || !(queryParams.has("place") || (queryParams.has("lat") && queryParams.has("lon")))) {
        return NextResponse.json({"error": "Incorrect or missing query parameters found"}, {status: 400});
    }

    if (!process.env.OWM_TOKEN) {
        return NextResponse.json({"error": "Incorrect token. Contact site owner through GitHub issues"}, {status: 400})
    }

    try {
        let lat;
        let lon;
        if ((!queryParams.has("lat") || !queryParams.has("lon"))) {

            const place = queryParams.get("place")
            if (!place) {
                throw new Error("Incorrect or missing parameters found");
            }
            const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${process.env.OWM_TOKEN}`)
            if (!res.ok) {
                console.log("error")
                throw new Error("Failed geocode place")
            }
            const resBody = await res.json()
            const _lat = resBody[0]["lat"]
            const _lon = resBody[0]["lon"]
            if (!_lat || !_lon) {
                throw new Error("Failed geocode place");
            }
            lat = _lat
            lon = _lon
        } else {
            lat = queryParams.get("lat")
            lon = queryParams.get("lon")
        }

        const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OWM_TOKEN}&units=metric`
        )
        const weather = await weatherRes.json()
        if (!weatherRes.ok) {
            throw new Error("Failed fetch weather")
        }
        return NextResponse.json(weather, {status: 200, headers: {
                "X-RateLimit-Limit": rl_limit,
                "X-RateLimit-Remaining": rl_remaining,
                "Cache-Control": `public, max-age=${60*20}`
            }});
    } catch (error) {
        return NextResponse.json({"error": error}, {status: 500})
    }
}
