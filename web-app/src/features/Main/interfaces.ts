import moment from 'moment';

export interface Status {
    loading: boolean
    error: boolean
    data: object
}

export interface SearchParams {
    text: string;
    uploaded: moment.Moment;
    uploadedWeight: number;
    uploadedChecked: boolean;
    width: number;
    widthWeight: number;
    widthChecked: boolean;
    lat: any;
    lon: any;
    geoWeight: number;
    geoChecked: boolean;
}
