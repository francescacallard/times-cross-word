export enum Loaders {
  ArticleIndexData = 'articleIndexData',
  EngagementData = 'engagementData',
  ArticleReferrerData = 'articleReferrerData'
}

export type LoadersStateType = Record<Loaders, boolean>