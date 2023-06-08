export default interface ImageResizerService {
  resize(
    imageId: string,
    path: string,
    dimension: number,
    originalName?: string
  ): Promise<string>;
}
