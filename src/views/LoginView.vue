<template>
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-neutral-800 border-neutral-700">
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
                            :invalid="invalid"
                        />
                    </div>

                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-white"> Пароль </label>
                        <Password v-model="password" :feedback="false" class="w-full bg-gray-700" :invalid="invalid" />
                    </div>

                    <Button class="w-full" @click="signIn"> Войти </Button>

                    <div class="flex items-center">
                        <a href="#" class="text-sm font-medium hover:underline text-primary-500"> Забыли пароль? </a>
                    </div>

                    <p class="text-sm font-light text-gray-400">
                        У вас еще нет аккаунта?
                        <RouterLink to="/register" class="font-medium hover:underline text-primary-500">
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
import { useAuthStore } from '@/stores/auth'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const username = ref('')
const password = ref('')
const router = useRouter()
const invalid = ref(false)
const invalidMessage = ref('')

const signIn = () => {
    authStore
        .signIn(username.value, password.value)
        .then(() => {
            router.push('/')
        })
        .catch((e) => {
            invalidMessage.value = e.response.data.error
            invalid.value = true
        })
}
</script>
