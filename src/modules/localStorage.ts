export default function saveLocaleStorage(key: string, variable: string){
  return localStorage.setItem(key, variable)
}