<template>
    <div class="relative bg-white overflow-hidden w-screen h-screen" :style="root_style">
        <Loader v-if="isLoading" />
        <div v-else class="video-bg__wrapper" :style="root_style"></div>
        <div class="w-full h-full relative">
            <span
                v-if="!isLoggedIn"
                class="text-white absolute top-0 right-0 py-2 px-5 text-lg cursor-pointer hover:text-blue-500"
                @click="login"
                >Login</span
            >
            <span v-else class="text-white absolute top-0 right-0 py-2 px-5 text-lg cursor-pointer hover:text-blue-500" @click="logout"
                >Logout</span
            >
        </div>
    </div>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { MenuIcon, XIcon } from '@heroicons/vue/outline'
import Loader from './Loader.vue'
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'

const isLoading = ref(false)
const isLoggedIn = ref(false)
const root_style = ref({
    backgroundImage: ``,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: 'black',
})

const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
]

onMounted(async () => {
    try {
        const storage = await chrome.storage.local.get(['today_bg', 'isUserLoggedIn'])

        console.log('storage:', storage)

        const now = dayjs().format('YYYY MMMM DD')

        if (!storage?.isUserLoggedIn) {
            isLoggedIn.value = false
            return
        }

        isLoggedIn.value = true

        if ((!storage?.today_bg?.photoUrl && !storage?.today_bg?.date) || storage.today_bg.date !== now) {
            const photoUrl = await login()

            await chrome.storage.local.set({
                today_bg: {
                    photoUrl: photoUrl,
                    date: now,
                },
                isUserLoggedIn: true,
            })
        } else {
            root_style.value = {
                backgroundImage: `url(${storage?.today_bg?.photoUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundColor: 'black',
            }
        }
    } catch (e) {
        console.log('not logged in yet')
        isLoggedIn.value = false
    }
})

const login = async () => {
    try {
        isLoading.value = true
        const token = await oauth2()
        if (token) {
            const photoUrl = await fetchPhoto(token)
            const now = dayjs().format('YYYY MMMM DD')

            await chrome.storage.local.set({
                today_bg: {
                    photoUrl: photoUrl,
                    date: now,
                },
                isUserLoggedIn: true,
            })

            isLoggedIn.value = true

            return photoUrl
        }

        return null
    } catch (e) {
        console.log('here')
        isLoggedIn.value = false

        return null
    } finally {
        isLoading.value = false
    }
}

const logout = async () => {
    chrome.identity.launchWebAuthFlow({ url: 'https://accounts.google.com/logout' }, async function(tokenUrl) {
        isLoggedIn.value = false
        root_style.value = {
            backgroundImage: ``,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundColor: 'black',
        }

        await chrome.storage.local.set({
            isUserLoggedIn: false,
        })
    })
}

const fetchPhoto = async (token) => {
    let init = {
        method: 'POST',
        async: true,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pageSize: 100,
            filters: {
                featureFilter: {
                    includedFeatures: ['FAVORITES'],
                },
            },
        }),
        contentType: 'json',
    }

    const API_KEY = 'AIzaSyCdljn7WuW-fwKQ6NLyXfalIrZ51wEhgFs'
    const GOOGLE_PHOTOS_CLIENT_ID = '878246093837-d02f95nsmt62qprj56fva6anok83dqn7.apps.googleusercontent.com'
    const data = await fetch(`https://photoslibrary.googleapis.com/v1/mediaItems:search`, init)
        .then((response) => {
            return response.json()
        })
        .catch((e) => {
            return null
        })

    console.log('bag-o nani', data)

    const photos = data?.mediaItems ?? []
    const randomInt = Math.random() * (photos.length - 1 - 0) + 0
    const floor = Math.floor(randomInt)

    const photoUrl = photos[floor]?.baseUrl
    const width = photos[floor]?.mediaMetadata?.width ?? '1280'
    const height = photos[floor]?.mediaMetadata?.height ?? '720'

    const url = `${photoUrl}=w${width}-h${height}`
    const blob = await fetch(url)

    root_style.value = {
        backgroundImage: `url(${url})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundColor: 'black',
        backgroundPosition: 'center',
    }

    return url
}

const oauth2 = () => {
    return new Promise((resolve) => {
        chrome.identity.getAuthToken({ interactive: true }, function(token) {
            console.log(token)
            resolve(token)
        })
    })
}
</script>
<style scoped>
@import '../css/bundle.css';
@import '../css/style.css';
</style>
