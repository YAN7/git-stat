export function updateSubmitInfo(source, submitInfo) {
  const { username, addLines, removeLines, totalLines } = submitInfo;
  if (!source[username]) {
    source[username] = {
      addLines,
      removeLines,
      totalLines,
      projects: [submitInfo],
    };
    return source;
  }
  const { projects } = source[username];
  source[username].projects = this.updateProject(projects, submitInfo);
  source[username] = this.updateTotalInfo(source[username]);
  return source;
}

export function updateProject(projects, submitInfo) {
  const { projectCode } = submitInfo;
  let isProjectExist = false;
  const newProject = projects.map((p) => {
    if (p.projectCode === projectCode) {
      isProjectExist = true;
      return submitInfo;
    }
    return p;
  });
  if (isProjectExist) {
    return newProject;
  }
  return [...newProject, submitInfo];
}

export function updateTotalInfo(source) {
  if (source.projects?.length === 0) return source;
  source.addLines = source.removeLines = source.totalLines = 0;
  source.projects.reduce(
    (prev, next) => {
      source.addLines = source.addLines + next.addLines;
      source.removeLines = source.removeLines + next.removeLines;
      source.totalLines = source.totalLines + next.totalLines;
      return next;
    },
    { addLines: 0, removeLines: 0, totalLines: 0 },
  );
  return source;
}
