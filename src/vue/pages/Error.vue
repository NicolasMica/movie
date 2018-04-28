<template>
    <section class="flex flex-col flex-1 items-center justify-center">
            <h3 class="text-5xl uppercase tracking-wide font-semibold text-black">Page introuvable</h3>
            <p class="mb-8 text-2xl text-grey-darker">La page que vous recherchez ne semble pas exister</p>
            <div>
                <router-link :to="{ name: 'index' }" class="button bg-brand-primary hover:bg-brand-primary-dark active:bg-brand-primary-darker text-white">Afficher la liste des films</router-link>
                <router-link :to="{ name: 'create' }" class="button bg-brand-secondary hover:bg-brand-secondary-dark active:bg-brand-secondary-darker text-white">Ajouter un nouveau film</router-link>
            </div>
    </section>
</template>