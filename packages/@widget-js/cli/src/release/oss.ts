import OSS from "ali-oss";
import fs from "fs";
import chalk from "chalk";

let packageData = JSON.parse(fs.readFileSync("./package.json").toString());
export const AccessKeyID = packageData.oss?.id ?? "default";
export const AccessKeySecret = packageData.oss?.secret ?? "default";

const headers = {
    // 指定Object的存储类型。
    'x-oss-storage-class': 'Standard',
    // 指定Object的访问权限。
    'x-oss-object-acl': 'public-read',
    'x-oss-forbid-overwrite': 'false',
    'Cache-Control': 'no-cache'
};

const clinet = new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: 'oss-cn-hangzhou',
    // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
    accessKeyId: AccessKeyID,
    accessKeySecret: AccessKeySecret,
    bucket: 'widget-fun',
});

export async function put(ossPath:string, file:any) {
    try {
        // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
        // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
        const result = await clinet.put(ossPath, file, {headers});
        console.log(chalk.green(`上传成功：${file}->${ossPath}`));
    } catch (e) {
        console.log(e);
    }
}

export async function copy(dist:string, src:string) {
    try {
        // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
        // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
        const result = await clinet.copy(dist, src, {headers});
        console.log(chalk.green(`复制成功：${src}->${dist}`));
    } catch (e) {
        console.error(e);
    }
}
