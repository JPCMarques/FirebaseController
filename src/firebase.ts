import * as firebase from "firebase";
import "firebase/app";
import "firebase/auth";
import "firebase/database";
import * as winston from "winston";

import { isUndefined } from "util";
import { Constants } from "./constants";
import { IApp } from "./interfaces/firebase/content/app";
import { IBlogPost, PostType } from "./interfaces/firebase/content/blog";
import { INovel } from "./interfaces/firebase/content/novel";
import { BaseRefs, IDataStore, setBlogPost, setNovel } from "./interfaces/firebase/datastore";
import { logError, logInfo } from "./util/logController";

export class FirebaseHandler {
    private firebase!: firebase.app.App;
    private dataStore?: IDataStore;

    public constructor(email: string, pwd: string) {
        const config = {
            apiKey: "AIzaSyDR6z5Jogk6FR81CHEImJ6Uz3LcNFsQqP0",
            authDomain: "jpcmarques-website.firebaseapp.com",
            databaseURL: "https://jpcmarques-website.firebaseio.com",
            projectId: "jpcmarques-website",
            storageBucket: "jpcmarques-website.appspot.com",
            // tslint:disable-next-line:object-literal-sort-keys
            messagingSenderId: "418309114077",
        };
        this.firebase = firebase.initializeApp(config);
        this.firebase.auth().signInWithEmailAndPassword(email, pwd).then(() => {
            this.loadDataStore();
        }).catch((err) => {
            logInfo(err);
        });
    }

    public async createNovel(title: string, description: string, wattpadLink: string): Promise<INovel>  {
        const novel: INovel = {
            description,
            title,
            wattpadLink,
        };

        this.setNovelData(novel);
        return Promise.resolve(novel);
    }

    public async createBlogPost(title: string,
                                subtitle: string,
                                date: Date,
                                content: string,
                                type: PostType): Promise<IBlogPost> {
        const post: IBlogPost = {
            content,
            date,
            subtitle,
            title,
            type,
        };

        this.setBlogData(post);
        return Promise.resolve(post);
    }

    public async createApp(title: string, description: string, sourceCodeLink: string): Promise<IApp> {
        const app: IApp = {
            description,
            sourceCodeLink,
            title,
        };

        this.setAppData(app);
        return Promise.resolve(app);
    }

    private getData(path: string): Promise<any> {
        return this.firebase.database().ref(path).once("value");
    }

    private setRemoteData(path: string, data: any): void {
        this.firebase.database().ref(path).set(data);
    }

    private setAppData(data: IApp): void {
        this.setRemoteData(BaseRefs.APPS + "/" + data.title, data);
        if (isUndefined(this.dataStore)) {
            this.loadDataStore().then((dataStore) => {
                dataStore.content.apps[data.title] = data;
            });
        } else {
            this.dataStore.content.apps[data.title] = data;
        }
    }

    private setBlogData(data: IBlogPost): void {
        this.setRemoteData(BaseRefs.BLOG_POSTS + "/" + data.date.valueOf(), data);
        if (isUndefined(this.dataStore)) {
            this.loadDataStore().then((dataStore) => {
                setBlogPost(dataStore, data);
            });
        } else {
            setBlogPost(this.dataStore, data);
        }
    }

    private setNovelData(data: INovel): void {
        this.setRemoteData(BaseRefs.NOVELS + "/" + data.title, data);
        if (isUndefined(this.dataStore)) {
            this.loadDataStore().then((dataStore) => {
                setNovel(dataStore, data);
            });
        } else {
            setNovel(this.dataStore, data);
        }
    }

    private async loadDataStore(attempts: number =  3): Promise<IDataStore> {
        return this.getData(BaseRefs.DATA_STORE).then((snapshot) => {
            return this.dataStore = snapshot.val();
        }).catch((err) => {
            logError(Constants.DATA_FETCH_FAIL, {attempt: 3 - attempts, message: err});
            if (attempts !== 0) { return this.loadDataStore(--attempts); }
            return err;
        });
    }
}
