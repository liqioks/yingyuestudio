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
  <div class="product-detail">
    <s-header :name="detail.name"></s-header>
    <div class="detail-content">
      <div class="detail-swipe-wrap">
        <van-swipe class="my-swipe" indicator-color="#1baeae">
          <van-swipe-item
            v-for="(item, index) in detail.subscribers"
            :key="index"
          >
            <img :src="item.avatarUrl" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-info">
        <van-cell value="内容" v-for="item in detail.tracks" :key="item.id">
          <!-- 使用 title 插槽来自定义标题 -->
          <div class="listcell" @click="goTo(item)">
            <div class="cellimg">
              <img
                :src="item.al.picUrl"
                alt=""
                style="height:60px;width;60px"
              />
            </div>
            <div>
              <div>{{ item.al.name }}</div>
              <div>{{ item.name }}</div>
              <div>{{ item.playCount }}</div>
            </div>
          </div>
        </van-cell>

        <div class="product-title">
          {{ detail.goodsName || "" }}
        </div>
        <div class="product-desc">免邮费 顺丰快递</div>
        <div class="product-price">
          <span>¥{{ detail.sellingPrice || "" }}</span>
          <!-- <span>库存203</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDetail } from "@/service/good";
import sHeader from "@/components/SimpleHeader";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      detail: {
        goodsCarouselList: [],
      },
    });

    onMounted(async () => {
      const { id } = route.params;
      const { playlist } = await getDetail({ id });
      state.detail = playlist;
    });

    const goBack = () => {
      router.go(-1);
    };

    const goTo = (item) => {
      router.push({ path: `/playMiuce/${item.id}` });
    };

    return {
      ...toRefs(state),
      goBack,
      goTo,
    };
  },
  components: {
    sHeader,
  },
};
</script>

<style lang="less">
@import "../common/style/mixin";
.listcell {
  display: flex;
  div {
    flex: 2;
  }
  .cellimg {
    flex: 1;
  }
}
.product-detail {
  .detail-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .product-name {
      font-size: 14px;
    }
  }
  .detail-content {
    height: calc(100vh - 50px);
    overflow: hidden;
    overflow-y: auto;
    margin-top: 44px;
    .detail-swipe-wrap {
      .my-swipe .van-swipe-item {
        img {
          width: 100%;
          // height: 300px;
        }
      }
    }
    .product-info {
      padding: 0 10px;
      .product-title {
        font-size: 18px;
        text-align: left;
        color: #333;
      }
      .product-desc {
        font-size: 14px;
        text-align: left;
        color: #999;
        padding: 5px 0;
      }
      .product-price {
        .fj();
        span:nth-child(1) {
          color: #f63515;
          font-size: 22px;
        }
        span:nth-child(2) {
          color: #999;
          font-size: 16px;
        }
      }
    }
    .product-intro {
      width: 100%;
      padding-bottom: 50px;
      ul {
        .fj();
        width: 100%;
        margin: 10px 0;
        li {
          flex: 1;
          padding: 5px 0;
          text-align: center;
          font-size: 15px;
          border-right: 1px solid #999;
          box-sizing: border-box;
          &:last-child {
            border-right: none;
          }
        }
      }
      .product-content {
        padding: 0 20px;
        img {
          width: 100%;
        }
      }
    }
  }
  .van-action-bar-button--warning {
    background: linear-gradient(to right, #6bd8d8, @primary);
  }
  .van-action-bar-button--danger {
    background: linear-gradient(to right, #0dc3c3, #098888);
  }
}
</style>
