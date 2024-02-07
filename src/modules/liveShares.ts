import axios from 'axios'; 

export const saveShares: Data[] = JSON.parse(localStorage.getItem('shares') || '[]')
// localStorage.clear();
export async function getLiveShares(orders: string[], endPoint:string){
  const apiKey = import.meta.env.VITE_TWELVE_DATA_APIKEY; 
  const url = `https://api.twelvedata.com/${endPoint}?symbol=${orders.toString()}&apikey=${apiKey}`;
  
  // const response = await axios(url); 
  // const data = await response.data; 
}

interface LiveShares{
  name: string; 
  price: number;
}

interface EndOfDayPrice{
  close: number; 
}

type Data = LiveShares | EndOfDayPrice;

// interface Nasadaq100 {
//   MSFT: {price: string}
//   AAPL: {price: string}
//   AMZN: {price: string}
//   META: {price: string}
//   NVDA: {price: string}
//   TSLA: {price: string}
//   GOOGL: {price: string}
// }

// interface DJUSA {
//   WBA: {price: string}
//   NKE: {price: string}
//   DIS: {price: string}
//   DOW: {price: string}
//   UNH: {price: string}
//   JNJ: {price: string}
//   MMM: {price: string}
// }

// interface EndOfDayPrice{
//   symbol: string,
//   exchange: string,
//   mic_code: string,
//   currency: string,
//   datetime: string,
//   close: string
// }