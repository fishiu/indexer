<template>
    <el-container class="root-container">
        <el-header>
            <el-row gutter="10px" class="header-title">
                <el-col span="14" class="big-title">表情包标引工具 V 1.0</el-col>
                <el-col span="5" class="admin-name el-icon-user-solid">
                    当前登陆人：{{admin}}
                </el-col>
                <el-col span="5">
                    <el-button icon="el-icon-edit" size="small" class="info-button" @click="helpInfoVisible = true">帮助
                    </el-button>
                    <el-button type="primary" plain icon="el-icon-setting" size="small" class="info-button"
                               @click="helpInfoVisible = true">设置
                    </el-button>
                </el-col>
                <el-drawer
                        title="帮助说明"
                        :visible.sync="helpInfoVisible"
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
                            <el-input v-model="gotoName" class="input-short" prefix-icon="el-icon-setting"></el-input>
                            <el-button type="primary" @click="goPic">GO !</el-button>
                            <el-button type="primary" plain @click="goPrevPic">上一张</el-button>
                            <el-button type="primary" plain @click="goNextPic">下一张</el-button>
                        </el-form-item>
                        <el-form-item label="文字类型">
                            <el-radio-group v-model="form.textCat">
                                <el-radio label="图文结合"></el-radio>
                                <el-radio label="无文字"></el-radio>
                                <el-radio label="纯文字"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="角色">
                            <el-autocomplete id="chosenOne" v-model="roleInput" @keyup.enter.native="addRoleTag()"
                                             class="input-short" prefix-icon="el-icon-s-custom"
                                             :fetch-suggestions="querySearch"
                                             @select="addRoleTag"
                            ></el-autocomplete>
                            <el-tag
                                    v-for="roleTag in form.role"
                                    :key="roleTag"
                                    closable
                                    disable-transitions=false
                                    @close="closeTag(roleTag,1)"
                            >{{roleTag}}
                            </el-tag>
                        </el-form-item>
                        <el-form-item label="情绪">
                            <el-input v-model="emotionInput" @keyup.enter.native="addEmotionTag()"
                                      class="input-short" prefix-icon="el-icon-magic-stick"></el-input>
                            <el-tag
                                    v-for="emotionTag in form.emotion"
                                    :key="emotionTag"
                                    closable
                                    disable-transitions=false
                                    @close="closeTag(emotionTag, 2)"
                            >{{emotionTag}}
                            </el-tag>
                        </el-form-item>
                        <el-form-item label="风格">
                            <el-input v-model="styleInput" @keyup.enter.native="addStyleTag()"
                                      class="input-short" prefix-icon="el-icon-lollipop"></el-input>
                            <el-tag
                                    v-for="styleTag in form.style"
                                    :key="styleTag"
                                    closable
                                    disable-transitions=false
                                    @close="closeTag(styleTag, 3)"
                            >{{styleTag}}
                            </el-tag>
                        </el-form-item>
                        <el-form-item label="主题">
                            <el-input v-model="topicInput" @keyup.enter.native="addTopicTag()"
                                      class="input-short" prefix-icon="el-icon-s-flag"></el-input>
                            <el-tag
                                    v-for="topicTag in form.topic"
                                    :key="topicTag"
                                    closable
                                    disable-transitions=false
                                    @close="closeTag(topicTag, 4)"
                            >{{topicTag}}
                            </el-tag>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input type="textarea" v-model="form.description"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitAndNext">提交 & Next</el-button>
                            <el-button type="primary" plain @click="submit">提交</el-button>
                            <el-button @click="reset">重置</el-button>
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
                picName: '0001.jpg',
                gotoName: '0001',
                picFit: 'cover',
                form: {
                    name: '请选择图片',
                    textCat: '图文结合',
                    role: ['熊猫头'],
                    emotion: ['开心'],
                    style: ['洒脱'],
                    topic: ['怼人'],
                    description: '别复习了一起去玩吧'
                },
                helpInfoVisible: false,
                roleInput: '',
                emotionInput: '',
                styleInput: '',
                topicInput: '',
                ac: {
                    roles: [
                        {value: '猫和老鼠'},
                        {value: '熊猫头'},
                        {value: '黄脸'}
                    ]
                }
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
                this.$axios({
                    method: "post",
                    url: "apiURL",
                    data: {
                        uploadData: this.form
                    }
                }).then(response => {
                    console.log(response, "success");
                }).catch(error => {
                    alert(this.form.textCat);
                    console.log(error, "error");
                });
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
            closeTag(tag, flag) {
                let list = [];
                switch (flag) {
                    case 1:
                        list = this.form.role;
                        break;
                    case 2:
                        list = this.form.emotion;
                        break;
                    case 3:
                        list = this.form.style;
                        break;
                    case 4:
                        list = this.form.topic;
                        break;
                    default:
                }
                let index = list.indexOf(tag);
                list.splice(index, 1);
            },
            addRoleTag() {
                let input = this.roleInput.trim();
                if (this.form.role.indexOf(input) !== -1) {
                    alert("重复！");
                    return;
                }
                if (input === '') {
                    alert("空！");
                } else {
                    this.form.role.push(input);
                }
                this.roleInput = '';
            },
            addEmotionTag() {
                let input = this.emotionInput.trim();
                if (this.form.emotion.indexOf(input) !== -1) {
                    alert("重复！");
                    return;
                }
                if (input === '') {
                    alert("空！");
                } else {
                    this.form.emotion.push(input);
                }
                this.emotionInput = '';
            },
            addStyleTag() {
                let input = this.styleInput.trim();
                if (this.form.style.indexOf(input) !== -1) {
                    alert("重复！");
                    return;
                }
                if (input === '') {
                    alert("空！");
                } else {
                    this.form.style.push(input);
                }
                this.styleInput = '';
            },
            addTopicTag() {
                let input = this.topicInput.trim();
                if (this.form.topic.indexOf(input) !== -1) {
                    alert("重复！");
                    return;
                }
                if (input === '') {
                    alert("空！");
                } else {
                    this.form.topic.push(input);
                }
                this.topicInput = '';
            },
            reset() {
                this.form.role = [];
                this.form.emotion = [];
                this.form.style = [];
                this.form.topic = [];
                this.form.description = '';
            },
            createFilter(queryString) {
                return (role) => {
                    return (role.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            querySearch(queryString, cb) {
                let roles = this.ac.roles;
                let res = queryString ? roles.filter(this.createFilter((queryString))) : roles;
                cb(res);
            }
        },
        directives: {
            focus: {
                inserted: function (el) {
                    el.focus();
                }
            }
        },
        mounted() {
            let chosenOne = document.getElementById('chosenOne')
            chosenOne.focus()
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

    .el-form-item-hasTag {
        margin-bottom: 10px;
    }

    .hasTag {
        margin-bottom: 10px;
    }

    .el-form-item .el-tag {
        margin-right: 5px;
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

    .input-short {
        width: 200px;
        margin-right: 10px;
    }
</style>
