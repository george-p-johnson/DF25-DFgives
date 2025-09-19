<template>
  <div id="container">
    <!-- <img id="logo" src="/img/logo.png"> -->
    <h2 id="header">Shot Challenge</h2>

    <ul>
      <li v-for="(entry, index) in entries" :key="index" class="leaderboard-item">
        <div class="info">
          <span class="name">{{ entry.name }}</span>
          <span class="score">{{ entry.value }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#container {
  margin: 0 auto;
  display: table;
  background-color: #90D0FE;
  height: 512px;
  width: 896px;
  /* background-image: url('/img/bg.png'); */
}

#header {
  color: #ffffff;
  margin: 0 auto;
  display: table;
  font-family: "AvantGardeForSalesforce-Demi", sans-serif;
  font-size: 115px;
}

ul {
  list-style: none;
  padding: 0;
}

.leaderboard-item {
  position: relative;
  margin-bottom: 1rem;
  height: 170px;
  width: 720px;
  background-color: #ffffff;
  border-radius: 25px;
  color: #000000;
  text-align: left;
  text-indent: 125px;
  line-height: 100px; 
  font-size: 80px;
  font-family: "AvantGardeForSalesforce-Demi", sans-serif;
  margin: 35px auto; 
  display: block; 
}

.info {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.name {
    right: 75px;
    position: relative;
    font-size: 40px;
}

.score {
  position: absolute;
  right: 0;
  padding-right: 40px;
  font-size: 30px;
  top: 50%;
  transform: translateY(-40%);
}
</style>

<script setup>
import { onMounted, onUnmounted, computed } from 'vue';
import { store } from '../store.js';

// Use Netlify Functions endpoint
const SHOTS_API_URL = '/api/shots';
// const SHOTS_API_URL = 'https://script.google.com/macros/s/AKfycbx3Ve1GOp90lyHgugxSZ7uSVMJaq6a4bXqCd-Imn0O5MikCV1010kjBLlIBQAHTfGFf/exec';



let intervalId = null;

const fetchShots = async () => {
  try {
    const response = await fetch(SHOTS_API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    store.totalShots = data.totalShots ?? 0;
  } catch (err) {
    console.error('Error fetching shots:', err);
  }
};

onMounted(() => {
  fetchShots(); // initial fetch
  intervalId = setInterval(fetchShots, 5000); // poll every 5s
});

onUnmounted(() => {
  clearInterval(intervalId);
});

const entries = computed(() => {
  const totalShots = store.totalShots || 0;
  const moneyDonated = totalShots * 5;
  const amountLeft = Math.max(100000 - moneyDonated, 0);

  return [
    { name: 'Total Shots Made', value: totalShots.toLocaleString() },
    { name: 'Money Donated', value: `$${moneyDonated.toLocaleString()}` },
    { name: 'Amount Left to $100K', value: `$${amountLeft.toLocaleString()}` },
  ];
});
</script>