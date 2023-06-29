import path from "path";
import fs from "fs";
import SSHConfig from "@widget-js/ssh-config";
import os from "os";
import Client from "ssh2-sftp-client";
import consola from "consola";
import inquirer from "inquirer";
import ora from "ora";
import * as process from "process";
import {getPackageVersion} from "../utils";


interface PasswordAnswer {
  password: string
}

async function checkParentDir(ftpClient: Client, file: string, onMkdir: (dir: string) => void) {
  let dir = path.dirname(file)
  const dirExists = await ftpClient.exists(dir)
  if (!dirExists) {
    onMkdir(dir)
    await ftpClient.mkdir(dir, true)
  }
}

async function runSSH(sshConfig: Record<string, string | string[]>, releaseConfig: ReleaseConfig) {
  consola.info('run ssh:', sshConfig)
  const answer = await inquirer
    .prompt<PasswordAnswer>([{type: 'password', name: 'password', mask: '*', message: 'Enter key pair password'}])

  let ftpClient = new Client()
  const port = sshConfig['Port']
  const key = fs.readFileSync(path.resolve(os.homedir(), '.ssh/id_rsa'))
  const spinner = ora('Connecting')
  try {
    spinner.start()
    await ftpClient.connect({
      host: sshConfig['HostName'] as string,
      port: port ? parseInt(port as string) : 22,
      username: sshConfig['User'] as string,
      passphrase: answer.password,
      privateKey: key,
    })
    releaseConfig.fileMap.sort((it1, it2) => (it1.order ?? 0) - (it2.order ?? 0))
    // upload files
    for (let item of releaseConfig.fileMap) {
      if (typeof item.src == 'string') {
        if (item.remoteCopy) {
          await checkParentDir(ftpClient, item.dest, dir => {
            spinner.warn(`Create Dir: ${dir}`)
          })
          let destExists = await ftpClient.exists(item.dest)
          if (destExists) {
            spinner.warn(`Delete exists file:${item.dest}`)
            await ftpClient.delete(item.dest)
          }
          spinner.info(`Copying File: ${item.src} -> ${item.dest}`)
          await ftpClient.rcopy(item.src, item.dest)
        } else {
          const localFile = path.resolve(process.cwd(), item.src as string)
          if (!item.remoteCopy && !fs.existsSync(localFile)) {
            spinner.warn(`Skip not exists file:${localFile}`)
            continue
          }
          if (fs.lstatSync(localFile).isDirectory()) {
            spinner.info(`Uploading Dir: ${localFile} -> ${item.dest}`)
            await ftpClient.uploadDir(localFile, item.dest)
          } else {
            await checkParentDir(ftpClient, item.dest, dir => {
              spinner.warn(`Create Dir: ${dir}`)
            })
            spinner.info(`Uploading File: ${localFile} -> ${item.dest}`)
            await ftpClient.put(localFile, item.dest)
          }
        }
      } else {
        await ftpClient.put(Buffer.from(JSON.stringify(item.src), 'utf-8'), item.dest)
      }
    }
    spinner.succeed('Files uploaded!')
    await ftpClient.end()
  } catch (e) {
    spinner.fail(`Connection error:${e}`)
    await ftpClient.end()
  }
}

export async function ftpUpload() {
  // 读取
  const releaseJsonFilePath = path.join(process.cwd(), 'release.json')
  const packageVersion = getPackageVersion()
  consola.info('Package Version:', packageVersion)

  let releaseJson = fs.readFileSync(releaseJsonFilePath).toString().replaceAll('${version}', packageVersion);
  const releaseConfig = JSON.parse(releaseJson) as ReleaseConfig
  const sshConfigFile = path.resolve(os.homedir(), '.ssh/config')
  consola.info('SSH Config File Path:', sshConfigFile)
  const sshConfigs = SSHConfig.parse(fs.readFileSync(sshConfigFile).toString())
  for (let host of releaseConfig.ftpConfig.host) {
    let sshConfig = sshConfigs.compute(host)
    if (!sshConfig) {
      consola.error(`SSH config ${releaseConfig.ftpConfig.host} not found`)
      return
    }
    await runSSH(sshConfig, releaseConfig)
  }

}


export interface ReleaseConfig {
  fileMap: {
    src: string | object
    dest: string
    remoteCopy: boolean
    order: number
  }[]
  ftpConfig: FTPConfig
}

export interface FTPConfig {
  host: string[]
}
