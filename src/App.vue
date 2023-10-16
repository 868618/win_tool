<!-- <script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
</script> -->

<template>
  <div>
    <header class="header">
      <h3>当前ip：<span class="text-red">192.168.1.1</span></h3>
      <h3>对应手机：<span class="text-blue">03号机</span></h3>
    </header>

    <!-- <h4>ip列表</h4> -->
    <nav class="nav">
      <section class="section">
        <div
          class="item"
          :class="{ active: item == 2 }"
          v-for="item in 6"
          :key="item"
        >
          <img src="./assets/chrome.png" class="chrome" />
          <p>0{{ item }}号机</p>
        </div>
      </section>
    </nav>
  </div>

  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-evenly;
}

.section {
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
  // background-color: red;

  .item {
    cursor: pointer;
    text-align: center;
    // background-color: red;
    padding: 0 15px;
    transition: all 130ms ease-in;

    p {
      margin: 0;
    }

    // &:not(:first-of-type) {
    //   margin-left: 20px;
    // }

    &.active {
      color: red;
      font-weight: bolder;
      filter: drop-shadow(0 0 2em #646cffaa);
      p {
        font-size: 20px;
      }
    }

    &:hover:not(.active) {
      transform: translateY(-20px) scale(1.3);
      color: blue;
      filter: drop-shadow(0 0 2em #646cffaa);
    }
  }

  .chrome {
    width: 4em;
    will-change: filter;
    transition: filter 300ms;
  }
}
</style>
