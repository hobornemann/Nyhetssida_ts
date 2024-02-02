export default function saveLocaleStorage(key: string, variable: string){
  return localStorage.setItem(key, variable)
}
export const currentDisplayUrl: {url: string; pages: number;} = {url: '', pages: 0}; 
 