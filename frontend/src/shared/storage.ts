export function setItem<T>(name: string, value: T){
    localStorage.setItem(name, JSON.stringify(value))
}

export function getItem<T>(name: string) : T | undefined{
    const saved = localStorage.getItem(name)
    return saved ? JSON.parse(saved) : undefined
}

export function removeItem(name: string){
    localStorage.removeItem(name)
}