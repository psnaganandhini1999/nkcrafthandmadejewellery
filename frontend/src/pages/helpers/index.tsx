// Server API End Point
// const SERVER = "http://65.0.200.39:4000/qmarket"
// const SERVER = "https://email.nexvyon.com/service/mail"
const SERVER = "https://localhost:4000/api/"

export const APICall = async (query: string) => {
    const response = await fetch(SERVER,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
    })
    const {data} = await response.json()
    // console.log("API Response:", data, response);
    return data
}

export const INR_SYMBOL = "₹";