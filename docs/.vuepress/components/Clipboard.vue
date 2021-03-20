<template>
  <div>
    <!-- eslint-disable-next-line prettier/prettier -->
    <p>{{ text.beforeAuthor }}{{ authorName || text.author }}{{ text.afterAuthor}}<a :href="location">{{ decodeURIComponent(location) }}</a></p>
    &#10;
    <div v-html="html" />
  </div>
</template>

<script>
import options from '@dynamic/copyright-options';

export default {
  props: {
    html: String
  },
  data() {
    return {
      text: {
        author: '作者',
        beforeAuthor: '著作权归',
        afterAuthor: '所有。\n链接：'
      }
    };
  },
  created() {
    this.authorName = typeof options.authorName === 'string' ? options.authorName : this.getI18nValue(options.authorName);
    this.location = String(location).replace(/#.+$/, '');
  }
};
</script>
