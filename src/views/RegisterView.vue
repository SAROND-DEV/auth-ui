<template>
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-neutral-800 border-neutral-700">
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
                            :invalid="invalid"
                        />
                    </div>

                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-white"> Пароль </label>
                        <Password v-model="password" :feedback="false" class="w-full bg-gray-700" :invalid="invalid" />
                    </div>

                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-white">
                            Повторите пароль
                        </label>
                        <Password
                            v-model="confirmPassword"
                            :feedback="false"
                            class="w-full bg-gray-700"
                            :invalid="invalid"
                        />
                    </div>

                    <Button class="w-full" @click="signUp"> Зарегистрироваться </Button>

                    <p class="text-sm font-light text-gray-400">
                        У вас уже есть аккаунт?
                        <RouterLink to="/login" class="font-medium hover:underline text-primary-500">
                            Войти
                        </RouterLink>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const invalid = ref(false)
const invalidMessage = ref('')

const authStore = useAuthStore()
const router = useRouter()

const signUp = () => {
    if (password.value !== confirmPassword.value) {
        invalidMessage.value = 'Пароли не совпадают'
        invalid.value = true
        return
    }

    authStore
        .signUp(username.value, password.value)
        .then(() => {
            router.push('/login')
        })
        .catch((e) => {
            invalidMessage.value = e.response.data.error
            invalid.value = true
        })
}
</script>
