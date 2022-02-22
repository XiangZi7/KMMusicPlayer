<template lang="">
    <div class="main-container">
        <div class="main-header">
            <div class="main-header">
                <a class="menu-link-main" href="#">歌手</a>
                <div class="header-menu">
                    <router-link to="/" active-class="is-active">专辑</router-link>
                    <router-link to="/Leaderboard" active-class="is-active">排行榜</router-link>
                    <router-link to="/singerlist" active-class="is-active">歌手</router-link>
                    <router-link to="#" active-class="is-active">分类</router-link>
                </div>
            </div>
        </div>
        <div class="content-wrapper">
            <div class="content-section qx">

                <ul>
                    <li class="content-button status-button" @click="singerlist(1)">华语</li>
                    <li class="content-button status-button" @click="singerlist(2)">欧美</li>
                    <li class="content-button status-button" @click="singerlist(3)">韩国</li>
                    <li class="content-button status-button" @click="singerlist(4)">日本</li>
                </ul>
                <div class="apps-card">
                    <div class="block imgsize" v-for="item in singerlistinfo" @click="openalbum(item.id)">
                        <div style="width: 220px; height: 220px;margin-left: 15px;">
                            <img :src="item.img1v1Url" alt="" class="songlistimg2 app-card">
                            <!-- <el-image class="songlistimg app-card" :src="item.img1v1Url"></el-image> -->
                        </div>
                        <h5 class="songlisttext">{{item.name}}</h5>
                    </div>
                </div>
            </div>


        </div>


    </div>
</template>
<script>
    import { getsingerlis } from '../request/api.js'
    export default {
        data() {
            return {
                singerlistinfo: [],
            }
        },
        created() {
            this.singerlist()
        },
        methods: {
            singerlist(type = 1) {
                getsingerlis({
                    type
                }).then(res => {
                    this.singerlistinfo = res.data.list.artists
                    // console.log(this.singerlistinfo)
                })
            },
            openalbum(id) {
                this.$router.push({ path: '/album', query: { sgingid: id } })
            }
        },
    }
</script>
<style lang="">
    .content-button {
        text-decoration: none;
    }

    .songlistimg2 {
        width: 220px;
        height: 220px;
        border-radius: 50%;
        margin: 0 10px;
        cursor: pointer;
    }

    .songlisttext {
        text-align: center;
        font-weight: 500;
        cursor: pointer;
    }

    .qx {
        margin-top: 0;
    }

    .qx ul {
        display: flex;
        flex-direction: row;
        margin: 10px 0;
        padding: 0;
    }

    .qx ul li {
        list-style: none;
        margin-left: 10px;
        cursor: pointer;
    }
</style>