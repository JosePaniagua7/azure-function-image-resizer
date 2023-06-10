import axios, { AxiosInstance } from "axios";
import { readFile } from "fs/promises";

import Container from "../../../dependency.injection";
import { TOKENS } from "../../shared/constants";
import ImageResizerService from "../contracts/ImageResizerService";

export default class AzureImageResizer implements ImageResizerService {
  http: AxiosInstance;
  constructor() {
    this.http = axios.create({
      proxy: false,
      baseURL: `http://${process.env.AZURE_IMAGE_RESIZER_HOST}/api/resize-image/`,
    });
  }

  async resize(
    imageId: string,
    path: string,
    dimension: number
  ): Promise<string> {
    try {
      const fileBuffer = await readFile(path);
      const form = new FormData();
      form.append("resource", new Blob([fileBuffer]));
      const endpoint = `${imageId}?code=${Container.get(
        TOKENS.AZURE_CODE
      )}&dimensions=${dimension}`;

      console.log('Executing request to endpoint:  ', endpoint);
      await this.http.post(endpoint, form).catch(e => {
        console.log('e is: ', e);
      });
      return ""
    } catch (e) {
      console.log("e: ", e);
    } finally {
      return "";
    }
  }
}
