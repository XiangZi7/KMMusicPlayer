interface Artist {
    img1v1Url: string;
    name: string;
}

export interface MVDetail {
    name: string;
    cover: string;
    desc: string;
    publishTime: string;
    playCount: number;
    subCount: number;
    artists: Artist[];
}

export interface Comment {
    id: number;
    user: {
        avatarUrl: string;
        nickname: string;
    };
    timeStr: string;
    ipLocation: {
        location: string;
    };
    content: string;
}

export interface CommentResponse {
    comments: Comment[];
    total: number
}