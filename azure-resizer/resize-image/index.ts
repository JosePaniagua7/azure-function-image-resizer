import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { MultiparFile } from "../domain/contracts/MultipartFile";
import MultipartParserFileUplaoder from "../domain/application/MultipartParserFileUploader";
import SharpImageResizer from "../domain/application/SharpImageResizer";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const files: MultiparFile[] = new MultipartParserFileUplaoder().uploadFiles(req);
    const responseBuffer = await new SharpImageResizer().resize(files[0].data, 800);


    context.res = {
        body: responseBuffer
    };
};

export default httpTrigger;