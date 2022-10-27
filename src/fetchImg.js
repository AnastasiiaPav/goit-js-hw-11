import axios from "axios";



const KEY = `30825357-f9a7ae8e05b75d67f8e10c7e9`;
const baseUrl = `https://pixabay.com/api/`;


export const fetchImg = (value, numberPage) => {
    return axios.get(`${baseUrl}`, {
      params: {
        key: `${KEY}`,
        q: value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: numberPage ,
        per_page: 40,
      },
    });
    
  };


