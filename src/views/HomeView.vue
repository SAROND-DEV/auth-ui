<template>
    <main class="min-h-screen flex justify-center items-center">
        <Card v-if="authStore.token" class="bg-neutral-800" style="width: 25rem; overflow: hidden">
            <template #title>Пользователь: {{ username }}</template>
            <template #content>
                <p class="m-0">Описание: {{ description }}</p>
            </template>
            <template #footer>
                <div class="flex gap-3 mt-1">
                    <Button label="Выйти" class="w-full" @click="authStore.signOut" />
                </div>
            </template>
        </Card>

        <Card v-else class="bg-neutral-800" style="width: 25rem; overflow: hidden">
            <template #title>Кажется вы не авторизовались</template>
            <template #content>
                <p class="m-0">Зарегистрируйтесь или войдите, чтобы увидеть информацию</p>
            </template>
            <template #footer>
                <div class="flex gap-3 mt-1">
                    <RouterLink to="/register" class="w-full">
                        <Button label="Регистрация" severity="secondary" outlined class="w-full" />
                    </RouterLink>

                    <RouterLink to="/login" class="w-full">
                        <Button label="Войти" class="w-full" />
                    </RouterLink>
                </div>
            </template>
        </Card>
    </main>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'

const authStore = useAuthStore()
const username = ref('')
const description = ref('')

onMounted(() =>
    authStore.getProfile().then((profile) => {
        username.value = profile.data.username
        description.value = profile.data.about
    })
)
</script>
