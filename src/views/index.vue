<template>
    <div class="index">
        <a-card>
            <a-button type="primary" :disabled="recordType==='initRecorder'" @click="initRecorder">开启麦克风</a-button>
            <a-button @click="closeRecorder" :disabled="recordType==='closeRecorder'">关闭麦克风</a-button>
        </a-card>
        <a-card class="chat-box">
            <ul class="chat" ref="chatbox">
                <li class="chat-item" v-for="(item,i) in chatList" :key="i">
                    <p style="margin-top：20px">
                        <audio :src="item.data" controls></audio>
                    </p>
                </li>
            </ul>
        </a-card>
    </div>
</template>
<script type="text/javascript">
import Recorder from '@/utils/recorder';
import { debounce } from "@/utils/index";
export default {
    name: "index",
    data() {
        return {
            recorder: null, // 音频实例
            recordType: 'closeRecorder',  // 录音状态
            gumStream: null,  // 监听音频输入
            audioInput: null,  // 音频接收
            isRecording: false,  // 是否正在录音
            chatList: [],
        }
    },
    mounted() {
        this.initRecorder();
    },
    methods: {
        initRecorder() {
            if(this.recordType==='initRecorder') return;
            try {
                // webkit shim
                window.AudioContext = window.AudioContext || window.webkitAudioContext;
                window.URL = window.URL || window.webkitURL;
                const that = this;
                navigator.mediaDevices.getUserMedia({audio: true, video:false}).then(function(stream) {
                    console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
                    that.recordType = 'initRecorder';
                    const audioContext = new AudioContext({sampleRate:16000});
                    const audioInput = audioContext.createMediaStreamSource(stream); //将麦克风的声音输入这个对象
                    const levelChecker = audioContext.createScriptProcessor(4096,1,1); //创建一个音频分析对象，采样的缓冲区大小为4096，输入和输出都是单声道
                    
                    that.gumStream = stream;
                    that.audioInput = audioInput;
                    that.levelChecker = levelChecker;

                    const stopRecorder = debounce(that.stopRecording, 3000); // 防抖延迟5s停止录音
                    audioInput.connect(levelChecker); //将该分析对象与麦克风音频进行连接
                    levelChecker.onaudioprocess = function(e) { //开始处理音频
                        try {
                            let buffer = e.inputBuffer.getChannelData(0); //获得缓冲区的输入音频，转换为包含了PCM通道数据的32位浮点数组
                            const maxvo = Math.max.apply(null, buffer);
                            //显示音量值
                            if(maxvo>.5){
                                console.log("开始说话了："+Math.round(maxvo*100));
                                that.startRecording();  // 开始录音
                                stopRecorder();  // 停止录音
                            }
                        } catch (error) {
                            console.log("哪里错了==》",error)
                        }
                    };
                    audioInput.connect(levelChecker);
                    levelChecker.connect(audioContext.destination);
                }).catch(function(e) {
                    console.log('No live audio input: ' + e);
                })
            } catch (e) {
                console.log("该浏览器暂不支持录音功能")
            }
        },
        closeRecorder() {
            if(this.recordType==='closeRecorder')return;
            this.recordType = 'closeRecorder';
            if(this.isRecording) this.stopRecording();
            this.levelChecker.disconnect();
            this.audioInput.disconnect();
            if (this.gumStream) {
                this.gumStream.getAudioTracks().forEach(function(track) {
                    track.stop();
                });
                this.gumStream = null;
            }
        },
        startRecording() {
            if(this.isRecording) return;
            try {
                this.isRecording = true;
                console.log("开始录音");
                this.recorder = new Recorder(this.audioInput,{numChannels:1, sampleRate: 16000});
                this.$nextTick(() => {
                    this.recorder.record();
                })
            } catch (error) {
                console.log("录音失败==》",error);
            }
        },
        stopRecording() {
            const that = this;
            if(!that.isRecording) return;
            that.isRecording = false;
            console.log("停止录音");
            that.recorder.stop();
            that.recorder.exportWAV(function(blob) {
                let url = URL.createObjectURL(blob);
                const newChatList = Object.assign([],that.chatList);
                newChatList.push({ data: url });
                that.$set(that, 'chatList', newChatList);

                const reader = new FileReader();
                reader.onloadend = function() { // 获取语音base64数据
                    const base64data = reader.result;
                    
                }
                reader.readAsDataURL(blob);
            })
            that.recorder.clear();
        }
    }
}
</script>
<style lang="less" scoped>
.index {
    width: 100%;
    height: 100%;
    /deep/.chat-box {
        height: calc(100% - 82px);
        overflow: hidden;
        .ant-card-body {
            width: 100%;
            height: 100%;
            padding: 0;
        }
        .chat {
            width: 100%;
            height: 100%;
            padding: 20px;
            overflow-y: auto;
            margin-bottom: 0;
            &-item {
                width: 100%;
                padding: 5px 0;
                .head {
                    img {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                    }
                }
                .message {
                    max-width: 70%;
                    padding: 5px 10px;
                    border-radius: 3px;
                    &.robot {
                        background: #eee;
                        &::after {
                            content: "";
                            position: absolute;
                            border-width: 5px;
                            border-style: solid;
                            border-color: transparent #eee transparent transparent;
                            top: 10px;
                            right: 100%;
                        }
                    }
                    &.user {
                        background: #b8dfff;
                        &::after {
                            content: "";
                            position: absolute;
                            border-width: 5px;
                            border-style: solid;
                            border-color: transparent transparent transparent #b8dfff;
                            top: 10px;
                            left: 100%;
                        }
                    }
                    img {
                        max-width: 200px;
                        max-height: 200px;
                    }
                }
            }
        }
    }            
}
</style>