export default interface ImageResizerService {
    resize(path: string, dimension: number, originalName: string): Promise<string>;
}