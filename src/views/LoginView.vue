<template>
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                class="relative w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-neutral-800 border-neutral-700"
            >
                <div
                    v-if="authStore.loading"
                    class="flex justify-center items-center absolute bg-black/50 top-0 left-0 right-0 bottom-0 z-10"
                >
                    <ProgressSpinner />
                </div>

                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                        Войдите в свою учетную запись
                    </h1>

                    <span class="text-red-600 text-sm">
                        {{ invalidMessage }}
                    </span>

                    <div>
                        <label for="username" class="block mb-2 text-sm font-medium text-white">
                            Имя пользователя
                        </label>
                        <InputText
                            class="w-full bg-neutral-700"
                            type="text"
                            id="username"
                            v-model="username"
                            :invalid="!!invalidMessage"
                        />
                    </div>

                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-white"> Пароль </label>
                        <Password
                            v-model="password"
                            :feedback="false"
                            class="w-full bg-gray-700"
                            :invalid="!!invalidMessage"
                        />
                    </div>

                    <Button class="w-full" @click="signIn"> Войти </Button>

                    <div class="flex items-center">
                        <a href="#" class="text-sm font-medium hover:underline text-primary-500"> Забыли пароль? </a>
                    </div>

                    <p class="text-sm font-light text-gray-400">
                        У вас еще нет аккаунта?
                        <RouterLink :to="{ name: 'register' }" class="font-medium hover:underline text-primary-500">
                            Зарегистрироваться
                        </RouterLink>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import ProgressSpinner from 'primevue/progressspinner'
import { useAuthStore } from '@/stores/auth'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const username = ref('')
const password = ref('')
const router = useRouter()
const invalidMessage = ref('')

const signIn = () => {
    authStore
        .signIn(username.value, password.value)
        .then(() => {
            invalidMessage.value = ''
            router.push({ name: 'home' })
        })
        .catch((e) => {
            invalidMessage.value = e.response.data.error
        })
}
</script>
