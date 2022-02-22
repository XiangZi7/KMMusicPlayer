<template lang="">
    <div class="main-container">
        <div class="main-header">
            <a class="menu-link-main" href="#">最新MV</a>
            <div class="header-menu">
                <router-link to="/" active-class="is-active">专辑</router-link>
                <router-link to="/Leaderboard" active-class="is-active">排行榜</router-link>
                <router-link to="/singerlist" active-class="is-active">歌手</router-link>
                <router-link to="#" active-class="is-active">分类</router-link>
            </div>

        </div>
        <div class="content-wrapper">
            <!--MV开始 -->
            <div class="content-section">
                <div class="apps-card">
                    <div class="block" v-for="item in songMV" @click="playMV(item.id)">
                        <el-image class="app-card app-imgwithd" :src="item.cover"></el-image>
                        <h5 class="songlisttext">{{item.name}}</h5>
                    </div>
                </div>
            </div>
            <!-- MV结束 -->
        </div>

    </div>
    </div>
</template>
<script>
    import { getnewMV } from '../request/api.js'
    export default {
        data() {
            return {
                songMV: [],
            }
        },
        created() {
            this.showmv();
        },
        methods: {
            showmv() {
                getnewMV({}).then(res => {
                    this.songMV = res.data.data;
                    // console.log(this.songMV)
                })
            },
            playMV(mvid, page = 1) {
                this.$router.push({ path: '/playmv', query: { mvid: mvid } })
            }
        },
    }
</script>
<style lang="">
    .mvimg {
        border-radius: 50%;
    }

    .app-mv {
        padding: 15px;
    }

    .app-mv-text {
        border-bottom: none;
    }

    .app-card-subtextchange {
        padding-bottom: 1px;
    }

    .app-imgwithd {
        width: 380px;
        height: 220px;
        border-radius: 10px;
        margin: 0 10px;
        cursor: pointer;
    }

    .songlisttext {
        text-align: center;
        font-weight: 500;
        cursor: pointer;
    }
</style>