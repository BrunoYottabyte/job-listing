
<template>
  <HeaderComponent />

  <main ref="root" :class="`flex flex-col gap-4 md:gap-16 items-center py-20 relative`">
    <div  v-if="languagesSelected.length > 0"
      :class="`
      inputSelects shadow-md -top-[30px]  absolute bg-white w-[70vw] sm:w-[90vw] h-[60px] md:h-auto md:py-6 rounded-md flex items-center justify-between gap-8 px-8`">
      <div class="flex gap-4 flex-wrap">
        <div class="flex" v-for="badge in languagesSelected" :key="badge">
          <BadgeComponent :badge="badge" class="rounded-r-none" />
          <div @click="removeLanguage(badge)"
            class="cursor-pointer px-2 py-1 rounded-r-md bg-primary-dark-cyan-100 flex items-center hover:bg-neutral-very-dark-cyan-100 transition-colors duration-300 ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="#FFFFFF" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none"></rect>
              <line x1="200" y1="56" x2="56" y2="200" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="40"></line>
              <line x1="200" y1="200" x2="56" y2="56" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="40"></line>
            </svg>
          </div>
        </div>
      </div>
      <p @click="clearArr" class="text-primary-dark-cyan-100 hover:underline transition-transform duration-300 cursor-pointer">
        Clear
      </p>

    </div>
    <CardComponent v-for="card in cards" :card="card" :key="card.id" @emit-children="addLanguage" :languages="languagesSelected" />
  </main>

</template>

<script setup>
/* eslint-disable */
import HeaderComponent from './components/HeaderComponent.vue';
import CardComponent from './components/CardComponent.vue';
import { onMounted, ref, watch, nextTick } from 'vue';
import BadgeComponent from './components/BadgeComponent.vue';

const arrInitial = [
  {
    "id": 1,
    "company": "Photosnap",
    "logo": "photosnap.svg",
    "new": true,
    "featured": true,
    "position": "Senior Frontend Developer",
    "role": "Frontend",
    "level": "Senior",
    "postedAt": "1d ago",
    "contract": "Full Time",
    "location": "USA Only",
    "languages": ["HTML", "CSS", "JavaScript"],
    "tools": []
  },
  {
    "id": 2,
    "company": "Manage",
    "logo": "manage.svg",
    "new": true,
    "featured": true,
    "position": "Fullstack Developer",
    "role": "Fullstack",
    "level": "Midweight",
    "postedAt": "1d ago",
    "contract": "Part Time",
    "location": "Remote",
    "languages": ["Python"],
    "tools": ["React"]
  },
  {
    "id": 3,
    "company": "Account",
    "logo": "account.svg",
    "new": true,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2d ago",
    "contract": "Part Time",
    "location": "USA Only",
    "languages": ["JavaScript"],
    "tools": ["React", "Sass"]
  },
  {
    "id": 4,
    "company": "MyHome",
    "logo": "myhome.svg",
    "new": false,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "5d ago",
    "contract": "Contract",
    "location": "USA Only",
    "languages": ["CSS", "JavaScript"],
    "tools": []
  },
  {
    "id": 5,
    "company": "Loop Studios",
    "logo": "loop-studios.svg",
    "new": false,
    "featured": false,
    "position": "Software Engineer",
    "role": "Fullstack",
    "level": "Midweight",
    "postedAt": "1w ago",
    "contract": "Full Time",
    "location": "Worldwide",
    "languages": ["JavaScript"],
    "tools": ["Ruby", "Sass"]
  },
  {
    "id": 6,
    "company": "FaceIt",
    "logo": "faceit.svg",
    "new": false,
    "featured": false,
    "position": "Junior Backend Developer",
    "role": "Backend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": "UK Only",
    "languages": ["Ruby"],
    "tools": ["RoR"]
  },
  {
    "id": 7,
    "company": "Shortly",
    "logo": "shortly.svg",
    "new": false,
    "featured": false,
    "position": "Junior Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": "Worldwide",
    "languages": ["HTML", "JavaScript"],
    "tools": ["Sass"]
  },
  {
    "id": 8,
    "company": "Insure",
    "logo": "insure.svg",
    "new": false,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": "USA Only",
    "languages": ["JavaScript"],
    "tools": ["Vue", "Sass"]
  },
  {
    "id": 9,
    "company": "Eyecam Co.",
    "logo": "eyecam-co.svg",
    "new": false,
    "featured": false,
    "position": "Full Stack Engineer",
    "role": "Fullstack",
    "level": "Midweight",
    "postedAt": "3w ago",
    "contract": "Full Time",
    "location": "Worldwide",
    "languages": ["JavaScript", "Python", "PHP", "React Native"],
    "tools": ["Django"]
  },
  {
    "id": 10,
    "company": "The Air Filter Company",
    "logo": "the-air-filter-company.svg",
    "new": false,
    "featured": false,
    "position": "Front-end Dev",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "1mo ago",
    "contract": "Part Time",
    "location": "Worldwide",
    "languages": ["JavaScript"],
    "tools": ["React", "Sass"]
  }
]
const cards = ref(arrInitial)
let root = ref();
let inputSelect = ref();
let languagesSelected = ref([]);

const handleInput = () => {
  inputSelect.value = root.value.querySelector('.inputSelects');
  console.log(inputSelect.value)
  console.log(inputSelect.value.getBoundingClientRect().height)
  inputSelect.value.style.top = `-${inputSelect.value.getBoundingClientRect().height / 2}px`
  root.value.style.paddingTop = `${(inputSelect.value.getBoundingClientRect().height / 2) + 50}px`
}

watch(languagesSelected, async() => {
  if(languagesSelected.value.length == 0){
    cards.value = arrInitial;
    root.value.style.paddingTop = "5rem"
    return;
  }
  await nextTick();
  handleInput();
  cards.value = arrInitial.filter(card => {
    let skills = [...card.languages, ...card.tools];
    return languagesSelected.value.every((currentValue) => skills.includes(currentValue))
  });
}, {
  deep: true
})

const addLanguage = (item) => {
  if (!languagesSelected.value.includes(item)) languagesSelected.value.push(item);
}

const removeLanguage = (item) => {
  console.log(item);
  languagesSelected.value.splice(languagesSelected.value.findIndex(i => i == item), 1);
}

const clearArr = () => {
  console.log('rt')
  languagesSelected.value = [];
}





</script>
