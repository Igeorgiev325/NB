import type defaultImageInterface from "./defaultImageInterface"
export default interface MovieInterface {
    id: string
    title: string
    description: string
    genre: string[]
    release: string
    length: number
    featureImage: defaultImageInterface[]
}