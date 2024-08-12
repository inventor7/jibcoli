<template>
 <Button  class="  gap-2  my-2 " variant="ghost"  @click="onClick;
 router.back()" 
 >
    <ArrowLeft :size="24" />
  {{ props.text }}</Button>
</template>

<script lang="ts" setup>
import { ArrowLeft } from 'lucide-vue-next';
import router from '../../router/index';
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
});

const onClick = () => {
  router.back();
};
</script>