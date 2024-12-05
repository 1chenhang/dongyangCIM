<template>
    <div class="error">
        <div class="img"></div>
        <div class="content">
            <h1>404</h1>
            <div class="desc">抱歉，你访问的页面不存在</div>
            <div class="actions">
                <router-link :to="{ path: '/login' }">
                    <el-button type="primary" plain>返回首页</el-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import 'style.less';

.img {
    background-image: url('/public/image/error/404.svg')
}
</style>
