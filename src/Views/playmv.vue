<template lang="">
    <div class="main-container">
        <div class="content-wrapper">
            <div class="content-section">
                <video controls autoplay loop :src="mvUrl" style="width: 100%; border-radius: 10px;"></video>
                <!-- 热门评论开始 -->
                <h4 class="fontcolor">MV评论</h4>
              
                <div class="content-section mvtop">
                    <div class="apps-card">
                        <div class="app-card app-mv" v-for="item in mvComments">
                            <img :src="item.user.avatarUrl " alt=" " width="50 " class="mvimg">
                            <span>{{item.user.nickname}}</span>
                            <div class="app-card__subtext app-mv-text app-card-subtextchange">{{item.content}} </div>
                            <div class="app-card__subtext app-mv-text app-card-subtextchange">
                                <span style="float:left;">{{item.likedCount}}   赞</span>
                                <span style="float: right;">{{item.timeStr}}</span></div>
                        </div>
                    </div>
                    <!-- //MV分页 -->
                    <div class="block">
                        <el-pagination v-if="mvcount!=0" @current-change="mvhandleCurrentChange"
                            :current-page.sync="mvcurrentPage" :page-size="15" layout="prev, pager, next, jumper"
                            :total="mvcount" :background="true">
                        </el-pagination>
                    </div>
                    <!-- //MV分页 -->
                </div>
                <!-- 热门评论结束 -->
            </div>
        </div>
    </div>
</template>
<script>
    import { getMVApi, getcommentMV } from '../request/api.js'

    export default {
        data() {
            return {
                mvUrl: "",
                mvComments: [],
                //mv分页
                mvcount: "",
                mvcurrentPage: 1,
                mvidd: "",
            }
        },
        created() {
            this.playMV()
        },
        methods: {
            //mv分页
            mvhandleCurrentChange: function (mvcurrentPage) {
                // console.log(`当前页: ${currentPage}`);
                this.mvcurrentPage = mvcurrentPage;
                // console.log("我是第一"+this.mvcurrentPage)
                this.playMV(this.mvidd, mvcurrentPage)
            },
            //MV
            playMV(mvid,page = 1) {
                getMVApi({
                    id: this.$route.query.mvid
                }).then(res => {
                    this.mvUrl = res.data.data.url;
                });
                this.mvidd = this.$route.query.mvid
                //热门评论
                getcommentMV({
                    id: this.mvidd,
                    limit: 15,
                    offset: (page - 1) * 15,
                }).then(res => {
                    this.mvComments = res.data.comments;
                    // console.log("我是评论"+this.mvComments)
                    this.mvcount = res.data.total;
                    // console.log("我是最后面"+page)
                })
            }
        },
    }
</script>
<style lang="">
    .fontcolor {
        color: var(--inactive-color);
    }

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
    .mvtop{
        margin-top: 1px;
    }
</style>