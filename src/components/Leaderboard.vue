<template>
    <div id="container">
        <!-- Leaderboard-style entries -->
        <div>
            <ul>
                <h2 id="header">Shot Challenge</h2>

                <li v-for="(entry, index) in entries" :key="index" class="leaderboard-item">
                    <div class="info">
                    <span class="name">{{ entry.name }}</span>
                    <span class="score">{{ entry.value }}</span>
                    </div>
                </li>
            </ul>
        </div>


        <!-- Progress Bar Section -->
        <div id="progressbar-wrapper">
            <h3 id="goal">Goal<br><span id="goal-amount">$100k</span></h3>
            <div class="progress-container">
                <div class="progress-bar" :style="{ height: progressPercent + '%' }"></div>

                <div class="progress-label">
                    ${{ moneyDonated.toLocaleString() }} <span id="raised">Raised</span> 
                </div>
            </div>
        </div>
 
    </div>
</template>

<style scoped>
#container {
    height: 512px; 
    width: 896px;
    position: relative;
    background-image: url("/img/bg.png");
}

#header {
    color: #1F376A;
    margin-bottom: 50px;
    font-family: "AvantGardeForSalesforce-Demi", sans-serif;
    font-size: 55px;
}

ul {
    list-style: none;
    padding: 50px 0 0 50px;
}

.leaderboard-item {
    position: relative;
    margin-bottom: 1rem;
    height: 59px;
    width: 502px;
    background-color: #ffffff;
    border-radius: 15px;
    color: #1F376A;
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
    right: 75px;
    position: relative;
    font-size: 23px;
}

.score {
    position: absolute;
    right: 0;
    padding-right: 40px;
    font-size: 23px;
    top: 40%;
    transform: translateY(-40%);
}

/*=========================================================

Progressbar

=========================================================*/
#progressbar-wrapper {
    position: absolute;
    text-align: center;
    width: 159px;
    margin-right: 62px;
    bottom: 0;
    right: 0;
}

#goal {
    display: block;
    margin-bottom: 10px; 
    font-size: 25px;
    font-weight: bold;
    color: #1F376A;
    font-family: "AvantGardeForSalesforce-Demi", sans-serif;
}

#goal-amount {
    font-size: 42px;
}

.progress-container {
    position: absolute;
    height: 340px;
    background-color: #fff;
    border-radius: 20px 20px 0 0;

    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;   /* stack label on top of bar */
    align-items: center;
    justify-content: flex-end; /* keep bar at bottom */

      box-shadow: 0 0 10px #ECFAFE, /* Inner glow */
              0 0 20px #F9F1CF, /* Medium glow */
              0 0 30px #F9F1CF; /* Outer glow */
}

.progress-bar {
    width: 100%;
    height: 0%; /* will grow upward */
    background: linear-gradient(to top,rgba(255, 120, 79, 0.2) 0%, rgba(255, 120, 79, 1) 100%);
    border-radius: 20px 20px 0 0;
    transition: height 0.5s ease-in-out;
}

.progress-label {
    position: absolute;
    bottom: 20px;    
    left: 50%;
    transform: translateX(-50%);
    font-family: "AvantGardeForSalesforce-Demi", sans-serif;
    font-size: 30px;
    color: #ffffff;
    font-weight: bold;
    line-height: 35px;
}

#raised {
    margin: 0 auto;
    display: table;
    font-size: 15px;
    font-family: "AvantGardeForSalesforce-Demi", sans-serif;
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
  { name: 'Money Donated', value: `$${moneyDonated.value.toLocaleString()}` },
  { name: 'Amount Left to $100K', value: `$${amountLeft.value.toLocaleString()}` },
]);
</script>



















