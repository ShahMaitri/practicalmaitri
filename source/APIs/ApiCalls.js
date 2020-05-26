import axios from 'axios';
import { GET_BLOGS } from './Urls'

export const fetchData = (page, response, error) => {
    //Data API url
    const url = GET_BLOGS + page;

    axios.get(url)
        .then(res => {
            console.log(res)
            response(res)
        })
        .catch(err => {
            error()
        });
}