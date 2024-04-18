export const getSuzakuToken = (): string =>
  sessionStorage.getItem('uc-token') ??
  'OjI4NDM656iL5pmT6ImzOjc3ODYzNDo1NDc6MDozNzo0YTczNTYyYzU5ZjM0NDlmYTZlOGYzNTQxNjliMTI4NA=='

export const getFileTypeByName = (fileName: string) => {
  const fileExtension = fileName.split('.').pop()?.toLowerCase()
  return fileExtension
}

export const handlerResponseError = (res: any) => {
  try {
    const reader = new FileReader()
    reader.readAsText(res.data, 'utf-8')
    reader.onload = async () => {
      const result = JSON.parse((reader as any).result)
      window.$message.error(result.message)
    }
  } catch (err) {
    console.log(err)
  }
}

export const getContentType = (fileType?: string) => {
  let contentType = ''
  if (fileType === 'xlsx' || fileType === 'xls') {
    contentType = 'application/vnd.ms-excel'
  }
  if (fileType === 'zip') {
    contentType = 'application/zip'
  }
  return contentType
}
