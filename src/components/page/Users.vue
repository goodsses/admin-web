<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 客户管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="姓名" class="handle-input mr10"/>
                <el-input v-model="query.mobile" placeholder="手机号" class="handle-input mr10"/>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-checkbox v-model="visible" style="margin-left: 30px">主键</el-checkbox>
            </div>
            <el-table
                    :data="tableData"
                    v-loading="loading"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column v-if="visible" prop="id" label="ID" width="55" align="center">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" align="center">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="电话" align="center">
                    <template slot-scope="scope">
                        {{scope.row.phone}}
                    </template>
                </el-table-column>
                <el-table-column prop="dealerid" label="车型" align="center">
                    <template slot-scope="scope">
                        {{scope.row.type}}
                    </template>
                </el-table-column>
                <el-table-column prop="dealerid" label="城市" align="center">
                    <template slot-scope="scope">
                        {{scope.row.city}}
                    </template>
                </el-table-column>
                <el-table-column prop="dealerid" label="经销商名称" align="center">
                    <template slot-scope="scope">
                        {{scope.row.jxsname}}
                    </template>
                </el-table-column>
                <el-table-column prop="dealerid" label="经销商简称" align="center">
                    <template slot-scope="scope">
                        {{scope.row.jxsjc}}
                    </template>
                </el-table-column>
                <el-table-column prop="createtime" label="创建时间">
                    <template slot-scope="scope">
                        {{scope.row.createtime}}
                    </template>
                </el-table-column>
                <el-table-column prop="updatetime" label="修改时间">
                    <template slot-scope="scope">
                        {{scope.row.updatetime}}
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.page"
                        :page-size="query.size"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import { usersFindAll } from '../../api/index';
    export default {
        name: 'Dealers',
        data() {
            return {
                loading: false,
                visible: false,
                query: {
                    name: '',
                    mobile: '',
                    page: 1,
                    size: 10
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1
            };
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                this.loading = true
                usersFindAll(this.query).then(res => {
                    if (res.success) {
                        this.tableData = res.items;
                        this.pageTotal = res.total;
                        this.loading = false
                    }
                });
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'page', 1);
                this.getData();
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'page', val);
                this.getData();
            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
