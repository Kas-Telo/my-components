import React, {ChangeEvent, useEffect, useState} from 'react'
import style from './DoubleRange.module.css'


type SuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number]) => void
    value?: [number, number]
    min?: number
    max?: number
    step?: number
    rangeGap?: number
    className?: string
}

export const DoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange,
        max, min,
        step,
        value,
        rangeGap,
        className
    }
) => {

    const [localMin, setLocalMin] = useState<number>(0)
    const [localMax, setLocalMax] = useState<number>(100)
    const [localValue1, setLocalValue1] = useState<number>(0)
    const [localValue2, setLocalValue2] = useState<number>(100)
    const RANGE_GAP = rangeGap ? rangeGap : localMax * 0.1
    const STEP = step ? step : 1

    const [leftProgressStyle, setLeftProgressStyle] = useState('')
    const [rightProgressStyle, setRightProgressStyle] = useState('')


    useEffect(() => {
        max && setLocalMax(max)
        !value && max && setLocalValue2(max)
    }, [max])
    useEffect(() => {
        min && setLocalMin(min)
        !value && min && setLocalValue1(min)
    }, [min])
    useEffect(() => {
        setLeftProgressStyle(localValue1 >= localMin ? localValue1 / localMax * 100 + '%' : 0 + '%')
        setRightProgressStyle(localValue2 <= localMax ? 100 - (localValue2 / localMax) * 100 + '%' : 0 + '%')
    }, [localValue1, localValue2])
    useEffect(() => {
        !onChangeRange && value && console.error('You need add onChange attribute')
    }, [])
    useEffect(() => {
        if (value) {
            value[0] !== localValue1 && setLocalValue1(value[0])
            value[1] !== localValue2 && setLocalValue2(value[1])
        }
    }, [value])

    const onChangeCallbackInputMin = (e: ChangeEvent<HTMLInputElement>) => {
        const temp = localValue2 - +e.currentTarget.value < RANGE_GAP
        if (temp) {
            let newValue1 = localValue2 - RANGE_GAP
            onChangeRange && value
                ? onChangeRange([newValue1, localValue2])
                : setLocalValue1(newValue1)
        } else {
            if (onChangeRange && value) {
                onChangeRange([+e.currentTarget.value, localValue2])
            } else if (!value) {
                setLocalValue1(+e.currentTarget.value)
            }
        }
    }
    const onChangeCallbackInputMax = (e: ChangeEvent<HTMLInputElement>) => {
        const temp = +e.currentTarget.value - localValue1 < RANGE_GAP
        if (temp) {
            let newValue2 = localValue1 + RANGE_GAP
            onChangeRange && value
                ? onChangeRange([localValue1, newValue2])
                : setLocalValue2(newValue2)
        } else {
            if (onChangeRange && value) {
                onChangeRange([localValue1, +e.currentTarget.value])
            } else if (!value) {
                setLocalValue2(+e.currentTarget.value)
            }
        }
    }

    let widthContainer = 0
    //достаёт свойство width у селектора container и записывает в widthContainer
    const containerEl = document.querySelector(`.${style.container}`)
    if (containerEl) {
        const containerStyle = getComputedStyle(containerEl)
        widthContainer = Number(containerStyle.getPropertyValue('width').split('px')[0])
    }
    //-----------------------------------------------------------------------------------
    //в root переменные css записывает значение widthContainer
    const root = document.querySelector(':root')
    if (root) {
        document.documentElement.style.setProperty('--width-slider', `${widthContainer - 14}px`)
        document.documentElement.style.setProperty('--width-range-input', `${widthContainer - 2}px`)
    }
    //-----------------------------------------------------------------------------------

    const styleProgress = {
        left: leftProgressStyle,
        right: rightProgressStyle
    }

    const classNameDoubleRange = `${style.container} ${className && className}`
    return (
        <div className={classNameDoubleRange}>
            <div className={style.slider}>
                <div className={style.progress} style={styleProgress}></div>
            </div>
            <div className={style.rangeInput}>
                <input className={style.rangeMin} type="range"
                       value={value ? value[0] : localValue1}
                       onChange={onChangeCallbackInputMin}
                       min={localMin}
                       max={localMax}
                       step={STEP}
                />
                <input className={style.rangeMax} type="range"
                       value={localValue2}
                       onChange={onChangeCallbackInputMax}
                       min={localMin}
                       max={localMax}
                       step={STEP}
                />
            </div>
        </div>
    )
}
