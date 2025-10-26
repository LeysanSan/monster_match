<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-sky-300">
    <div class="bg-white/90 shadow-2xl rounded-[2rem] p-10 max-w-2xl w-full text-center backdrop-blur-lg border border-sky-100">
      
      <!-- Title -->
      <h1 class="text-5xl font-extrabold mb-4 text-sky-700 drop-shadow-sm">
        🧮 Monster Match!
      </h1>

      <p class="text-lg text-slate-700 mb-8">
        Help both monsters eat the numbers they <strong>both love</strong>!<br>
        (Find numbers divisible by 
        <span class="text-sky-600 font-semibold">{{ numA }}</span> 
        and 
        <span class="text-sky-600 font-semibold">{{ numB }}</span>)
      </p>

      <!-- Monsters -->
      <div class="flex justify-center gap-16 mb-10">
        <div class="text-center">
          <div :class="monsterClass('left')" class="text-7xl transition-transform duration-300 mb-2">
            <span v-if="reaction === 'happy'">😋</span>
            <span v-else-if="reaction === 'sad'">😢</span>
            <span v-else>😐</span>
          </div>
          <p class="text-sky-700 font-medium">Monster A likes <strong>{{ numA }}</strong></p>
        </div>

        <div class="text-center">
          <div :class="monsterClass('right')" class="text-7xl transition-transform duration-300 mb-2">
            <span v-if="reaction === 'happy'">😋</span>
            <span v-else-if="reaction === 'sad'">😢</span>
            <span v-else>😐</span>
          </div>
          <p class="text-sky-700 font-medium">Monster B likes <strong>{{ numB }}</strong></p>
        </div>
      </div>

      <!-- Numbers -->
      <div class="grid grid-cols-4 gap-4 justify-center mb-8">
        <button
          v-for="n in numbers"
          :key="n"
          @click="checkNumber(n)"
          :disabled="clicked.includes(n)"
          class="text-xl font-bold py-3 rounded-full transition-all duration-300 ease-out transform"
          :class="{
            'bg-sky-500 text-white hover:scale-105': !clicked.includes(n),
            'bg-green-400 scale-110 text-white': correct.includes(n),
            'bg-red-300 text-white scale-95': clicked.includes(n) && !correct.includes(n)
          }"
        >
          {{ n }}
        </button>
      </div>

      <!-- Score + New Round -->
      <div class="text-lg font-semibold text-slate-700 mb-6">
        Score: <span class="text-sky-700">{{ score }}</span>
      </div>

      <button
        @click="newRound"
        class="bg-sky-600 text-white px-8 py-3 rounded-full hover:bg-sky-700 transition text-lg"
      >
        🔄 New Round
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const numA = ref(4)
const numB = ref(6)
const numbers = ref([])
const correct = ref([])
const clicked = ref([])
const score = ref(0)
const reaction = ref('neutral')

function monsterClass(side) {
  return side === 'left' ? '-rotate-3' : 'rotate-3'
}

function generateNumbers() {
  numbers.value = []
  for (let i = 0; i < 12; i++) {
    numbers.value.push(Math.floor(Math.random() * 30) + 1)
  }
}

function checkNumber(n) {
  if (clicked.value.includes(n)) return
  clicked.value.push(n)

  const commonMultiple = n % numA.value === 0 && n % numB.value === 0
  if (commonMultiple) {
    correct.value.push(n)
    score.value += 10
    reaction.value = 'happy'
  } else {
    score.value -= 5
    reaction.value = 'sad'
  }

  setTimeout(() => (reaction.value = 'neutral'), 1000)
}

function newRound() {
  numA.value = Math.floor(Math.random() * 6) + 2
  numB.value = Math.floor(Math.random() * 6) + 2
  correct.value = []
  clicked.value = []
  generateNumbers()
}

generateNumbers()
</script>

<style scoped>
.text-7xl {
  filter: drop-shadow(0 3px 3px rgba(0,0,0,0.2));
}
</style>
