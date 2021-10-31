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
                <div class="products-list__grid">
                    <div class="products-list__item" v-if="!mobile">
                        <div class="products-list__preview new"></div>
                        <div class="products-list__details">
                            <div class="products-list__title">Добавить трек</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page__row page__row_border">
            <div class="page__col">
                <div class="products-list__grid">
                    <div class="products-list__item" v-for="item in items" :key="item.id" v-if="!mobile">
                        <div class="products-list__preview"></div>
                        <img :src="url + 'img/red-circle.svg'" alt="" class="products-list__circle">
                        <div class="products-list__details">
                            <p class="products-list__songer">{{ item.author }}</p>
                            <p class="products-list__song_title">{{ item.title }}</p>
                            <img :src="item.image" class="products-list__songer-icon"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import {mapGetters} from "vuex";
    import { GET_MUSIC_LIST, GET_MUSIC, ADD_MUSIC } from '../api-routes';
    export default {
        components: { },
        name: "Main",
        data() {
            return {
                editing: false,
                val: this.value,
                music: null,
                error: null,
                waiting: false,
                items: [], // песни

                title: null, // название песни
                nickname: null, // songer
                iconSong: null, // картинка
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
            getMusicList() {
                axios.get(GET_MUSIC_LIST).then(response => {
                    this.items = response.data;
                });
            },
        }
    }
</script>