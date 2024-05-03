import type { FeatureImageModel } from "./FeatureImageModel"

export interface MovieInterface {
  id: string
  title: string
  description: string
  genre: string[]
  release: string
  length: number
  featureImage: FeatureImageModel[]
}