<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 车型管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.type" placeholder="车型" class="handle-input mr10"/>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        style="margin-left: 20px !important;"
                        @click="delAllSelection"
                >批量删除</el-button>
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addModels">添加车型</el-button>
                <el-checkbox v-model="visible" style="margin-left: 30px">主键</el-checkbox>
            </div>
            <el-table
                    v-loading="loading"
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"/>
                <el-table-column v-if="visible" prop="id" label="ID" width="55" align="center">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="车型" align="center">
                    <template slot-scope="scope">
                        {{scope.row.type}}
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
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
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

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="车型">
                    <el-input v-model="form.type"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { saveModels, modelsFindAll, deleteModels } from '../../api/index';
    export default {
        name: 'Dealers',
        data() {
            return {
                loading: false,
                visible: false,
                query: {
                    type: '',
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
                modelsFindAll(this.query).then(res => {
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
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {

                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {});
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delAllSelection() {
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        const length = this.multipleSelection.length;
                        this.delList = this.delList.concat(this.multipleSelection);
                        let ids = '';
                        const param = {}
                        for (let i = 0; i < length; i++) {
                            ids += this.delList[i].id + ','
                        }
                        param.ids = ids
                        deleteModels(param).then(res => {
                            if (res.success) {
                                this.$message.success(`删除成功`);
                                this.getData()
                            }
                        });
                        this.multipleSelection = [];
                    })
                    .catch(() => {});
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = Object.assign({}, row);
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                const param = Object.assign({}, this.form);
                this.editVisible = false;
                saveModels(param).then(res => {
                    if (res.success) {
                        this.$message.success(`编辑成功`);
                        this.getData()
                    }
                });
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'page', val);
                this.getData();
            },
            //添加
            addModels() {
                this.form = {};
                this.editVisible = true;
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
