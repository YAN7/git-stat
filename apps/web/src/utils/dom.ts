const sleep = (time = 100) => {
  return new Promise((res) => setTimeout(res, time))
}

export const blurBtnWhenClose = async () => {
  await sleep()
  const btns: any = document.querySelectorAll('button.feGitStat-button')
  for (let i = 0; i < btns.length; i++) {
    btns[i].blur()
  }
}
