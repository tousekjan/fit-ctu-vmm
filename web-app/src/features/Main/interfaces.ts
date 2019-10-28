import moment from 'moment'

interface Pictures {
    original: string[]
    reranked: string[]
}

export interface Status {
    loading: boolean
    error: boolean
    data: Pictures
}

export interface SearchParams {
    text: string
    uploaded: moment.Moment
    uploadedWeight: number
    uploadedChecked: boolean
    time: moment.Moment
    timeWeight: number
    timeChecked: boolean
    width: number
    widthWeight: number
    widthChecked: boolean
    lat: any
    lon: any
    geoWeight: number
    geoChecked: boolean
}
