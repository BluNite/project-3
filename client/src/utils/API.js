export async function getEvents() {
    const url = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=JMFRZoCvGiTh90iKOU43hPjBvwEdxbdD"
    return await fetch(url)
    .then(res => res.json())
}