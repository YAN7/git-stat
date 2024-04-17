export class GitStatSubmitDto {
  startDate: string;
  endDate: string;
  addLines: number;
  removeLines: number;
  totalLines: number;
  submitTimes: number;
  projectName: string;
  projectCode: string;
  username: string;
  gitUsername: string;
  note?: string;
}

export class StatDateRangeDto {
  startDate: string;
  endDate: string;
}
