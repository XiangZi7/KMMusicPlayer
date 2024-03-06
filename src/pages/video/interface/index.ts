import {CommentMV} from "@/api/interface";

export interface MV {
  id: number;
  cover: string;
  name: string;
}

export interface MVDetail {
  id?: number;
  name?: string;
  artists?: Artist[];
  commentCount?: number;
}

export interface Artist {
  id: number;
  name: string;
}

export interface mvDetails {
  mvSrc: string;
  mvInfo: MVDetail;
  commentsList: { total: number, comments: CommentMV[] };
}
