<template>
    <el-tabs class="new-tabs-header" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="摄像头" name="first">
        </el-tab-pane>
        <el-tab-pane label="地块" name="second">
        </el-tab-pane>
        <el-tab-pane label="重点地块" name="third">
        </el-tab-pane>        
    </el-tabs>
    <div class="list_box">
        <el-input class="el_input" v-model="input" :suffix-icon="Search" placeholder="请输入内容" />
        <el-tree
            :data="data"
            :props="defaultProps"
            node-key="id"
            :default-expanded-keys="defaultExpandedKeys"
            :default-checked-keys="defaultCheckedKeys"
            :current-node-key="currentKey">
            <template v-slot="{ node, data }">
            <span>
                <el-icon class="tree_icon">
                    <component :is="iconComponent(data.icon)" />
                </el-icon>
                <span>{{ node.label }}</span>
            </span>
            </template>
        </el-tree>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'
import * as Icons from '@element-plus/icons-vue';
import { Search } from '@element-plus/icons-vue'
const activeName = ref('third');
const input = ref();
const defaultCheckedKeys = ref([1]);
const currentKey = ref(1);
const handleClick = (tab,event) => {
  console.log(tab, event)
}
const data = [
  {
    id: 1,
    label: '吴宁街道',
    icon: 'FolderOpened',
    children: [{ id: 11, label: '东阳社木山', icon: 'FolderOpened' }]
  },
  {
    id: 2,
    label: '南市街道',
    icon: 'FolderOpened',
    children: [{ id: 21, label: '南市街道二', icon: 'FolderOpened' }]
  },
  {
    id: 3,
    label: '白云街道',
    icon: 'FolderOpened',
    children: [{ id: 31, label: '白云街道二', icon: 'FolderOpened' }]
  },
  {
    id:4,
    label: '江北街道',
    icon: 'FolderOpened',
    children: [{ id: 11, label: '横店画水', icon: 'FolderOpened' }]
  },
  {
    id:5,
    label: '城东街道',
    icon: 'FolderOpened',
    children: [
        { id: 11, label: '南马千祥', icon: 'FolderOpened' },
        { id: 11, label: '南马千祥', icon: 'FolderOpened' },
    ]
  },
  {
    id: 6,
    label: '六石街道',
    icon: 'FolderOpened',
    children: [
        { id: 11, label: '六石街道转角', icon: 'FolderOpened' },
        { id: 11, label: '六石街道转角', icon: 'FolderOpened' },
        { id: 11, label: '六石街道转角', icon: 'FolderOpened' },
        { id: 11, label: '六石街道转角', icon: 'FolderOpened' },
        { id: 11, label: '六石街道转角', icon: 'FolderOpened' },
        { id: 11, label: '六石街道转角', icon: 'FolderOpened' },
        { id: 11, label: '六石街道转角', icon: 'FolderOpened' },
        { id: 11, label: '六石街道转角', icon: 'FolderOpened' },
        { id: 11, label: '六石街道转角', icon: 'FolderOpened' },
        { id: 11, label: '六石街道转角', icon: 'FolderOpened' },
        
    ]
  }
];
const defaultProps = {
  children: 'children',
  label: 'label'
};

const defaultExpandedKeys = [1,11];

function iconComponent(iconName) {
  return Icons[iconName];
}
</script>

<style lang="less" scoped>
.list_box{
    .el_input{
        width: 90%;
        border: 0px;
        margin-top: 10px;
    }
    /deep/ .el-input__suffix .el-input__icon {
        color: #096b84; /* 图标颜色 */
        font-size: 15px; /* 图标大小 */
        padding-right: 10px;
    }
    /deep/ .el-input__wrapper{
        background-color: transparent;
        padding: 0px;
        box-shadow: 0 0 0 1px #096b84 inset;
    }
    /deep/ .el-input__inner{
        padding-left: 15px;
        height: 30px;
        font-size: 15px;
        border: 0px;
        color: #fff;
    }
    .tree_icon{
        margin-right: 3px;
    }
    /deep/ .el-tree{
        color: #fff;
        background-color: #131719;
        margin-top: 20px;
        font-size: 15px;

    }
    /deep/ .el-tree-node__expand-icon{
        display: none !important;
    }
    /deep/ .el-tree .el-tree-node.is-current .el-tree-node__content {
        background-color: transparent; /* 选中项目的背景色 */
        color: #ffe470; /* 选中项目的文字颜色 */
    }
    /deep/ .el-tree .el-tree-node.is-hover .el-tree-node__content {
        background-color: red; /* 设置背景色透明或和树节点一样的颜色 */
    }
    // 鼠标经过节点时高亮样式
    /deep/ .el-tree-node__content:hover {
        background-color: #b9b9b9;
    }
}

.new-tabs-header {
    /deep/ .el-tabs__content {
        padding: 0px 10px;
        color: #fff;
        font-weight: 600;
        margin-top: 5px;
    }
    /deep/ .tabs-card {
        .el-tabs__nav-scroll {
        padding: 0;
        }
    }
    /deep/ .el-tabs__nav-wrap {
        &::after {
        display: none;
        }
    }
    /deep/ .el-tabs__header {
        margin: 0;
    }
    /deep/ .el-tabs__nav-scroll {
        padding: 0 10px;
    }
    /deep/ .el-tabs__active-bar {
        background-color: #6DE8F2; 
        height: 4px;
        border-radius: 2px;
    }
    /deep/ .el-tabs__item:hover{
        span{
        color: #6DE8F2; 
        }
    }
    /deep/ .el-tabs__item.is-active {

        color: #6DE8F2;
        position: relative;
        span{
        color: #6DE8F2;
        }
    }
    /deep/ .el-tabs__item:hover {
        color: #6DE8F2;
    }
    /deep/ .el-tabs__item {
        color: #fff;
        font-size: 14px;
        font-weight: 500;
    }
    /deep/ .el-tabs.tabs-card .el-tabs__item span {
        background: none;
        box-shadow: none;
        height: 54px;
        line-height: 54px;
        min-width: 0;
        padding: 0;
        margin: 0 18px;
    }
    /deep/ .el-tab-pane{
        color: #fff;
    }
}

</style>
  