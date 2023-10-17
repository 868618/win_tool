<script setup lang="ts">
// import HelloWorld from "./components/HelloWorld.vue";
import { ref, onBeforeMount } from "vue";

const wlans = ref<Record<string, any>[]>([]);

let current = ref({
  ip: "",
  phone: "",
});

const init = async () => {
  const res = await window.ipcRenderer.invoke("getWlans");
  wlans.value = res;
  console.log("AT-[ wlans.value &&&&&********** ]", wlans.value);

  const { name } = wlans.value.find((item) => item.State == "Connected") || {};
  current.value.ip = name;
};

// const showDialog = () => window.ipcRenderer.invoke("showDialog");

onBeforeMount(init);
</script>

<template>
  <div>
    <header class="header">
      <h3>
        当前ip：<span class="text-red">{{ current.ip }}</span>
      </h3>

      <h3>
        对应手机：<span class="text-blue">{{ current.phone }}</span>
      </h3>
      <h3>
        ip总数：<span class="text-blue">{{ wlans.length }}</span>
      </h3>

      <button class="btn" @click="init">初始化</button>
    </header>

    <!-- <h4>ip列表</h4> -->
    <nav class="nav">
      <section class="section">
        <div
          class="item"
          :class="{ active: item.State == 'Connected' }"
          v-for="item in wlans"
          :key="item.name"
        >
          <img src="./assets/chrome.png" class="chrome" />
          <p>ip:{{ item.name }}</p>
        </div>
      </section>
    </nav>

    <div class="dialog">
      <div class="form">
        <p>ip：8.8.8.8 <input type="text" /></p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-around;

  .btn {
    cursor: pointer;
    border: none;

    font-size: 18px;
    user-select: none;

    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);

    background-image: linear-gradient(
      135deg,
      rgb(217, 220, 232),
      rgb(226, 228, 239)
    );
    border-collapse: collapse;
    border-radius: 16px;
    box-shadow: rgba(255, 255, 255, 0.8) 1px 1px 1px 0px inset,
      rgba(40, 49, 85, 0.3) -1px -1px 1px 0px inset,
      rgba(40, 49, 85, 0.1) 1px 1px 3px 0px;
    color: rgb(40, 49, 85);
    display: inline-block;

    &:hover {
      opacity: 0.7;
    }
  }
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

.dialog {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);

  .form {
    position: absolute;
    left: 50%;
    top: 5%;
    transform: translateX(-50%);
    background-color: #fff;
    height: 90%;
    width: 50%;
  }
}
</style>
