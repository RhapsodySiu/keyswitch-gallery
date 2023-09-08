import data from './assets/data'
import type { FilterState, Keyswitch, KeyswitchType } from './types'

const nilOrBoolean = (v: unknown): boolean | undefined => v === undefined || v === null ? undefined : Boolean(v)

export function getKeyswitchesData(): Keyswitch[] {
    const defaultData = data.data.shift()!

    return data.data.map((d) => ({
        ...d,
        type: d.type as KeyswitchType,
        double_segment_spring: nilOrBoolean(d.double_segment_spring) ?? Boolean(d.double_segment_spring),
        doubled_sided_wall: nilOrBoolean(d.doubled_sided_wall) ?? Boolean(defaultData.doubled_sided_wall),
        is_five_pin: nilOrBoolean(d.is_five_pin) ?? Boolean(defaultData.is_five_pin),
        is_silent: nilOrBoolean(d.is_silent) ?? Boolean(defaultData.is_silent),
        is_speedy: nilOrBoolean(d.is_speedy) ?? Boolean(defaultData.is_speedy),
        is_low_profile: nilOrBoolean(d.low_profile) ?? Boolean(defaultData.low_profile),
    }))
}

const getMeasurementText = (value: number | undefined, diff: string | number | undefined, unit: string): string => {
    if (value) {
        if (diff) {
            if (typeof diff === 'number') {
                if (diff >= 0) {
                    return `${value}±${diff}${unit}`;
                }

                return `${value}${diff}${unit}`;
            }
        } else if (typeof diff === 'string') {
            return `${value}${diff}${unit}`;
        }

        return `~${value}${unit}`;
    }

    return 'Nil';
}

export const getTriggerForceText = (item: Keyswitch): string => {
    return getMeasurementText(item.trigger_force_g, item.trigger_force_diff, 'g')
}

export const getBottomOutForceText = (item: Keyswitch): string => {
    return getMeasurementText(item.bottom_out_force_g, item.bottom_out_force_diff, 'g')
}

export const getTravelText = (item: Keyswitch): string => {
    return getMeasurementText(item.total_travel_mm, item.total_travel_diff, 'mm')
}

export const getPreTravelText = (item: Keyswitch): string => {
    return getMeasurementText(item.pre_travel_mm, item.pre_travel_diff, 'mm')
}

export function getImgUrl(imgSrc: string): string {
    return import.meta.env.DEV ? `${import.meta.env.VITE_IMG_BASE_URL_LOCAL}${imgSrc}` : `${import.meta.env.VITE_IMG_BASE_URL}${imgSrc}`
}

export function getDefaultFilterState(): FilterState {
    return {
        type: '',
        force: '',
        colors: [],
        price: '',
        silentOnly: false,
        lightingOnly: false,
        durableOnly: false,
        speedyOnly: false,
        searchText: '',
    }
}