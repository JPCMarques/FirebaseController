import { IBlogPost } from "./blog";

export interface INovelData {
    [index: string]: INovel; // Title -> Novel
}

export interface INovel {
    title: string;
    description: string;
    wattpadLink: string;
}
