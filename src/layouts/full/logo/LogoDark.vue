<template>
  <div class="logo">
    <RouterLink to="/">
      <svg
        width="180"
        height="40"
        viewBox="0 0 180 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Medical Cross Background -->
        <circle
          cx="20"
          cy="20"
          r="18"
          :fill="primary"
          opacity="0.12"
        />

        <!-- Medical Cross -->
        <path
          d="M17 10H23V17H30V23H23V30H17V23H10V17H17V10Z"
          :fill="primary"
        />

        <!-- Med Expert Text -->
        <text
          x="48"
          y="25"
          font-size="18"
          font-weight="700"
          font-family="Inter, Arial, sans-serif"
          fill="#212121"
        >
          Med Expert
        </text>

        <!-- Tagline -->
        <text
          x="48"
          y="35"
          font-size="8"
          font-weight="500"
          font-family="Inter, Arial, sans-serif"
          :fill="secondary"
        >
          Second Opinion Platform
        </text>
      </svg>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const primary = ref('rgb(var(--v-theme-primary))');
const secondary = ref('rgb(var(--v-theme-secondary))');
</script>