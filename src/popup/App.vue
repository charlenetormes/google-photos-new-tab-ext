<template>
    <div class="relative bg-white overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                <svg
                    class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                    fill="currentColor"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <polygon points="50,0 100,0 50,100 0,100" />
                </svg>
                <NavBar></NavBar>

                <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                    <transition
                        enter-active-class="duration-150 ease-out"
                        enter-from-class="opacity-0 scale-95"
                        enter-to-class="opacity-100 scale-100"
                        leave-active-class="duration-100 ease-in"
                        leave-from-class="opacity-100 scale-100"
                        leave-to-class="opacity-0 scale-95"
                    >
                        <Home></Home>
                    </transition>
                </main>
            </div>
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
