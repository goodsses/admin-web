<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 题目管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.question" placeholder="题目" class="handle-input mr10"/>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        style="margin-left: 20px !important;"
                        @click="delAllSelection"
                >批量删除
                </el-button>
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addDealers">添加试题</el-button>
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
                <el-table-column type="selection" width="55" align="center"/>
                <el-table-column v-if="visible" prop="id" label="ID" width="55" align="center">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column prop="question" label="问题" align="center">
                    <template slot-scope="scope">
                        {{scope.row.question}}
                    </template>
                </el-table-column>
                <el-table-column prop="optionaimg" label="图片A" align="center">
                    <template slot-scope="scope">
                        <el-image
                                class="table-td-thumb"
                                :src="scope.row.optionaimg"
                                :preview-src-list="[scope.row.optionaimg]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="optionbimg" label="图片B" align="center">
                    <template slot-scope="scope">
                        <el-image
                                class="table-td-thumb"
                                :src="scope.row.optionbimg"
                                :preview-src-list="[scope.row.optionbimg]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="answer" label="答案" align="center">
                    <template slot-scope="scope">
                        {{scope.row.answer}}
                    </template>
                </el-table-column>
                <el-table-column prop="prompt" label="提示" align="center">
                    <template slot-scope="scope">
                        {{scope.row.prompt}}
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
                        >编辑
                        </el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除
                        </el-button>
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
            <el-form ref="form" :model="form" label-width="70px" enctype="multipart/form-data">
                <el-form-item label="题目">
                    <el-input v-model="form.question"></el-input>
                </el-form-item>
                <el-form-item label="选项A">
                    <el-upload
                            action=""
                            ref="upload"
                            :accept="acceptFileType"
                            :limit="1"
                            list-type="picture-card"
                            :on-exceed="handleExceed"
                            :before-upload="beforeUpload"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :auto-upload="false">
                        <i class="el-icon-plus"></i>
                        <div slot="tip" class="el-upload_tip">只能上传jpg或png文件,且不超过3M</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="选项B">
                    <el-upload
                            action=""
                            ref="upload1"
                            :accept="acceptFileType"
                            :limit="1"
                            list-type="picture-card"
                            :on-exceed="handleExceed1"
                            :before-upload="beforeUpload1"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove1"
                            :file-list="fileList1"
                            :auto-upload="false">
                        <i class="el-icon-plus"></i>
                        <div slot="tip" class="el-upload_tip">只能上传jpg或png文件,且不超过3M</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="正确答案">
                    <el-select v-model="form.answer" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提示">
                    <el-input v-model="form.prompt"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import { saveQuestion, questionsFindAll, deleteQuestion, deleteDealers, saveDealers } from '../../api/index';

    export default {
        name: 'Dealers',
        data() {
            return {
                loading: false,
                visible: false,
                query: {
                    question: '',
                    page: 1,
                    size: 10
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                pageTotal: 0,
                options: [
                    { label: 'A', value: 'A' },
                    { label: 'B', value: 'B' }
                ],
                form: {},
                idx: -1,
                id: -1,
                // 图片上传
                fileList: [],
                fileList1: [],
                dialogImageUrl: '',
                uploadLoading: false,
                dialogVisible: false,
                acceptFileType: '*',
                downLoadLoading: ''
            };
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                this.loading = true;
                questionsFindAll(this.query).then(res => {
                    if (res.success) {
                        this.tableData = res.items;
                        this.pageTotal = res.total;
                        this.loading = false;
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
                        const param = {};
                        param.ids = row.id + ',';
                        deleteQuestion(param).then(res => {
                            if (res.success) {
                                this.$message.success('删除成功');
                                this.getData();
                            }
                        });
                    })
                    .catch(() => {
                    });
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
                        const param = {};
                        for (let i = 0; i < length; i++) {
                            ids += this.delList[i].id + ',';
                        }
                        param.ids = ids;
                        deleteQuestion(param).then(res => {
                            if (res.success) {
                                this.$message.success(`删除成功`);
                                this.getData();
                            }
                        });
                        this.multipleSelection = [];
                    })
                    .catch(() => {
                    });
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.fileList = []
                this.fileList1 = []
                this.form = Object.assign({}, row);
                let obja = new Object();
                obja.url = this.form.optionaimg;
                this.fileList.push(obja);
                let objb = new Object();
                objb.url = this.form.optionbimg;
                this.fileList1.push(objb);
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                this.uploadLoading = true;
                var that = this;
                setTimeout(function() {
                    if (that.$refs.upload.$children[0].files.length === 1) {
                        that.$refs.upload.submit();
                    } else {
                        that.uploadLoading = false;
                        that.$message({
                            type: 'error',
                            showClose: true,
                            duration: 3000,
                            message: '请选择文件!'
                        });
                    };
                    if (that.$refs.upload1.$children[0].files.length === 1) {
                        that.$refs.upload1.submit();
                    } else {
                        that.uploadLoading = false;
                        that.$message({
                            type: 'error',
                            showClose: true,
                            duration: 3000,
                            message: '请选择文件!'
                        });
                    };
                }, 100);
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'page', val);
                this.getData();
            },
            //添加
            addDealers() {
                this.form = {};
                this.fileList = [];
                this.fileList1 = [];
                this.editVisible = true;
            },
            handleExceed(files, fileList) {
                this.$message.warning('只能选择1个文件!');
            },
            handleExceed1(files, fileList1) {
                this.$message.warning('只能选择1个文件!');
            },
            handleRemove(file, fileList) {
                this.fileList = []
            },
            handleRemove1(file, fileList) {
                this.fileList1 = []
            },
            beforeUpload1(file) {
                var that = this;
                //文件类型
                var fileName = file.name.substring(file.name.lastIndexOf('.') + 1);
                var flag = true;
                if (fileName !== 'jpg' && fileName !== 'png') {
                    that.editVisible = false;
                    that.$message({
                        type: 'error',
                        showClose: true,
                        duration: 3000,
                        message: '文件类型不正确!'
                    });
                    flag = false;
                }
                if (!flag) {
                    return false;
                }
                //读取文件大小
                var fileSize = file.size;
                console.log(fileSize);
                if (fileSize > 1048576 * 3) {
                    that.editVisible = false;
                    that.$message({
                        type: 'error',
                        showClose: true,
                        duration: 3000,
                        message: '文件大于3M!'
                    });
                    return false;
                }
                that.downloadLoading = that.$loading({
                    lock: true,
                    text: '数据保存中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0,0,0,0.7)'
                });
                const param = Object.assign({}, this.form);
                let fd = new FormData();
                console.info(file);
                fd.append('file', file);
                fd.append('type', '2');
                fd.append('bean', JSON.stringify(param));
                saveQuestion(fd).then(res => {
                    if (res.success) {
                        this.downloadLoading.close();
                        this.uploadLoading = false;
                        this.editVisible = false;
                        this.$message.success(`编辑成功`);
                        this.getData();
                    }
                });
                return false;
            },
            beforeUpload(file) {
                var that = this;
                //文件类型
                var fileName = file.name.substring(file.name.lastIndexOf('.') + 1);
                var flag = true;
                if (fileName !== 'jpg' && fileName !== 'png') {
                    that.editVisible = false;
                    that.$message({
                        type: 'error',
                        showClose: true,
                        duration: 3000,
                        message: '文件类型不正确!'
                    });
                    flag = false;
                }
                if (!flag) {
                    return false;
                }
                //读取文件大小
                var fileSize = file.size;
                console.log(fileSize);
                if (fileSize > 1048576 * 3) {
                    that.editVisible = false;
                    that.$message({
                        type: 'error',
                        showClose: true,
                        duration: 3000,
                        message: '文件大于3M!'
                    });
                    return false;
                }
                that.downloadLoading = that.$loading({
                    lock: true,
                    text: '数据保存中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0,0,0,0.7)'
                });
                const param = Object.assign({}, this.form);
                let fd = new FormData();
                fd.append('file', file);
                fd.append('type', '1');
                fd.append('bean', JSON.stringify(param));
                saveQuestion(fd).then(res => {
                    if (res.success) {
                        that.downloadLoading.close()
                        this.$message.success(`编辑成功`);
                        this.editVisible = false;
                        this.getData()
                    }
                });
                return false;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
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
