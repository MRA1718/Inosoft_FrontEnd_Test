<template>
    <button @click="find" class="find-button">Find</button>
  </template>
  
  <script>
  export default {
    methods: {
      find() {
        this.$emit('find');
      },
    },
  };
  </script>
  
  <style scoped>
  .find-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .find-button:hover {
    background-color: #0056b3;
  }
  </style>