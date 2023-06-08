import axios, { AxiosInstance } from "axios";
import { readFile } from "fs/promises";

import Container from "../../../dependency.injection";
import { TOKENS } from "../../shared/constants";
import ImageResizerService from "../contracts/ImageResizerService";

export default class AzureImageResizer implements ImageResizerService {
  http: AxiosInstance;
  constructor() {
    // IMPORTANT! THIS VARIABLES SHOULD BE INJECTED BY ENV PROVIDER, DUE SOME
    // SPEED UP TO DELIVER TECHNICAL CHALLENGE ASAP, THIS WILL BE SKIPED
    this.http = axios.create({
      proxy: false,
      baseURL: "http://127.0.0.1:7071/api/resize-image/",
      // baseURL: 'https://jose-paniagua-image-resizer.azurewebsites.net/api/resize-image/',
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
      return this.http.post(endpoint, form);
    } catch (e) {
      console.log("e: ", e);
    } finally {
      return "";
    }
  }
}
