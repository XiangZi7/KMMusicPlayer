<script setup>
const props = defineProps({
  anime: {
    type: Object,
    default: () => {},
  },
});
const { anime } = toRefs(props);
</script>
<template>
  <div v-if="Object.keys(anime).length > 0" class="anime-details">
    <!-- Info Section -->
    <div class="info-section">
      <div class="flex">
        <div class="yx-col-12">
          <!-- title -->
          <p class="genre"><strong>Title:</strong> {{ anime.title }}</p>
          <!-- Genres -->
          <p class="genre"><strong>Genres:</strong> {{ anime.videoType }}</p>
          <!-- Region -->
          <p class="genre"><strong>Region:</strong> {{ anime.region }}</p>
          <!-- director -->
          <p class="genre"><strong>director:</strong> {{ anime.director }}</p>
          <!-- Cast -->
          <p class="cast"><strong>Cast:</strong> {{ anime.actor }}</p>
        </div>
        <div class="yx-col-12">
          <div class="cover-container ml-auto">
            <img :src="anime.cover" :alt="anime.title" class="cover-image" />
          </div>
        </div>
      </div>
      <!-- Movie Introduction -->
      <div class="movie-introduction">
        <h2>Movie Introduction</h2>
        <p>{{ anime.descs }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cover-container {
  width: 100%;
  max-width: 230px; /* Control the maximum width of the cover */
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
}

.cover-image {
  display: block; /* Remove inline spacing */
  width: 100%;
  height: auto;
}

.title {
  font-size: 2em;
  //margin-bottom: 1em;
  text-align: center;
  color: #333;
}

.info-section {
  font-size: 14px;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

/* Styles for other elements such as synopsis, genres, and episodes */
.synopsis {
  margin-bottom: 1em;
}

.genre,
.episodes {
  margin-bottom: 0.5em;
}
.region,
.author,
.cast {
  margin-bottom: 0.5em;
}

.movie-introduction {
  margin-top: 1em;
}

.movie-introduction h2 {
  margin-bottom: 0.5em;
}
</style>
