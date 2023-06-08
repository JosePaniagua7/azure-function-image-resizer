export interface ImageResizer {
  resize(source: Buffer | string, dimension: number): Promise<Buffer>;
}
