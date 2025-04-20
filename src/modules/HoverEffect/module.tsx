"use client"

import React, {useState} from "react";

interface ModuleProps {
    children: React.ReactNode,
    scale: number,
    duration: number
}

export default function Module(props: ModuleProps) {
    const [isHovered, setIsHovered] = useState(false);

    const style: React.CSSProperties = {
        display: "inline-block",
        transition: `transform ${props.duration}ms ease-in-out`,
        transform: isHovered ? `scale(${props.scale})` : "scale(1)",
    };

    return <div
        style={style}
        onMouseEnter={() => { setIsHovered(true) }}
        onMouseLeave={() => { setIsHovered(false) }}
    >
        {props.children}
    </div>
}
