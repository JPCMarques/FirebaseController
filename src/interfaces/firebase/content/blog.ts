export interface IBlogData {
    [index: string]: IBlogPost;  // date - blogpost
}

export interface IBlogPost {
    title: string;
    subtitle: string;
    date: Date;
    content: string;
    type: PostType;
}

export enum PostType {
    APP = "APP",
    NOVEL = "NOVEL",
    REGULAR = "REGULAR",
}
