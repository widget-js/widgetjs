import fs from 'fs'
import path from 'path'
import promptChecker from '../promts/promptChecker.js'
import zipDirectory from './update-zip.js'
import {copy, put} from './oss.js'
import chalk from 'chalk'
import {ftpUpload} from './ftp'

async function delay(time: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

const release = async (options: any) => {
  if (options.type == 'ftp') {
    await ftpUpload()
    return
  }
  const packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
  const changelogJSON = JSON.parse(fs.readFileSync('changelog.json', 'utf-8'))
  const version = packageJSON['version']
  const changelog = changelogJSON[version]

  let needUpdateElectron = await promptChecker({
    type: 'confirm',
    name: 'electron',
    message: chalk.blue('用户是否需要更新Electron?'),
  })
  //
  // let needUpdateNodeModule = await promptChecker({
  //     type: "confirm",
  //     name: 'electron',
  //     message: chalk.blue("用户是否需要更新node_module?")
  // });

  const versionInfo = {
    version: version,
    releaseNote: changelog,
    updateElectron: needUpdateElectron,
    updateNodeModule: false,
    updateWindowsApi: false,
    downloadLink: '',
  }

  let installerPath = path.join(`./packaged/widgets-${version}-setup-win-x64.exe`)
  if (!fs.existsSync(installerPath)) {
    installerPath = path.join(`./packaged/electron-${version}-setup-win-x64.exe`)
  }
  if (!fs.existsSync(installerPath)) {
    installerPath = path.join(`./packaged/app-${version}-setup-win-x64.exe`)
  }
  const updateZipPath = path.join(`./packaged/update.zip`)

  console.log(chalk.blue('压缩更新文件中'))
  await zipDirectory('./release', updateZipPath)

  console.log(chalk.blue('上传installer.exe到OSS'))
  await put('version/installer.exe', installerPath)

  console.log(chalk.blue('上传update.zip到OSS'))
  await put('version/update.zip', updateZipPath)

  console.log(chalk.blue('更新版本信息'))
  versionInfo.downloadLink = 'https://widget-fun.oss-cn-hangzhou.aliyuncs.com/version/update.zip'
  const versionJSON = JSON.stringify(versionInfo, null, 2)
  await put('version/version.json', Buffer.from(versionJSON))

  copy(`version/history/${version}.exe`, 'version/installer.exe')
  copy(`version/history/update-${version}.zip`, 'version/update.zip')

  console.log(chalk.yellow(versionJSON))
}

export default release
