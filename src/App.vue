<template>
  <div class="app">
    <Dashboard/>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld";
import Dashboard from "@/components/Dashboard";

export default {
  name: "App",
  components: {
    HelloWorld, Dashboard
  }
};
</script>

<style>
.app {
  margin: 0 auto;
  font-family: sans-serif;
  background-color: #ccf7e2;
  padding: 10px;
  border-radius: 5px;
  max-width: 100%;
}
</style>