<template>
	<div class="main-col">
		<div class="main-cont text">
			<h1>Engl</h1>	
		</div>
		<div class="main-cont input">
			<input type="text" />
		</div>
		<div class="main-cont levels">
			<div v-for="level in levels" :key="level">
				<h3>{{ level }}</h3>
			</div>	
		</div>
	</div>
</template>

<script>
export default {
  name: 'Main',
  props: {
    data: Object
  },
  data: function() {
	return {
		levels: ["a1", "a2", "a3"]
	}
  }
}
</script>

<style scoped>

.main-col {
	display: flex;
	flex-direction: column;
	justify-content: center; 
	align-items: stretch;
	background: red;
	width: 100%;
	height: 100%;
}

.main-cont {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	padding: 40px;
}

.input input {
	background: rgba(255,255,255,0.2);
    border: none;
    outline: none;
    caret-color: white;
    color: white;
    border-bottom: white solid 2px;
	-webkit-transition: box-shadow 0.2s;
    transition: box-shadow 0.2s;
}

.input input:focus {
    box-shadow: black 0 5px 10px -5px;
}
</style>
