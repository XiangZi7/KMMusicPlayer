import { Conversation } from "@/stores/interface";
/*填充默认数据| ChatState */
export const conversationsData: Conversation[] = [
    {
        id: 1,
        messages: [
            {
                role: 'system',
                content: 'You are a helpful assistant.',
            },
            {
                role: 'user',
                content: 'goods.',
            },
        ],
    },
]

// 默认数据
export const trackListData = [
    {
        id: '27591651',
        title: 'Intro AE 86',
        artist: '陈光荣',
        album: '頭文字[イニシャル]D THE MOVIE SOUND TUNE',
        cover:
            'http://p4.music.126.net/9KeyafHLjadqSQTRS_tN5Q==/5741649720318487.jpg',
        url: 'http://music.163.com/song/media/outer/url?id=27591651.mp3',
        duration: 149000,
    },
    {
        id: '409872504',
        title: 'Ninelie',
        artist: 'Aimer',
        album: 'ninelie EP',
        cover:
            'http://p3.music.126.net/g7aakYG_Wfmrn1_IDfVUXA==/109951165050166241.jpg',
        url: 'http://music.163.com/song/media/outer/url?id=409872504.mp3',
        duration: 260675,
    },
]

export const defaultSong = {
    title: '未选择歌曲',
    artist: '未知歌手',
    cover: new URL(`@/assets/default_album.jpg`, import.meta.url).href,
}