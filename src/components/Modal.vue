<script setup lang="ts">
defineProps({
    show: Boolean,
})
</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="modal__mask">
            <dialog class="modal" :open="show">
                <div class="modal__header">
                    <div class="modal__header_title">
                        <slot name="header">Modal Title</slot>
                    </div>
                    <button class="modal__close_btn" @click="$emit('close')">
                        <font-awesome-icon class="icon" icon="fa-solid fa-xmark"></font-awesome-icon>
                    </button>
                </div>

                <div class="modal__body">
                    <slot name="body">Content</slot>
                </div>

                <div class="modal__footer">
                    <slot name="footer"></slot>
                </div>
            </dialog>
        </div>
    </Transition>
</template>

<style lang="scss">
.modal {
    width: 300px;
    margin: auto;
    top: 20%;
    padding: 20px 30px;
    background-color: rgb(42, 38, 48);
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;


    &__header {
        display: flex;
        justify-content: space-between;
    }

    &__close_btn {
        float: right;
        height: 25px;
        width: 25px;
        border: none;
        border-radius: 2px;
        background-color: var(--eg-bg-color);
    }

    &__mask {
        position: fixed;
        z-index: 98;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        transition: opacity 0.3s ease;
    }

    &__body {
        margin: 20px 0;
    }
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>