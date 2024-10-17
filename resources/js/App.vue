<template>
    <div id="app">
      <div class="container">
        <h2 class="center-title">Pipe Inventory Search</h2>
        <SearchFilterComponent />
      </div>
    </div>
  </template>

<script>
import SearchFilterComponent from './components/SearchFilterComponent.vue';

export default{
    components: {
        SearchFilterComponent,
    },
};
</script>

<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f9f9f9; /* Light background for contrast */
    }

    .container {
        max-width: 1200px; /* Adjust as needed for responsiveness */
        margin: 0 auto; /* Centers the container */
        padding: 20px; /* Adds some padding around the content */
        width: 100%; /* Ensures full width for responsiveness */
    }
    .center-title {
        text-align: center;
    }
</style>