// export async function getEvents() {
//     const url = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=JMFRZoCvGiTh90iKOU43hPjBvwEdxbdD"
//     return await fetch(url)
//     .then(res => res.json())
// }

import axios from 'axios';

const BASEURL = "http://app.ticketmaster.com/discovery/v2/";
const APIKEY = process.env.REACT_APP_APIKEY;

export function search(query){ 
    return axios.get(`${BASEURL}${query}${APIKEY}&rating=pg`);
}
