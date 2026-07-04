export type HomeContent = {
  nav: Array<{ name: string; url: string }>;
  languageLabel: string;
  heroTitle: string;
  heroBody: string;
  primaryAction: string;
  secondaryAction: string;
  focusTitle: string;
  focusItems: string[];
  impactTitle: string;
  impactYear: string;
  stats: Array<{ value: string; label: string }>;
  capabilityTitle: string;
  capabilities: Array<{ key: string; title: string; copy: string }>;
  stories: Array<{ eyebrow: string; title: string; copy: string; cta: string; image: string; tone?: "light" | "dark" }>;
  footerIntro: string;
  filingLabel: string;
  footerColumns: Array<{ title: string; items: string[] }>;
  subscribeTitle: string;
  subscribeCopy: string;
  subscribePlaceholder: string;
  subscribeButton: string;
};

export const HOME_CONTENT: Record<string, HomeContent> = {
  zh: {
    nav: [
      { name: "关于我们", url: "/zh/about/intro/" },
      { name: "我们的工作", url: "/zh/about/teamwork/" },
      { name: "合作伙伴", url: "/zh/about/pm/" },
      { name: "资源与洞见", url: "/zh/documentation/" },
      { name: "加入我们", url: "/zh/about/contribute/" },
      { name: "支持我们", url: "/zh/about/security/" },
    ],
    languageLabel: "中文 / EN",
    heroTitle: "用技术的力量\n创造更公平的世界",
    heroBody: "airdb 通过数据、软件与协作，帮助非营利组织与社区更有效地解决迫切的社会问题，让每一份善意都产生更大的影响。",
    primaryAction: "了解我们的工作",
    secondaryAction: "探索合作机会",
    focusTitle: "我们关注",
    focusItems: ["人道援助", "气候与环境", "健康与福祉", "教育与机会"],
    impactTitle: "我们的影响",
    impactYear: "截至 2024",
    stats: [
      { value: "120+", label: "合作伙伴" },
      { value: "45+", label: "国家和地区" },
      { value: "210+", label: "项目支持" },
      { value: "900 万+", label: "受益人次" },
    ],
    capabilityTitle: "我们的核心能力",
    capabilities: [
      { key: "data", title: "数据与洞见", copy: "将数据转化为可操作的洞见，支持更明智的决策。" },
      { key: "product", title: "数字产品与平台", copy: "构建开放、可扩展的数字工具，提升项目效率与透明度。" },
      { key: "cloud", title: "云与基础设施", copy: "提供安全、可靠的云能力，支持组织稳定运行。" },
      { key: "training", title: "能力建设与培训", copy: "通过培训与共创，提升团队的数字化能力。" },
      { key: "network", title: "协作与网络", copy: "连接多方伙伴，促进知识共享与协同创新。" },
      { key: "governance", title: "伦理与安全", copy: "坚守数据伦理与隐私保护，以技术向善为核心准则。" },
    ],
    stories: [
      {
        eyebrow: "影响故事",
        title: "让援助更及时、更有尊严",
        copy: "我们与合作伙伴共建数据系统，在危机发生时帮助团队更快响应，并以数据保护受助者的尊严。",
        cta: "阅读完整故事",
        image: "/images/brand/story-relief.jpg",
        tone: "light",
      },
      {
        eyebrow: "影响故事",
        title: "用开源与协作，推动气候行动",
        copy: "我们开发开放工具与数据集，支持社区监测环境变化，让气候行动建立在可靠的信息之上。",
        cta: "阅读完整故事",
        image: "/images/brand/story-river.jpg",
        tone: "dark",
      },
    ],
    footerIntro: "airdb 是一家非营利技术组织，致力于通过数据、软件与协作，支持社会组织与社区解决复杂的社会与环境挑战。",
    filingLabel: "陕ICP备2022002988号-1",
    footerColumns: [
      { title: "关于我们", items: ["我们的使命", "团队", "新闻动态", "报告与财务"] },
      { title: "我们的工作", items: ["人道援助", "气候与环境", "健康与福祉", "教育与机会"] },
      { title: "资源与洞见", items: ["博客", "研究与报告", "工具与开源", "活动与网络"] },
      { title: "支持我们", items: ["合作伙伴计划", "志愿者", "联系我们"] },
    ],
    subscribeTitle: "订阅我们的更新",
    subscribeCopy: "获取我们的最新动态与洞见。",
    subscribePlaceholder: "输入邮箱地址",
    subscribeButton: "订阅",
  },
  cc: {
    nav: [
      { name: "About", url: "/cc/about/" },
      { name: "Our Work", url: "/cc/post/" },
      { name: "Partners", url: "/cc/about/" },
      { name: "Insights", url: "/cc/post/" },
      { name: "Join Us", url: "/cc/contact/" },
      { name: "Support", url: "/cc/contact/" },
    ],
    languageLabel: "中文 / EN",
    heroTitle: "Using technology\nto build a fairer world",
    heroBody: "airdb combines data, software, and collaboration to help nonprofits and communities respond to urgent social challenges with greater clarity and impact.",
    primaryAction: "Explore our work",
    secondaryAction: "See partnership opportunities",
    focusTitle: "What we focus on",
    focusItems: ["Humanitarian aid", "Climate and environment", "Health and wellbeing", "Education and opportunity"],
    impactTitle: "Our impact",
    impactYear: "as of 2024",
    stats: [
      { value: "120+", label: "partners" },
      { value: "45+", label: "countries and regions" },
      { value: "210+", label: "projects supported" },
      { value: "9M+", label: "people reached" },
    ],
    capabilityTitle: "Our core capabilities",
    capabilities: [
      { key: "data", title: "Data and insight", copy: "Turning data into actionable insight for better decisions." },
      { key: "product", title: "Digital products and platforms", copy: "Building open, scalable tools that improve delivery and transparency." },
      { key: "cloud", title: "Cloud and infrastructure", copy: "Providing secure and dependable infrastructure for mission teams." },
      { key: "training", title: "Capacity building", copy: "Strengthening teams through shared learning, training, and co-creation." },
      { key: "network", title: "Collaboration and networks", copy: "Connecting partners to unlock stronger coordination and shared knowledge." },
      { key: "governance", title: "Ethics and safety", copy: "Grounding every system in privacy, trust, and responsible technology." },
    ],
    stories: [
      {
        eyebrow: "Impact story",
        title: "Making relief faster and more dignified",
        copy: "We work with partners to build systems that help teams respond quickly in moments of crisis while protecting the dignity of the people they serve.",
        cta: "Read the full story",
        image: "/images/brand/story-relief.jpg",
        tone: "light",
      },
      {
        eyebrow: "Impact story",
        title: "Open tools for climate action",
        copy: "We create open technology and shared data so communities can track environmental change and act on trustworthy information.",
        cta: "Read the full story",
        image: "/images/brand/story-river.jpg",
        tone: "dark",
      },
    ],
    footerIntro: "airdb is a nonprofit technology organization using data, software, and collaboration to help communities solve complex social and environmental challenges.",
    filingLabel: "Shaanxi ICP 2022002988-1",
    footerColumns: [
      { title: "About", items: ["Mission", "Team", "News", "Reports and finance"] },
      { title: "Our work", items: ["Humanitarian aid", "Climate", "Wellbeing", "Education"] },
      { title: "Insights", items: ["Blog", "Research", "Open tools", "Events and networks"] },
      { title: "Support", items: ["Partner", "Volunteer", "Contact"] },
    ],
    subscribeTitle: "Subscribe for updates",
    subscribeCopy: "Get our latest news and insight.",
    subscribePlaceholder: "Enter your email",
    subscribeButton: "Subscribe",
  },
};
