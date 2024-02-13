import axios from 'axios'; 

export const saveShares: Data[] = JSON.parse(localStorage.getItem('shares') || '[]')
// localStorage.clear();
export async function getLiveShares(orders: string[], endPoint:string){
  const apiKey = import.meta.env.VITE_TWELVE_DATA_APIKEY; 
  const url = `https://api.twelvedata.com/${endPoint}?symbol=${orders.toString()}&apikey=${apiKey}`;
  
  const response = await axios(url); 
  const data = await response.data; 
  return data;
}
interface Nasadaq100 {
  AAPL: {price: string}
  AMZN: {price: string}
  META: {price: string}
  MSFT: {price: string}
}
interface EndOfDayPrice{
  close: string;
  currency: string;
  datetime: string;
  exchange: string;
  mic_procentChangee: string;
  symbol: string;
  timestamp: number; 
}

export type Data = Nasadaq100 | EndOfDayPrice;

export function renderLiveShareHTML(data: Data[] | [void, void]){
  // Dela upp objekten, och dom egenskaperna jag söker efter är price, close och name på aktien. 
  // första objektet innehåller endast price och den andra close. 
  const symbols: string[] = ['MSFT', 'AAPl', 'AMZN', 'META'].sort(); 
  const currentPrice: number[] = [];
  const yesterdaysPrice: number[] = [];

  data.forEach((object) => {
    const storage =  Object.keys(object) as Array<keyof typeof object>;
    
    storage.sort().forEach(key => {
      if(object[key]['price']){
        return currentPrice.push(object[key]['price']); 
      }

      if(object[key]['close']){
        return yesterdaysPrice.push(object[key]['close'])
      };
    })
  }); 

  const completeData: {symbol: string; currentPrice: number; eod: number, arrow: string}[] = symbols.map((value, index) => {
    // const procentChange = ((currentPrice[index] - Number(yesterdaysPrice[index])) / Number(yesterdaysPrice[index])) * 100;

    const priceDiff = currentPrice[index] - yesterdaysPrice[index]; 
    const arrowDirection = (priceDiff > 0) ? 'up' : 'down'; 
    return {symbol: value, currentPrice: Number(currentPrice[index]), eod: Number(yesterdaysPrice[index]), arrow: arrowDirection}
  }) 

  const sharesULcontainer = document.querySelector('.shares-container') as HTMLUListElement; 
  const html = completeData.map(value => {
    return `
    <li class="company-container">
      <p class="company-symbol">${value.symbol}</p>
      <div class="procent-and-price-cont">
        <p class="old-price">${value.eod.toFixed(2)}</p>
        <p class="price">${value.currentPrice.toFixed(2)}</p>
      </div>
      <img src="https://www.slickcharts.com/img/${value.arrow}.gif" alt="an arrow gif">
    </li>
    `
  }).join('');

  sharesULcontainer.innerHTML = html; 
}