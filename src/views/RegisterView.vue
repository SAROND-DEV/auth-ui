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
                        Начните работать c нами
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

                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-white">
                            Повторите пароль
                        </label>
                        <Password
                            v-model="confirmPassword"
                            :feedback="false"
                            class="w-full bg-gray-700"
                            :invalid="!!invalidMessage"
                        />
                    </div>

                    <Button class="w-full" @click="signUp"> Зарегистрироваться </Button>

                    <p class="text-sm font-light text-gray-400">
                        У вас уже есть аккаунт?
                        <RouterLink :to="{ name: 'login' }" class="font-medium hover:underline text-primary-500">
                            Войти
                        </RouterLink>
                    </p>
                </div>
            </div>
        </div>
    </section>
    <Teleport to="body">
        <Toast />
    </Teleport>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import ProgressSpinner from 'primevue/progressspinner'

const toast = useToast()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const invalidMessage = ref('')

const authStore = useAuthStore()
const router = useRouter()

const signUp = () => {
    if (password.value !== confirmPassword.value) {
        invalidMessage.value = 'Пароли не совпадают'
        return
    }

    authStore
        .signUp(username.value, password.value)
        .then(() => {
            invalidMessage.value = ''
            toast.add({
                severity: 'success',
                summary: 'Регистрация',
                detail: 'Вы успешно зарегистрировались',
                life: 1000
            })

            setTimeout(() => router.push({ name: 'login' }), 2000)
        })
        .catch((e) => {
            invalidMessage.value = e.response.data.error
        })
}
</script>
