import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: "Flyinsky's Codes",
  subtitle: '学习编程之余送给自己的一份笔记',
  lang: 'cn',
  themeHue: 250,
  banner: {
    enable: false,
    src: '/src/assets/images/avator.png',
  },
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: 'GitHub',
      url: 'https://github.com/Flyinsky2004',
      external: true,
    },{
      name: 'ChatGPT',
      url: 'https://ai.flyinsky.xyz/',
      external: true,
    }
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: '/src/assets/images/avator.png',
  name: 'Flyinsky',
  bio: '计算机科学与技术专业大二在读学生,记录学习编程的脚印',
  links: [
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/Flyinsky2004',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
