<template>
    <div class="page__center wide">
        <div class="page__row page__row_head" v-if="!mobile">
            <div class="page__col col__header d-flex flex-column flex-sm-row justify-content-space-between">
                <div class="mt-4 mt-sm-0">
                    <div class="page__hello h5" v-if="user" v-html="user.name+','"/>
                    <div class="page__welcome h2">Привет 👋</div>
                </div>

                <div class="mt-4 mt-sm-0">
                    <p class="mb-2">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle class="color" cx="7" cy="7" r="6.5" fill="#7FBA7A"/>
                        </svg>

                        <span class="color-gray ml-2 align-middle">На продвижении</span>
                    </p>
                    <p>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle class="color" cx="7" cy="7" r="6.5" fill="#FF4242"/>
                        </svg>

                        <span class="color-gray ml-2 align-middle">Есть заявки</span>
                    </p>
                </div>
            </div>
        </div>

        <div class="page__row" v-if="mobile">
            <div class="d-flex flex-row align-items-center justify-content-between">
                <h1>Мои треки</h1>
                <img :src="url + 'img/icon_plus_main.svg'" @click="openMusicModal" class="mb-2" />
            </div>
        </div>

        <div class="page__row" v-if="mobile">
             <div class="page__panel">
                <p>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle class="color" cx="6" cy="6" r="5.5" fill="#7FBA7A"/>
                    </svg>

                    <span>На продвижении</span>
                </p>
                <p>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle class="color" cx="6" cy="6" r="5.5" fill="#FF4242"/>
                    </svg>

                    <span>Есть заявки</span>
                </p>
            </div>
        </div>

        <div class="page__row page__row_border">
            <div class="page__col">
                <div class="products__grid">
                    <div class="products__banner">
                        <p class="products__banner_text1">Загрузи свой первый трек</p>
                        <p class="products__banner_text2">Твои будущие фанаты ждут! Жми<br>на кнопку «добавить трек» и переходи к продвижению прямо сейчас.</p>
                        <div class="products__item" @click="openMusicModal" v-if="!mobile">
                        <div class="products__preview new"></div>
                        <div class="products__details">
                            <div class="products__title title">Добавить трек</div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-modal id="music-modal" centered hide-footer>
            <div class="modal-center d-flex flex-column text-center mx-auto">
                <div class="form-block">
                    <input type="text" class="form-control" placeholder="Ссылка на звук в TikTok" v-model="val" required="" />
                    <p class="form-tip text-danger" v-if="error" v-html="error" />
                    <button class="btn btn-lg btn-primary btn-block my-4" @click="getMusic(val)" :disabled="!val" v-if="!waiting" v-html="val ? 'Найти трек' : 'Введите ссылку на трек'" />
                    <div class="loading" :class="{active: waiting}" />
                    <p class="form-tip" v-if="waiting" v-html="'Ищем трек, это займет от 5 до 10 секунд'" />
                </div>
            </div>
        </b-modal>

        <b-modal id="music-modal-find" centered hide-footer>
            <div class="modal-center d-flex flex-column text-center mx-auto">
                <div class="form-block">
                    <img class="imgSong" :src="this.iconSong"/>
                    <input type="text" class="form-control" placeholder="Ссылка на звук в TikTok" v-model="val" required="" />
                    <input type="text" class="form-control" placeholder="Название трека" v-model="this.title" required="" />
                    <input type="text" class="form-control" placeholder="Исполнитель трека" v-model="this.nickname" required="" />
                    <input type="text" class="form-control" placeholder="Альбом трека" v-model="this.album" required="" />
                    <button class="btn btn-lg btn-primary btn-block my-4">Добавить</button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import axios from "axios"
    import {mapGetters} from "vuex";
    import { GET_MUSIC_LIST, GET_MUSIC, ADD_MUSIC } from '../api-routes';

    export default {
        components: { },
        name: "Music",

        data() {
            return {
                editing: false,
                val: this.value,
                music: null,
                error: null,
                waiting: false,
                items: null,

                music: {},
                title: null,
                nickname: null,
                album: null,
                iconSong:null,

            }
        },

        mounted() {
            this.getMusicList();
        },

        computed: {
            ...mapGetters(['user', 'userAuthorized', 'url', 'tablet', 'mobile']),
        },

        methods: {
            openMusicModal() {
                this.waiting = this.error = false;
                this.$bvModal.show('music-modal');
            },

            closeMusicModal() {
                this.waiting = this.error = false;
                this.$bvModal.hide('music-modal');
            },

            openMusicFindModal() {
                this.waiting = this.error = false;
                this.$bvModal.show('music-modal-find');
            },

            closeMusicFindModal() {
                this.waiting = this.error = false;
                this.$bvModal.hide('music-modal-find');
            },

            getMusicList() {
                axios.get(GET_MUSIC_LIST).then(response => {
                    this.items = response.data;
                });
            },

            getMusic(url) {
                this.waiting = true;
                this.error = null;

                axios.post(GET_MUSIC, {url: url}).then(response => {
                    this.waiting = false;

                    /* TO DO */
                    this.closeMusicModal();
                    this.openMusicFindModal();
                    console.log(response);
                    this.music = response.data.music;
                    this.title = response.data.music.title;
                    this.nickname = response.data.music.authorName.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
                    this.album = response.data.music.album;
                    this.iconSong = response.data.music.coverMedium;

                    this.error = null;
                }).catch(error => {
                    console.log(error);
                    this.waiting = false;
                    if(error !== undefined) {
                        this.error = 'Не удалось найти трек, попробуйте еще раз';
                    }
                });
            },

            addMusic () {
                 axios.post(GET_MUSIC, {url: url}).then(response => {
                    this.waiting = false;
                    this.error = null;
                 }).catch (error => {
                    console.log(error);
                    this.waiting = false;
                    if(error !== undefined) {
                        this.error = 'Не удалось добавить трек, попробуйте еще раз';
                    }
                });
            },
        }

    }
</script>
