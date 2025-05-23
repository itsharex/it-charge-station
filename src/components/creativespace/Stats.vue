<template>
  <div class="layout-module_stats" ref="tooltipContainer">
    <div class="data-stats-tip">
      <div class="data-center-title">
        <p class="title-welcome">
          👋 {{ userInfo?.username }}，这是你和小站相伴的第 {{ registerDays }} 天
        </p>
        <p class="title-desc">
          数据更新至 {{ creationStatistic?.updateTime ? formatTime(new Date(creationStatistic.updateTime), 'yyyy-MM-dd') : '--' }}（每日上午更新昨日数据，"--"表示暂无数据）
        </p>
      </div>
      <div class="data-center-overview">
        <div class="overview-title">
          <div class="overview-title-info">
            <h2>数据总览</h2>
            <p>你的每一份成长都被记录</p>
          </div>
          <div class="overview-title-options">
            <Dropdown placement="bottom"
                      transfer-class-name="dropdown-background dropdown-item-all-hover"
                      trigger="click" @on-click = changeStatsOption>
              <span class="stats-range">
                {{statsOption == 1 ? '近 1 年' : statsOption == 0 ? '历 史' : ''}}
                <span class="iconfont date-range"></span>
              </span>
              <DropdownMenu slot="list">
                <DropdownItem name="1">
                  近 1 年
                  <span class="iconfont true" v-if="statsOption === 1" style="margin-left: 10px"/>
                </DropdownItem>
                <DropdownItem name="0">
                  历 史
                  <span class="iconfont true" v-if="statsOption === 0" style="margin-left: 8px"/>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div class="overview-body">
          <div>
            <p>创作天数</p>
            <p>{{ creationStatistic?.creationDays || '--' }}</p>
          </div>
          <div>
            <p>创作字数</p>
            <p>{{ creationStatistic?.creationWords || '--' }}</p>
          </div>
          <div>
            <p>内容更新</p>
            <p>{{ creationStatistic?.updateContents || '--' }}</p>
          </div>
          <div>
            <p>获得点赞</p>
            <p>{{ creationStatistic?.harvestLikes || '--' }}</p>
          </div>
        </div>
      </div>
      <div class="data-center-detail">
        <div class="detail-myData data-item">
          <div class="data-title-Info">
            <h2>个人知识创作</h2>
          </div>
          <div class="myData-common-body">
            <div>
              <p>{{ creationStatistic?.articleTotal || '--' }}</p>
              <p>文章</p>
            </div>
            <div>
              <p>{{ creationStatistic?.columnTotal || '--' }}</p>
              <p>专栏</p>
            </div>
            <div>
              <p>{{ creationStatistic?.essayTotal || '--' }}</p>
              <p>随笔</p>
            </div>
          </div>
          <div class="myData-book">
            <img src="https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*3GL9T4hyZBMAAAAAAAAAAAAADvuFAQ/original"
                 alt="">
            <div class="most-content">
              <p>其中字数最多的{{ creationStatistic?.mostColumnArticle !== null ? '专栏' : '文章' }}是{{ creationStatistic?.mostWordsTitle ? '' : ' -- ' }}</p>
              <p class="most-words-title" :title="creationStatistic?.mostWordsTitle">{{ creationStatistic?.mostWordsTitle }}</p>
              <p>共有{{ creationStatistic?.mostColumnArticle ? (' ' + creationStatistic.mostColumnArticle + ' 篇文档，') : ' -- 篇文档，' }}{{ creationStatistic?.mostWords || '-- ' }} 字</p>
            </div>
          </div>
        </div>
        <div class="detail-public data-item">
          <div class="data-title-Info">
            <h2>对外知识分享</h2>
            <a-tooltip overlayClassName="public-data-tooltip" :getPopupContainer="getTooltipContainer">
              <template slot="title">
                含公开专栏的文档及公开分享的其他文档
              </template>
              <span class="iconfont icon-doubt"></span>
            </a-tooltip>
          </div>
          <div class="public-data-common-body">
            <div>
              <p>{{ creationStatistic?.publicArticles || '--'}}</p>
              <p>公开文档</p>
            </div>
            <div>
              <p>{{ creationStatistic?.articleViews || '--' }}</p>
              <p>阅读量</p>
            </div>
            <div>
              <p>{{ creationStatistic?.contentLikes || '--' }}</p>
              <p>点赞量</p>
            </div>
            <div>
              <p>{{ creationStatistic?.contentComments || '--' }}</p>
              <p>评论量</p>
            </div>
            <div>
              <p>{{ creationStatistic?.articleFeatures ||  '--' }}</p>
              <p>收录精选</p>
            </div>
          </div>
        </div>
      </div>
      <div class="data-center-hotmap">
        <hot-map :domain="userInfo?.domain"></hot-map>
      </div>
    </div>
  </div>
</template>

<script>
  import HotMap from "@/components/common/HotMap";
  import writeCenterApi from "@/api/WriteCenterApi";
  import { formatTime } from '@/utils'
  export default {
    name: 'Stats',
    data() {
      return {
        statsOption: '1',
        creationStatistic: {
          creationDays: '--',
          creationWords: '--',
          updateContents: '--',
          harvestLikes: '--',
          articleTotal: '--',
          columnTotal: '--',
          essayTotal: '--',
          mostColumnArticle: null,
          mostWordsTitle: null,
          mostWords: '--',
          publicArticles: '--',
          articleViews: '--',
          articleFeatures: '--',
          contentLikes: '--',
          contentComments: '--'
        },
        tooltipContainer: null
      }
    },
    components: {
      HotMap
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo;
      },
      registerDays() {
        if (!this.userInfo) {
          return "--";
        }
        let regDate = new Date(this.userInfo.createTime);
        const regUTCMidnight = Date.UTC(regDate.getUTCFullYear(), regDate.getUTCMonth(), regDate.getUTCDate());
        // 获取当前时间的UTC午夜时间
        const now = new Date();
        const nowUTCMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
        // 计算天数差并加1（注册当天为第1天）
        const diffMs = nowUTCMidnight - regUTCMidnight;
        const diffDays = Math.floor(diffMs / 86400000) + 1; // 关键修正：+1
        return Math.max(diffDays, 1); // 确保非负
      }
    },
    methods: {
      formatTime,
      changeStatsOption(option) {
        if (this.statsOption === option) {
          return;
        }
        this.statsOption = option;
        writeCenterApi.getGrowthStatStatistic(this.statsOption).then(data => {
          if (data?.result) {
            this.creationStatistic = data.data;
          }
        })
      },
      getTooltipContainer() {
        return this.tooltipContainer;
      }
    },
    mounted() {
      this.tooltipContainer = this.$refs.tooltipContainer;
    },
    created() {
      writeCenterApi.getGrowthStatStatistic(this.statsOption).then(data => {
        if (data?.result) {
          this.creationStatistic = data.data;
        }
      })
    }
  }
</script>

<style scoped lang="less">
  @import '../css/creativespace/stats.less';
</style>
