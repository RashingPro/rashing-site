import rateLimit from "next-rate-limit";
import {NextRequest, NextResponse} from "next/server";
import {ImageResponse} from "next/og";
import * as url from "node:url";
import {CSSProperties} from "react";
import {readFile} from "node:fs/promises";
import { join } from "node:path";


const limiter = rateLimit({
    interval: 60 * 1000,
    uniqueTokenPerInterval: 30
})
const robotoMono = await readFile( join(process.cwd(), 'public/RobotoMono.ttf') )

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

    let wakatime;
    const wakatimeRes = await fetch("https://wakatime.com/share/@Rashing/2325798e-c1f6-46c6-8ad5-75178c1a3808.json")
    if (wakatimeRes.ok) {
        wakatime = (await wakatimeRes.json())["data"]["grand_total"]["total_seconds_including_other_language"]
    } else {
        return NextResponse.json({}, {status: 500})
    }
    const wakaHours = Math.floor(wakatime / (60*60))
    const wakaMinutes = Math.floor((wakatime - wakaHours * 60 * 60) / 60)

    const accentColor = "#ffb629"
    const accentStyle: CSSProperties = {color: accentColor}

    const lsFolderColor = "#1f5dd5"
    const lsFolderStyle: CSSProperties = {color: lsFolderColor}

    const FetchEntry = (props: {title: string, content: string}) => <span>
        <span style={accentStyle}>{props.title}:&nbsp;</span>
        <span>{props.content}</span>
    </span>

    const CommandlinePrompt = (props: {cmd: string}) => <div style={{
        display: "flex",
        flexDirection: "row",
    }}>
        <span style={accentStyle}>[rashing@github] &gt;&nbsp;</span>
        <span>{props.cmd}</span>
    </div>

    return new ImageResponse(
        <div style={{
            width: 896,
            height: 600,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#242627",
            padding: "20",
            gap: 8,
            color: "white"
        }}>
            <CommandlinePrompt cmd={"fastfetch"} />
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: "30"
            }}>
                <div style={{display: "flex", flexGrow: 3, flexBasis: 0}} className={"aspect-square"}>
                    <img src={url.resolve(req.url, "/logo.png")} alt={""} style={{width: "100%", aspectRatio: "1 / 1", margin: "auto 0"}} />
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexGrow: 7,
                    flexBasis: 0
                }}>
                <span>
                    <span style={accentStyle}>rashing</span>
                    <span>@</span>
                    <span style={accentStyle}>github</span>
                </span>
                    <span>{"-".repeat("rashing@github".length)}</span>
                    <FetchEntry title={"WakaTime"} content={`${wakaHours} hrs ${wakaMinutes > 0 && wakaMinutes + " min"}`} />
                    <FetchEntry title={"Languages"} content={"TypeScript, Java, C#"} />
                    <FetchEntry title={"Frontend"} content={"Next.js"} />
                    <FetchEntry title={"Backend"} content={"Nest.js"} />
                    <FetchEntry title={"Desktop"} content={"Avalonia"} />
                </div>
            </div>
            <CommandlinePrompt cmd={"ls"} />
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                lineHeight: 1.15
            }}>
                <span style={lsFolderStyle}>Repositories</span>
                <span style={lsFolderStyle}>Secrets</span>
                <span>script.py</span>
                <span>README.md</span>
            </div>
            <CommandlinePrompt cmd={"python script.py"} />
            <div>
                Hello World!
            </div>
        </div>,
        {
            width: 896,
            height: 600,
            // @ts-ignore
            headers: {
                "X-RateLimit-Limit": rl_limit,
                "X-RateLimit-Remaining": rl_remaining
            },
            fonts: [{
                name: "Roboto Mono",
                data: robotoMono,
                style: "normal",
                weight: 400
            }]
        }
    )
}
