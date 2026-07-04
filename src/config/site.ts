export type UiLanguage = "zh" | "en";

export type LanguageMeta = {
  code: string;
  uiLanguage: UiLanguage;
  htmlLang: string;
  label: string;
  switchLabel: string;
  homePath: string;
  brandTagline: string;
  newsLabel: string;
  articleLeadLabel: string;
  articleContinueLabel: string;
  sidebarLabel: string;
  footerTitle: string;
  footerCopy: string;
  copyrightLabel: string;
  filingLabel: string;
  filingUrl: string;
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
    newsLabel: "公益新闻",
    articleLeadLabel: "内容导览",
    articleContinueLabel: "继续阅读",
    sidebarLabel: "目录",
    footerTitle: "用技术把好事做长久",
    footerCopy: "持续为公益组织提供长期稳定的数字化支持。",
    copyrightLabel: "©2026 airdb 保留所有权利",
    filingLabel: "陕ICP备2022002988号-1",
    filingUrl: "https://beian.miit.gov.cn/",
  },
  cc: {
    code: "cc",
    uiLanguage: "en",
    htmlLang: "en",
    label: "EN",
    switchLabel: "中文",
    homePath: "/cc/",
    brandTagline: "Technology with long-term value",
    newsLabel: "Updates",
    articleLeadLabel: "Reading guide",
    articleContinueLabel: "Continue reading",
    sidebarLabel: "Contents",
    footerTitle: "Designing practical technology for social good",
    footerCopy: "Airdb combines product thinking, engineering, operations, and digital systems to support public-interest initiatives with clarity and continuity.",
    copyrightLabel: "©2026 airdb. All rights reserved.",
    filingLabel: "Shaanxi ICP 2022002988-1",
    filingUrl: "https://beian.miit.gov.cn/",
  },
};

export function getLanguageMeta(language: string) {
  return LANGUAGE_META[language] ?? LANGUAGE_META.zh;
}
