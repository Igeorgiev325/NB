import type DefaultImageInterface from "./DefaultImageInterface"
export default interface MovieInterface {
    id: string
    title: string
    description: string
    genre: string[]
    release: string
    length: number
    featureImage: DefaultImageInterface[]
}