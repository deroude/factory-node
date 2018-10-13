import { Concept } from "../domain/Concept";
import fs from "fs";
import archiver from "archiver";
import uuidv4 from "uuid/v4";

export class ProjectService {

    public async generate(root: Concept, sourceFolder: string, stagingFolder: string, destinationFolder: string): Promise<string> {
        const id: string = uuidv4();
        return await this.zip(stagingFolder + "/" + id, destinationFolder + "/" + root.name + "_" + id + ".zip");
    }

    private async zip(source: string, destination: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const output: fs.WriteStream = fs.createWriteStream(destination);
            const zip = archiver("zip");
            output.on("close", () => resolve(destination));
            zip.on("error", err => reject(err.code));
            zip.pipe(output);
            zip.directory(source, destination);
            zip.finalize();
        });
    }
}