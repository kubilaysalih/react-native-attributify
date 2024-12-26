export const extractRelativePath = (filename: string, projectRoot: string): string => {
  return filename.startsWith(projectRoot)
    ? filename.slice(projectRoot.length).replace(/^\//, '')
    : filename
}