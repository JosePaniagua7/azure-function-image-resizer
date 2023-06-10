import { AzureFunction, Context, HttpRequest } from "@azure/functions";

import MultipartParserFileUplaoder from "../domain/application/MultipartParserFileUploader";
import { validateFiles } from "../domain/application/RequestFilesValidator";
import { validateRequestParams } from "../domain/application/RequestParamsValidator";
import SharpImageResizer from "../domain/application/SharpImageResizer";
import { MultiparFile } from "../domain/contracts/MultipartFile";
import { ResizedException } from "../domain/contracts/ResizerException";
import SubscribersNotifier from "../domain/infraastructure/SubscriberesNotifier";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  try {
    validateRequestParams(req);
    const files: MultiparFile[] = new MultipartParserFileUplaoder().uploadFiles(
      req
    );
    validateFiles(files);
    const responseBuffer = await new SharpImageResizer().resize(
      files[0].data,
      Number(req.query.dimensions)
    );
    await new SubscribersNotifier().notify(req.params.id, responseBuffer);

    context.res = {
      body: responseBuffer,
    };
  } catch (e: ResizedException | any) {
    context.res = {
      body: { message: e.message, context: e.context ?? {} },
      status: e.status | 400,
    };
  }
};

export default httpTrigger;
