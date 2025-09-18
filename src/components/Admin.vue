<template>
  <div id="container">
    <h2>Admin Panel</h2>

    <div class="section">
      <h3>Shot Challenge</h3>

      <div class="shots-input">
        <label for="shots">Total Shots Made:</label>
        <input
          id="shots"
          v-model.number="totalShots"
          type="number"
          min="0"
          placeholder="0"
        />
      </div>

      <div class="calculated-values">
        <div class="calc-item">
          <strong>Money Donated:</strong> ${{ moneyDonated.toLocaleString() }}
        </div>
        <div class="calc-item">
          <strong>Amount Left to $100K:</strong> ${{ amountLeft.toLocaleString() }}
        </div>
      </div>
    </div>

    <div id="buttonContainer">
      <button @click="saveShots">Save Data</button>
      <button @click="fetchShots">Refresh Data</button>
    </div>
  </div>
</template>

<style scoped>
#container {
  margin: 0 auto;
  display: table;
  max-width: 600px;
  padding: 20px;
}
h2 { text-align: center; margin-bottom: 30px; }
h3 { text-align: center; margin: 20px 0 10px 0; color: #333; }
.section { margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
.shots-input { text-align: center; margin: 20px 0; }
.shots-input label { font-weight: bold; margin-right: 10px; display: block; margin-bottom: 10px; }
.shots-input input { padding: 12px; font-size: 18px; border: 1px solid #ccc; border-radius: 4px; width: 150px; text-align: center; }
.calculated-values { margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 4px; }
.calc-item { margin: 10px 0; font-size: 16px; text-align: center; }
#buttonContainer { margin-top: 25px; text-align: center; }
button { padding: 12px 30px; margin: 5px 10px; border-radius: 50px; border: none; background-color: #007bff; color: white; cursor: pointer; font-size: 16px; }
button:hover { background-color: #0056b3; }
button:active { transform: translateY(1px); }
</style>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { store } from '../store.js';

const SHOTS_API_URL = '/api/shots';


const totalShots = ref(0);

const moneyDonated = computed(() => (totalShots.value || 0) * 5);
const amountLeft = computed(() => Math.max(100000 - moneyDonated.value, 0));

const fetchShots = async () => {
  try {
    const response = await fetch(SHOTS_API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    totalShots.value = data.totalShots ?? 0;
    store.totalShots = totalShots.value;
  } catch (err) {
    console.error('Error fetching shots:', err);
  }
};

const saveShots = async () => {
  try {
    const response = await fetch(SHOTS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ totalShots: totalShots.value }),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }
    const result = await response.json();
    console.log('Shots saved:', result);
    store.totalShots = totalShots.value;
  } catch (err) {
    console.error('Error saving shots:', err);
  }
};

onMounted(fetchShots);
</script>