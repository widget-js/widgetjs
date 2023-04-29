export type SocialInfoType =
    "qq"
    | "wechat"
    | "qq-group"
    | "discord"
    | "telegram"
    | "tiktok"
    | "douyin"
    | "youtube"
    | "instagram"
    | "twitter"
    | "facebook"
    | "kuaishou"
    | "bilibili"
    | "github"
    | "email"
    | "gitee"
    | "homepage"

export class SocialInfo {
    name: SocialInfoType;
    content: string;

    constructor(name: SocialInfoType, url: string) {
        this.name = name;
        this.content = url;
    }
}
