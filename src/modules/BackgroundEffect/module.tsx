"use client"

import React, {CSSProperties, useEffect, useRef, useState} from "react";
import "./module.css"

interface ObjectPosition {
    x: number,
    y: number
}

interface ModuleProps {
    blur: number,
    spawnChance: number,
    minSize: number,
    maxSize: number,
    minTime: number,
    maxTime: number
}

export default function Module(props: ModuleProps) {
    if (props.minSize > props.maxSize) throw new Error("minSize property must be less than maxSize")
    if (props.spawnChance < 1 || props.spawnChance > 100) throw new Error("spawnChance must be between 1 and 100")

    const [objects, setObjects] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        const handleAdd = () => {
            if (Math.random()*100 <= props.spawnChance) {
                const size = props.minSize + (props.maxSize - props.minSize)*Math.random()
                const time = props.minTime + (props.maxTime - props.minTime)*Math.random()
                const positionX = -50 * Math.random()
                const positionY = -50 * Math.random()
                const style: CSSProperties = {
                    borderRadius: "100%",
                    position: "absolute",
                    height: `${size}px`,
                    width: `${size}px`,
                    background: `rgb(${255*Math.random()}, ${255*Math.random()}, ${255*Math.random()})`,
                    left: `${positionX}%`,
                    top: `${positionY}%`,
                    zIndex: `-${props.maxTime - time}`,
                    animation: `floating ${time}s linear 1 normal forwards running`
                };

                setObjects((prevObjects) => {
                    const newObjects = prevObjects.slice();
                    const element = <div style={style} key={newObjects.length} />
                    newObjects.push(element)
                    return newObjects;
                })
            }
        }

        const interval = setInterval(handleAdd, 500)
        return () => {clearInterval(interval);}
    }, []);

    return <div style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        filter: `blur(${props.blur}px)`,
        zIndex: "-1",
        overflow: "hidden"
    }}>
        {...objects}
    </div>
}
