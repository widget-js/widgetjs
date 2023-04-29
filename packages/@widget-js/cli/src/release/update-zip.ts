import fs from "fs";
import archiver from "archiver";

function zipDirectory(sourceDir:string, outPath:string, ignoreDir?:string[]) {
    const archive = archiver('zip', {zlib: {level: 9}});
    const stream = fs.createWriteStream(outPath);

    return new Promise<void>((resolve, reject) => {
        archive
            .glob("**/*", {cwd: sourceDir, ignore: ['node_modules/**']})
            .on('error', err => reject(err))
            .pipe(stream);

        stream.on('close', () => resolve());
        archive.finalize();
    });
}

export default zipDirectory;
