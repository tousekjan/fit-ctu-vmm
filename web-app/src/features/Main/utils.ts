import axios from 'axios'
import qs from 'qs'
import { Dispatch, useState } from 'react';
import { SearchParams, Status } from './interfaces';

export const useFetch = (baseUrl: string): [Dispatch<string>, Status] => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchData = async (url: string) => {
        setError(false);
        setLoading(true);
        try {
            const result = await axios(`${baseUrl}${url}`);
            setData(result.data);
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    };
    return [fetchData, { data, loading, error }];
};

export const parseToQuery = (data: SearchParams) => {
    const result = qs.stringify({
        ...{ text: data.text },
        ...(data.uploadedChecked && { uploaded: data.uploaded.unix(), uploadedWeight: data.uploadedWeight }),
        ...(data.widthChecked && { width: data.width, widthWeight: data.widthWeight }),
        ...(data.geoChecked && { lat: data.lat, lon: data.lon, geoWeight: data.geoWeight }),
    });

    return result;
}
