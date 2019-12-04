<template>
  <div class="container">
    <nuxt />
  </div>
</template>

<style>
.container {
  width: 100%;
  /* padding-right: 15px;
  padding-left: 15px; */
  margin-right: auto;
  margin-left: auto;
  background-color: rgb(211, 205, 205)
}

@media (min-width: 768px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 1900px) {
  .container {
    max-width: 1300px;
  }
}

</style>
