<template>
  <q-item clickable tag="a" :href="link">
    <q-item-section>
      <q-item-label>{{ title }}
        <span class="text-grey-6 text-h7"> - {{ caption }}명 참여</span>
      </q-item-label>
      <!-- <q-item-label caption>{{ caption }}명 참여</q-item-label> -->
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'MainChannelListItem',
  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    },

    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      link: `/#/channels/${this.id}`
    }
  }
}
</script>
