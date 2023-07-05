#!/usr/bin/env node

import { program } from "commander";
import download from "download-git-repo";
import inquirer from "inquirer";

program
  .version('1.0.0')
  .command('create <name>')
  .action(name => {
    inquirer.prompt([
      {
        name: 'author',
        message: '你的名字',
        default: `${name}`
      },
      {
        name: 'version',
        message: '版本号',
        default: '1.0.0'
      },
      {
        name: 'description',
        message: '项目描述',
        default: 'a web project template'
      }
    ]).then(res => {
      const { author, version, description } = res
      const beginTime = new Date().getTime()
      download('luotiancai/mw_scaffold', `./${name}`, err => {
        const time = (new Date().getTime() - beginTime) / 1000
        console.log(err || `create project finish in ${time}s`)
      })
    })
  })

program.parse(process.argv)