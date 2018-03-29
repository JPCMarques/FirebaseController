export interface IAppData {
    [index: string]: IApp;
}

export interface IApp {
    title: string;
    description: string;
    sourceCodeLink: string;
}
