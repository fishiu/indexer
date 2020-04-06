<template>
    <el-container class="root-container">
        <el-header>
            <el-row gutter="10px" class="header-title">
                <el-col span="20">这里是标题</el-col>
                <el-col span="4" class="admin-name">当前工人</el-col>
            </el-row>
        </el-header>
        <el-container class="aside-main-container">
            <el-aside width="500px">
                <el-image class="bqbImg"
                          :src="picUrl"
                          :fit="picFit"
                          :preview-src-list="picUrlList"
                          alt="pic"
                ></el-image>
                <div class="picTitle">{{picName}}</div>
            </el-aside>
            <el-container>
                <el-main>
                    <el-form ref="form" label-width="80px" label-position="left">
                        <el-form-item label="图片号码">
                            <el-input v-model="gotoName" class="input-name"></el-input>
                            <el-button type="primary" @click="submit">GO!</el-button>
                        </el-form-item>
                        <el-form-item label="文字类型">
                            <el-radio-group v-model="form.textCat">
                                <el-radio border label="图文结合"></el-radio>
                                <el-radio border label="无文字"></el-radio>
                                <el-radio border label="纯文字"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="角色">
                            <el-input v-model="form.role"></el-input>
                        </el-form-item>
                        <el-form-item label="情绪">
                            <el-input v-model="form.emotion"></el-input>
                        </el-form-item>
                        <el-form-item label="风格">
                            <el-input v-model="form.style"></el-input>
                        </el-form-item>
                        <el-form-item label="主题">
                            <el-input v-model="form.topic"></el-input>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input type="textarea" v-model="form.description"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submit">提交 & NEXT</el-button>
                            <el-button type="primary" @click="submit">仅提交</el-button>
                            <el-button>重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-main>
                <el-footer>这里是信息提示区</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: 'Indexer',
        data() {
            return {
                picName: '0003.jpg',
                gotoName: '0003',
                picFit: 'cover',
                form: {
                    name: '请选择图片',
                    textCat: '图文结合',
                    role: '熊猫头',
                    emotion: '开心',
                    style: '洒脱',
                    topic: '怼人',
                    description: '这是一个表情包这是一个表情包'
                }
            };
        },
        computed: {
            picUrlList() {
                return [this.picUrl];
            },
            picUrl() {
                return require('./assets/bqbsrc/' + this.picName);
            }
        },
        methods: {
            submit() {
                alert(this.form.textCat);
            }
        }
    }
</script>

<style>
    .root-container {
    }

    .aside-main-container {
        width: 1200px;
        margin: 0 auto;
    }

    .el-header {
        background-color: deepskyblue;
    }

    .header-title {
        width: 1200px;
        margin: 0 auto;
    }

    .admin-name {
        text-align: right;
        padding-right: 20px;
    }

    .el-aside {
        background-color: #ffffff;
        border-radius: 10px;
    }

    .el-main {
        border-radius: 10px;
    }

    .el-footer {
        background-color: deepskyblue;
    }

    .bqbImg {
        width: 500px;
        margin: 25px 0;
    }

    .picTitle {
        text-align: center;
        margin-bottom: 25px;
    }

    .input-name {
        width: 200px;
        margin-right: 10px;
    }
</style>
