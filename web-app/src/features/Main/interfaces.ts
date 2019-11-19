import moment from 'moment'

// TODO
interface Pictures {
    original: any
    // {
    //     url: string
    //     text: string
    //     description: string
    //     uploaded: number
    //     time: number
    //     width: number
    //     likes: number
    //     lat: number
    //     lon: number
    // }
    reranked: any
    // {
    //     url: string
    //     score: string
    //     text: string
    //     description: string
    //     uploaded: number
    //     time: number
    //     width: number
    //     likes: number
    //     lat: number
    //     lon: number
    // }
}

export interface Status {
    loading: boolean
    error: boolean
    data: Pictures
}

export interface SearchParams {
    text: string
    description: string
    descriptionWeight: number
    descriptionChecked: boolean
    uploaded: moment.Moment
    uploadedWeight: number
    uploadedChecked: boolean
    time: moment.Moment
    timeWeight: number
    timeChecked: boolean
    width: number
    widthWeight: number
    widthChecked: boolean
    likes: number
    likesWeight: number
    likesChecked: boolean
    lat: any
    lon: any
    geoWeight: number
    geoChecked: boolean
}
