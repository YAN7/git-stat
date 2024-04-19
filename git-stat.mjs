import axios from 'axios'
import chalk from 'chalk'
import { spawnSync } from 'node:child_process'

let startDate = ''
let endDate = ''
let author = ''
const username = '何宇航'
const projectName = '代码统计工具'
const projectCode = 'git-stat'

let lines = {}
let times = 0

const tempHttp = axios.create({
	baseURL: 'https://itom-test.csair.com',
})

const matchLine = (str) => {
	const reg = /added lines: (\d+), removed lines: (\d+), total lines: (-?\d+)/
	const result = str.match(reg)
	if (!result) {
		return { addedLines: 0, removedLines: 0, totalLines: 0 }
	}
	const [, addedLines, removedLines, totalLines] = str.match(reg)
	return { addedLines, removedLines, totalLines }
}

const handleError = (result) => {
	if (result.error) {
		console.error('执行命令出错:', result.error)
		return null
	}

	if (result.status !== 0) {
		console.error('命令执行失败，退出码:', result.status)
		return null
	}
	return true
}

const getAuthor = () => {
	const result = spawnSync('git config user.name', { shell: true })
	author = result.stdout.toString().trim()
}

const statSubmitLines = () => {

	// 获取 git commit 信息
	const gitLog = `git log --since=${startDate} --until=${endDate} --author=${author} --pretty=tformat: --numstat`
	// 排除不需要统计的文件
	// 命令过长会导致在window下执行失败,先不启用
	const ignoreFiles = 'grep -vE \'package-lock.json|yarn.lock|pnpm-lock.yaml\''
	// 整理统计信息
	const stat = 'awk \'{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\\n", add, subs, loc }\''

	const command4StatSubmitLines = `${gitLog} | ${stat}`
	// const command4StatSubmitLines = `${gitLog} | ${ignoreFiles} | ${stat}`

	const result = spawnSync(command4StatSubmitLines, { shell: true })

	if (!handleError(result)) return

	lines = matchLine(result.stdout.toString().trim())

}

const statSubmitTimes = () => {
	const command4SubmitTime = `git log --author=${author} --since=${startDate} --until=${endDate}  --no-merges | grep -e 'commit [a-zA-Z0-9]*' | wc -l`
	const result = spawnSync(command4SubmitTime, { shell: true })

	if (!handleError(result)) return

	times = result.stdout.toString().trim()
}

const queryStatDate = async () => {
	const { data } = await tempHttp.get('/git-stat/getDateRange')
	startDate = data.startDate
	endDate = data.endDate
}

const reportStatInfo = async () => {
	const { addedLines, removedLines, totalLines } = lines
	const params = {
		startDate: startDate,
		endDate: endDate,
		addLines: addedLines,
		removeLines: removedLines,
		totalLines,
		submitTimes: times,
		projectName,
		username,
		gitUsername: author,
		projectCode,
	}
	await tempHttp.post('/git-stat/submit', params)
}

const beautifyLog = () => {
	console.clear()
	console.log(chalk.whiteBright(`${username},你好`))
	console.log(chalk.whiteBright(`在${startDate}至${endDate}期间, ${projectName}项目中你的代码提交信息如下：\n`))
	console.log(chalk.greenBright(`增加行数: ${lines.addedLines}`))
	console.log(chalk.hex('#F44')(`删除行数: ${lines.removedLines}`))
	console.log(chalk.yellowBright(`汇总行数: ${lines.totalLines}`))
	console.log(chalk.cyanBright(`提交次数: ${times}`))
	console.log(chalk.hex('#9ADE7B')('非常牛逼，请再接再厉'))
}

const startStat = async () => {
	try {
		getAuthor()
		await queryStatDate()
		statSubmitLines()
		statSubmitTimes()
		await reportStatInfo()
		beautifyLog()
	} catch (err) {
		console.error('执行命令出错:', err.error)
	}
}

startStat()
