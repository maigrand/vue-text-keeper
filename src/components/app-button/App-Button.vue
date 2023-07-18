<template>
  <button
    class="app-button__wrapper"
    type="button"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.app-button {
  &__wrapper {
    border: 8px solid transparent;
    border-radius: 4px;
    background-color: #323232;
    color: white;
    margin: 8px;
    cursor: pointer;
  }
}
</style>
