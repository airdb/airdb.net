export type UiLanguage = "zh" | "en";

export type LanguageMeta = {
  code: string;
  uiLanguage: UiLanguage;
  htmlLang: string;
  label: string;
  switchLabel: string;
  homePath: string;
  brandTagline: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  newsLabel: string;
  articleLeadLabel: string;
  articleContinueLabel: string;
  sidebarLabel: string;
  homeProjectLabel: string;
  homeQuickLabel: string;
  homeHighlightsTitle: string;
  homeProjectsTitle: string;
  footerTitle: string;
  footerCopy: string;
};

export const LANGUAGE_META: Record<string, LanguageMeta> = {
  zh: {
    code: "zh",
    uiLanguage: "zh",
    htmlLang: "zh-CN",
    label: "中文",
    switchLabel: "EN",
    homePath: "/zh/",
    brandTagline: "持续公益，长期价值",
    primaryActionLabel: "了解团队方向",
    secondaryActionLabel: "查看项目成果",
    newsLabel: "公益新闻",
    articleLeadLabel: "内容导览",
    articleContinueLabel: "继续阅读",
    sidebarLabel: "目录",
    homeProjectLabel: "公益项目",
    homeQuickLabel: "核心方向",
    homeHighlightsTitle: "我们擅长的事情",
    homeProjectsTitle: "正在支持的项目",
    footerTitle: "用技术把好事做长久",
    footerCopy: "连接产品、设计、开发、运营与安全能力，为公益组织提供长期稳定的数字化支持。",
  },
  cc: {
    code: "cc",
    uiLanguage: "en",
    htmlLang: "en",
    label: "EN",
    switchLabel: "中文",
    homePath: "/cc/",
    brandTagline: "Technology with long-term value",
    primaryActionLabel: "Explore the team",
    secondaryActionLabel: "See current work",
    newsLabel: "Updates",
    articleLeadLabel: "Reading guide",
    articleContinueLabel: "Continue reading",
    sidebarLabel: "Contents",
    homeProjectLabel: "Featured work",
    homeQuickLabel: "Capabilities",
    homeHighlightsTitle: "What we focus on",
    homeProjectsTitle: "Where the work is happening",
    footerTitle: "Designing practical technology for social good",
    footerCopy: "Airdb combines product thinking, engineering, operations, and digital systems to support public-interest initiatives with clarity and continuity.",
  },
};

export function getLanguageMeta(language: string) {
  return LANGUAGE_META[language] ?? LANGUAGE_META.zh;
}
