export interface GenreReleaseInterface {
  genre: string[],
  release: string
}

export interface DropdownInterface {
  entries: GenreReleaseInterface[]
}