<script setup lang="ts">
  // Import Vue's composition API utilities
  import { onMounted, ref } from 'vue';

  // Define reactive variables using ref()
  // ref() creates a reactive reference to a value; .value is used to access/set it in script
  const name = ref<string>('John Doe'); // User's name, initialized as "John Doe"
  const status = ref<string>('active'); // User's status, can be 'active', 'pending', or 'inactive'
  const tasks = ref<string[]>(['1', '2', '3']); // Array of tasks, initialized with dummy values
  const link = ref<string>('https://google.com'); // URL for a hyperlink
  const newTask = ref<string>(''); // Input field value for adding a new task

  // Function to cycle through status values when the button is clicked
  const toggleStatus = () => {
    if (status.value === 'active') {
      status.value = 'pending'; // Switch from 'active' to 'pending'
    } else if (status.value === 'pending') {
      status.value = 'inactive'; // Switch from 'pending' to 'inactive'
    } else {
      status.value = 'active'; // Switch back to 'active' from 'inactive'
    }
  };

  // Function to add a new task to the tasks array
  const addTask = () => {
    if (newTask.value.trim() !== '') { // Check if the input isn't empty or just whitespace
      tasks.value.push(newTask.value); // Add the new task to the tasks array
      newTask.value = ''; // Clear the input field after adding
    }
  };

  // Function to delete a task from the tasks array by index
  const deleteTask = (index) => {
    tasks.value.splice(index, 1); // Remove 1 item at the specified index
  };

  // Lifecycle hook: runs when the component is mounted to the DOM
  onMounted(async () => {
    try {
      // Fetch sample todo data from a placeholder API
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json(); // Convert response to JSON
      // Update tasks with fetched data, mapping each todo's title
      tasks.value = data.map((task) => task.title);
    } catch (error) {
      // Log an error message if the fetch fails
      console.log('Error fetching tasks');
    }
  });
</script>

<template>
  <!-- Display the name reactively; updates if name changes -->
  <h1>{{ name }}</h1>

  <!-- Conditional rendering with v-if, v-else-if, and v-else -->
  <!-- Shows different messages based on the status value -->
  <p v-if="status === 'active'">User is active</p>
  <p v-else-if="status === 'pending'">User is pending</p>
  <p v-else>User is inactive</p>

  <!-- Form to add a new task; @submit.prevent stops default form submission -->
  <form @submit.prevent="addTask">
    <label for="newTask">Add Task</label>
    <!-- Two-way binding with v-model links input to newTask ref -->
    <input type="text" id="newTask" name="newTask" v-model="newTask">
    <button type="submit">Submit</button>
  </form>

  <!-- Display the list of tasks -->
  <h3>Tasks:</h3>
  <!-- v-for loops over tasks array; :key ensures efficient DOM updates -->
  <ul>
    <li v-for="(task, index) in tasks" :key="task">
      <!-- Display the task text -->
      <span>{{ task }}</span>
      <!-- Button to delete the task, passing the index to deleteTask -->
      <button @click="deleteTask(index)">x</button>
    </li>
  </ul>

  <!-- Link with dynamic href; :href is shorthand for v-bind:href -->
  <!-- <a v-bind:href="link">Google Link</a> --> <!-- Longhand syntax -->
  <a :href="link">Google Link</a> <!-- Shorthand syntax -->

  <br/>

  <!-- Button to toggle status; @click is shorthand for v-on:click -->
  <!-- <button v-on:click="toggleStatus">Change status</button> --> <!-- Longhand syntax -->
  <button @click="toggleStatus">Change status</button> <!-- Shorthand syntax -->
</template>

<style scoped>
  /* Scoped CSS: styles only apply to this component */
  /* Add your styles here as needed */
</style>