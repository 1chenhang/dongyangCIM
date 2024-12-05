<template>
    <div class="error">
        <div class="img"></div>
        <div class="content">
            <h1>403</h1>
            <div class="desc">抱歉，你无权访问该页面</div>
            <div class="actions">
                <router-link :to="{ path: '/' }">
                    <el-button type="primary" plain>返回首页</el-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import 'style.less';

.img {
    background-image: url('/public/image/error/403.svg')
}
</style>
