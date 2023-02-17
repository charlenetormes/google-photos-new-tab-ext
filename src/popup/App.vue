<template>
    <div class="relative bg-white overflow-hidden">
        <div class="max-w-7xl mx-auto flex flex-col items-center justify-center my-40">
            <h1 class="text-2xl">Welcome to Memoria</h1>
            <p class="text-xs mx-8 text-center">Display your favorite random photos everyday from your google photos library.</p>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import Home from './views/Home.vue'
import NavBar from './components/NavBar.vue'

export default {
    setup() {
        return {}
    },
    components: {
        Home,
        NavBar,
    },
    computed: {
        ...mapState({
            count: (state) => state.count,
        }),
    },
    methods: {
        ...mapMutations({
            incrementClick: 'increment',
        }),
    },
}
</script>
