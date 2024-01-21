<script setup>
</script>

<template>
  <div class="main-page">
    <div class="container">
      <div class="background"></div>
      <div class="content">
        <h1 id="typewriter"></h1>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/typed';

#typewriter {
  @include typed(
          "I'm Full-Stack Web Developer",
          "Contact me if you want to collaborate",
          (
              type: .1,
              pause-typed: 2,
              delete: .08,
              pause-deleted: 1
          ), (
          name: "",
          caret: true,
          caret-speed: 1,
          caret-width: 0.75ch,
          caret-color: currentColor,
          caret-space: 1h,
          delay: 1,
          iterations: infinite,
          end-on: "."
      )
  );

  color: white;
  text-align: center;
  margin: auto auto;
  text-decoration: underline;
  letter-spacing: 2px;
  font-size: 2.75rem;
  font-weight: bold;
}

.container {
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  position: relative;
  height: 180px;
}

.background {
  background: center / cover no-repeat url("../../img/main-backgroud.webp");

  box-shadow: inset 0 0 0 100vh rgba(0, 0, 0, 0.3);

  height: 100vh;
  width: 100%;
  object-fit: cover;
  position: absolute;
  z-index: -50;
  opacity: 0.8;
}
</style>