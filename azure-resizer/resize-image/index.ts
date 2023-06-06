import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { MultiparFile } from "../domain/contracts/MultipartFile";
import MultipartParserFileUplaoder from "../domain/application/MultipartParserFileUploader";
import SharpImageResizer from "../domain/application/SharpImageResizer";
import { validateRequestParams } from "../domain/application/RequestParamsValidator";
import { ResizedException } from "../domain/contracts/ResizerException";
import { validateFiles } from "../domain/application/RequestFilesValidator";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    try {
        validateRequestParams(req);
        const files: MultiparFile[] = new MultipartParserFileUplaoder().uploadFiles(req);
        validateFiles(files);
        const responseBuffer = await new SharpImageResizer().resize(files[0].data, 800);
        context.res = {
            body: responseBuffer
        };
    } catch (e: ResizedException | any) {
        context.res = {
            body: { message: e.message, context: e.context ?? {} },
            status: e.status | 400
        };
    }

};

export default httpTrigger;