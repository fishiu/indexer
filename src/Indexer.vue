<template>
    <el-container class="root-container">
        <el-header>
            <el-row gutter="10px" class="header-title">
                <el-col span="14" class="big-title">表情包标引工具 V 1.0</el-col>
                <el-col span="5" class="admin-name el-icon-user-solid">
                    当前登陆人：{{admin}}
                </el-col>
                <el-col span="5">
                    <el-button icon="el-icon-edit" size="small" class="info-button" @click="drawer = true">帮助
                    </el-button>
                    <el-button type="primary" plain icon="el-icon-setting" size="small" class="info-button"
                               @click="drawer = true">设置
                    </el-button>
                </el-col>
                <el-drawer
                        title="我是标题"
                        :visible.sync="drawer"
                        :with-header="false">
                    <p>以下是使用说明：</p>
                    <p>表单第一行用于控制图片</p>
                </el-drawer>
            </el-row>
        </el-header>

        <el-container class="aside-main-container">
            <el-aside width="400px">
                <div class="image-container">
                    <el-image class="bqbImg"
                              :src="picUrl"
                              :fit="picFit"
                              :preview-src-list="picUrlList"
                              alt="pic"
                    ></el-image>
                    <div class="picTitle">{{picName}}</div>
                    <div class="picTitle">上次修改：金笑缘</div>
                </div>
            </el-aside>

            <el-container>
                <el-main>
                    <el-form ref="form" label-width="80px" label-position="left"
                             @keyup.ctrl.enter.native.prevent="submitAndNext"
                             @keyup.ctrl.219.native.prevent="goPrevPic"
                             @keyup.ctrl.221.native.prevent="goNextPic"
                             @keyup.112.native.prevent="form.textCat = '图文结合'"
                             @keyup.113.native.prevent="form.textCat = '无文字'"
                             @keyup.114.native.prevent="form.textCat = '纯文字'">
                        <el-form-item label="图片号码">
                            <el-input v-model="gotoName" class="input-name"></el-input>
                            <el-button type="primary" @click="goPic">GO !</el-button>
                            <el-button type="primary" plain @click="goPrevPic">上一张</el-button>
                            <el-button type="primary" plain @click="goNextPic">下一张</el-button>
                        </el-form-item>
                        <el-form-item label="文字类型">
                            <el-radio-group v-model="form.textCat"

                            >
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
                            <el-button type="primary" @click="submitAndNext">提交 & Next</el-button>
                            <el-button type="primary" plain @click="submit">提交</el-button>
                            <el-button>重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    function makeName(num) {
        return num.toString().padStart(4, '0');
    }

    export default {
        name: 'Indexer',
        data() {
            return {
                admin: '金笑缘',
                picName: '0002.jpg',
                gotoName: '0002',
                picFit: 'cover',
                form: {
                    name: '请选择图片',
                    textCat: '图文结合',
                    role: '熊猫头',
                    emotion: '开心',
                    style: '洒脱',
                    topic: '怼人',
                    description: '这是一个表情包这是一个表情包'
                },
                drawer: false
            };
        },
        computed: {
            picUrlList() {
                return [this.picUrl];
            },
            picUrl() {
                return '/bqbsrc/' + this.picName;
            }
        },
        methods: {
            submit() {
                alert(this.form.textCat);
            },
            submitAndNext() {
                this.submit();
                this.goNextPic();
            },
            goPrevPic() {
                let oldName = parseInt(this.picName.slice(0, 4));
                oldName--;
                let newName = makeName(oldName);
                this.picName = newName + '.jpg';
                this.gotoName = newName;
            },
            goNextPic() {
                let oldName = parseInt(this.picName.slice(0, 4));
                oldName++;
                let newName = makeName(oldName);
                this.picName = newName + '.jpg';
                this.gotoName = newName;
            },
            goPic() {
                let newName = makeName(parseInt(this.gotoName));
                this.picName = newName + '.jpg';
                this.gotoName = newName;
            },
            set1() {
                alert("set1");
                this.form.textCat = '图文结合';
            },
            set2() {
                alert("set2");
                this.form.textCat = '无文字';
            },
            set3() {
                alert("set3");
                this.form.textCat = '纯文字';
            }
        }
    }
</script>

<style>
    .root-container {
    }

    .aside-main-container {
        width: 1000px;
        margin: 0 auto;
    }

    .el-header {
        background-color: #F6F6F6;
    }

    .header-title {
        height: 60px;
        width: 1000px;
        margin: 0 auto;
    }

    .big-title {
        font-size: 20px;
        font-weight: 500;
        height: 30px;
        line-height: 30px;
        margin: 15px 0;
        padding-left: 5px;
    }

    .admin-name {
        text-align: right;
        padding-right: 30px;
        height: 30px;
        line-height: 30px;
        margin: 15px 0;
        font-size: 16px;
    }

    .info-button {
        margin: 14px 0 14px 30px;
    }

    .el-aside {
        background-color: #ffffff;
        border-radius: 10px;
        margin-right: 10px;
    }

    .el-main {
        border-radius: 10px;
    }

    .el-footer {
        background-color: deepskyblue;
    }

    .bqbImg {
        width: 366px;
        margin: 15px;
    }

    .image-container {
        margin-top: 20px;
        border-radius: 15px;
        border: solid 2px #0084ff;
    }

    .picTitle {
        text-align: center;
        margin-bottom: 10px;
    }

    .input-name {
        width: 200px;
        margin-right: 10px;
    }
</style>
