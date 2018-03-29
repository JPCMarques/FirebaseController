import { IApp, IAppData } from "./content/app";
import { IBlogData, IBlogPost } from "./content/blog";
import { INovel, INovelData } from "./content/novel";

export abstract class BaseRefs {
    public static DATA_STORE = "dataStore";
    public static CONTENT = BaseRefs.DATA_STORE + "/content";
    public static BLOG_POSTS = BaseRefs.CONTENT + "/blogPosts";
    public static NOVELS = BaseRefs.CONTENT + "/novels";
    public static APPS = BaseRefs.CONTENT + "/apps";
}

export interface IDataStore {
    content: {
        blogPosts: IBlogData;
        novels: INovelData;
        apps: IAppData;
    };
}

export function setNovel(dataStore: IDataStore, novel: INovel): void {
    dataStore.content.novels[novel.title] = novel;
}

export function setApp(dataStore: IDataStore, app: IApp): void {
    dataStore.content.apps[app.title] = app;
}

export function setBlogPost(dataStore: IDataStore, blogPost: IBlogPost): void {
    dataStore.content.blogPosts[blogPost.date.valueOf()] = blogPost;
}

export function novelRef(novel: INovel): string {
    return `${BaseRefs.NOVELS}/${novel.title}`;
}

export function blogPostRef(post: IBlogPost): string {
    return `${BaseRefs.BLOG_POSTS}/${post.date.valueOf()}`;
}

export function appRef(app: IApp): string {
    return `${BaseRefs.APPS}/${app.title}`;
}
