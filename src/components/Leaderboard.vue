<!-- <template>
    <div id="container">
        <div>
            <ul>
                <li v-for="(entry, index) in entries" :key="index" class="leaderboard-item">
                    <div class="info">
                    <span class="name">{{ entry.name }}</span>
                    <span class="score">{{ entry.value }}</span>
                    </div>
                </li> 
            </ul>
        </div>
    </div>
</template>

<style scoped>
#container {
    height: 512px; 
    width: 896px;
    position: relative;
}


/* Background video */
.bg-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0; /* behind content */
}

ul {
    list-style: none;
    /* padding: 50px 0 0 50px; */
    position: absolute;
    right: 50px;
    top: 100px;
}

.leaderboard-item {
    position: relative;
    margin-bottom: 30px;
    width: 215px;
    height: 135px;
    color: #ffffff;
    border-radius: 15px;
    background-color: #1F376A;
    text-indent: 125px;
    font-size: 23px;
    font-family: "AvantGardeForSalesforce-Demi", sans-serif;
}

.info {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}

.name {
     right: 73px;
    position: relative;
    font-size: 16px;
    width: 380px;
    display: grid;
    top: -33px;
}

.score {
    position: absolute;
    right: 140px;
    font-size: 23px;
    top: 20px;
    transform: translateY(-40%);
    font-size: 40px;
}

</style>




<script setup>
import { onMounted, onUnmounted, computed } from 'vue';
import { store } from '../store.js';

const SHOTS_API_URL = '/api/shots';
// const SHOTS_API_URL = import.meta.env.VITE_SHOTS_API_URL;


let intervalId = null;

// const fetchShots = async () => {
//   try {
//     const response = await fetch(SHOTS_API_URL);
//     if (!response.ok) throw new Error(`HTTP ${response.status}`);
//     const data = await response.json();
//     store.totalShots = data.totalShots ?? 0;
//   } catch (err) {
//     console.error('Error fetching shots:', err);
//   }
// };

const fetchShots = async () => {
  try {
    // fetch directly from your Apps Script
    const response = await fetch(SHOTS_API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    store.totalShots = data.totalShots ?? 0;
  } catch (err) {
    console.error('Error fetching shots:', err);
  }
};




onMounted(() => {
  // 🚨 for testing only
//   store.totalShots = 10000; // try different numbers

  // production
  fetchShots();
  intervalId = setInterval(fetchShots, 5000);
});






onUnmounted(() => {
  clearInterval(intervalId);
});

// Calculated values
const totalShots = computed(() => store.totalShots || 0);
const moneyDonated = computed(() => totalShots.value * 5);
const amountLeft = computed(() => Math.max(100000 - moneyDonated.value, 0));
const progressPercent = computed(() =>
  Math.min((moneyDonated.value / 100000) * 100, 100)
);

const entries = computed(() => [
  { name: 'Total Shots Made', value: totalShots.value.toLocaleString() },
  { name: 'Money Donated', value: `$${moneyDonated.value.toLocaleString()}` }
]);
</script> -->









<template>
    <div id="container">
        <div>
            <ul>
                <li v-for="(entry, index) in entries" :key="index" class="leaderboard-item">
                    <div class="info">
                        <span class="name">{{ entry.name }}</span>
                        <span class="score">{{ entry.value }}</span>
                    </div>
                </li> 
            </ul>
        </div>
    </div>
</template>

<style scoped>
#container {
    height: 512px; 
    width: 896px;
    position: relative;
}

ul {
    list-style: none;
    position: absolute;
    right: 50px;
    top: 100px;
}

.leaderboard-item {
    position: relative;
    margin-bottom: 30px;
    width: 215px;
    height: 135px;
    color: #ffffff;
    border-radius: 15px;
    background-color: #1F376A;
    font-family: "AvantGardeForSalesforce-Demi", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
}

.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    gap: 10px;
}

.name {
    font-size: 16px;
    width: 100%;
    padding: 0 10px;
}

.score {
    font-size: 40px;
}
</style>

<script setup>
import { onMounted, onUnmounted, computed } from 'vue';
import { store } from '../store.js';

const SHOTS_API_URL = '/api/shots';

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
  fetchShots();
  intervalId = setInterval(fetchShots, 5000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

// Calculated values
const totalShots = computed(() => store.totalShots || 0);
const moneyDonated = computed(() => totalShots.value * 5);
const amountLeft = computed(() => Math.max(100000 - moneyDonated.value, 0));
const progressPercent = computed(() =>
  Math.min((moneyDonated.value / 100000) * 100, 100)
);

const entries = computed(() => [
  { name: 'Total baskets', value: totalShots.value.toLocaleString() },
  { name: 'Amount raised', value: `$${moneyDonated.value.toLocaleString()}` }
]);
</script>









