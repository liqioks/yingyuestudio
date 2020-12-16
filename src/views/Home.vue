<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
-->

<template>
  <div>
    <div>
      <header class="home-header wrap " :class="{ active: headerScroll }">
        <router-link tag="i" to="./category"
          ><i class="nbicon nbmenu2"></i
        ></router-link>
        <div class="header-search">
          <span class="app-name">网易云音乐</span>
          <i class="iconfont icon-search"></i>
          <router-link
            tag="span"
            class="search-title"
            to="./product-list?from=home"
            >山河无恙，人间皆安</router-link
          >
        </div>
        <router-link class="login" tag="span" to="./login" v-if="!isLogin"
          >登录</router-link
        >
        <router-link class="login" tag="span" to="./user" v-else>
          <van-icon name="manager-o" />
        </router-link>
      </header>
    </div>
    <nav-bar />
    <swiper :list="swiperList"></swiper>
    <div class="category-list">
      <div
        v-for="item in categoryList"
        v-bind:key="item.targetId"
        @click="tips"
      >
        <img :src="item.coverImgUrl" />
        <span
          style="overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;"
          >{{ item.copywriter }}</span
        >
      </div>
    </div>

    <div class="good">
      <header class="good-header">精品歌单</header>
      <div class="good-box">
        <div
          class="good-item"
          v-for="item in hotlist"
          :key="item.id"
          @click="goToDetail(item)"
        >
          <img :src="$filters.prefix(item.coverImgUrl)" alt="" />
          <van-cell>
            <div class="custom-title">
              {{ item.name }}
              <van-tag plain type="primary">{{ item.commentCount }}</van-tag
              >&nbsp; <van-tag plain type="warning ">{{ item.tag }}</van-tag
              >&nbsp;
              <van-tag plain type="danger ">{{ item.creator.city }}</van-tag>
            </div>
            <div class="custom-title description">{{ item.description }}</div>
          </van-cell>
        </div>
      </div>
    </div>
    <div class="good">
      <header class="good-header">热门推荐</header>
      <div class="good-box">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="item in list" :key="item.id" :value="item" is-link>
            <!-- 使用 title 插槽来自定义标题 -->
            <span class="custom-title">{{ item.name }}</span>
            <van-tag plain type="primary">{{ item.usedCount }}</van-tag>
          </van-cell>
          <!-- <van-cell v-for="item in list" :key="item.id" :value="item">
            <template :slot-scope="scope">
              <span class="custom-title">{{ scope.name }}</span>
            </template>
          </van-cell> -->
        </van-list>
      </div>
    </div>
    <div class="good" :style="{ paddingBottom: '100px' }">
      <header class="good-header">最新推荐</header>
      <div class="good-box">
        <div
          class="good-item"
          v-for="item in recommends"
          :key="item.goodsId"
          @click="goToDetail(item)"
        >
          <img :src="$filters.prefix(item.goodsCoverImg)" alt="" />
          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">¥ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, nextTick } from "vue";
import { useRouter } from "vue-router";
import swiper from "@/components/Swiper";
import navBar from "@/components/NavBar";
import {
  getTop,
  getBanner,
  getTopPlaylist,
  getTopHighquality,
} from "@/service/home";
// import { getLocal } from "@/common/js/utils";
import { Toast } from "vant";
export default {
  name: "home",
  components: {
    swiper,
    navBar,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      list: [],
      hotlist: [],
      loading: false,
      finished: false,
      swiperList: [], // 轮播图列表
      isLogin: false, // 是否已登录
      headerScroll: false, // 滚动透明判断
      categoryList: [],
    });
    onMounted(async () => {
      state.isLogin = false;
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });

      const { tags } = await getTopPlaylist({ limit: 3 });
      const { playlists } = await getTop({ limit: 10 });
      const { banners } = await getBanner({ limit: 6 });
      const data = await getTopHighquality({ limit: 10 });
      state.categoryList = playlists;
      state.swiperList = banners;
      state.list = tags;
      state.hotlist = data.playlists;
      Toast.clear();
    });

    nextTick(() => {
      window.addEventListener("scroll", () => {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        scrollTop > 100
          ? (state.headerScroll = true)
          : (state.headerScroll = false);
      });
    });

    const goToDetail = (item) => {
      router.push({ path: `/product/${item.id}` });
    };

    const tips = () => {
      Toast("敬请期待");
    };

    return {
      ...toRefs(state),
      goToDetail,
      tips,
    };
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.description {
  height: 88px;
  overflow: visible;
  font-size: 10px;
}
.home-header {
  position: fixed;
  left: 0;
  top: 0;
  .wh(100%, 50px);
  .fj();
  line-height: 50px;
  padding: 0 15px;
  .boxSizing();
  font-size: 15px;
  color: #fff;
  z-index: 10000;
  .nbmenu2 {
    color: @primary;
  }
  &.active {
    background: @primary;
    .nbmenu2 {
      color: #fff;
    }
    .login {
      color: #fff;
    }
  }

  .header-search {
    background: #f74c5b;
    display: flex;
    .wh(74%, 20px);
    line-height: 20px;
    margin: 10px 0;
    padding: 5px 0;
    color: #232326;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    .app-name {
      padding: 0 10px;
      color: @primary;
      font-size: 12px;
      font-weight: bold;
      border-right: 1px solid #666;
    }
    .icon-search {
      padding: 0 10px;
      font-size: 17px;
    }
    .search-title {
      font-size: 12px;
      color: #666;
      line-height: 21px;
    }
  }
  .icon-iconyonghu {
    color: #fff;
    font-size: 22px;
  }
  .login {
    color: @primary;
    line-height: 52px;
    .van-icon-manager-o {
      font-size: 20px;
      vertical-align: -3px;
    }
  }
}
.category-list {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;

  width: 100%;
  padding-bottom: 13px;
  div {
    display: flex;
    flex-direction: column;
    width: 20%;
    text-align: center;
    img {
      .wh(45px, 45px);
      margin: 13px auto 8px auto;
      border-radius: 50%;
    }
  }
}
.good {
  .good-header {
    background: #f9f9f9;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: @primary;
    font-size: 16px;
    font-weight: 500;
  }
  .good-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .good-item {
      box-sizing: border-box;
      width: 50%;
      border-bottom: 1px solid #e9e9e9;
      padding: 10px 10px;
      img {
        display: block;
        width: 120px;
        margin: 0 auto;
      }
      .good-desc {
        text-align: center;
        font-size: 14px;
        padding: 10px 0;
        .title {
          color: #222333;
        }
        .price {
          color: @primary;
        }
      }
      &:nth-child(2n + 1) {
        border-right: 1px solid #e9e9e9;
      }
    }
  }
}
.floor-list {
  width: 100%;
  padding-bottom: 50px;
  .floor-head {
    width: 100%;
    height: 40px;
    background: #f6f6f6;
  }
  .floor-content {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    width: 100%;
    .boxSizing();
    .floor-category {
      width: 50%;
      padding: 10px;
      border-right: 1px solid #dcdcdc;
      border-bottom: 1px solid #dcdcdc;
      .boxSizing();
      &:nth-child(2n) {
        border-right: none;
      }
      p {
        font-size: 17px;
        color: #333;
        &:nth-child(2) {
          padding: 5px 0;
          font-size: 13px;
          color: @primary;
        }
      }
      .floor-products {
        .fj();
        width: 100%;
        img {
          .wh(65px, 65px);
        }
      }
    }
  }
}
</style>
