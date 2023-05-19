<template>
  <BaseFormField :title="title" :error="error">
    <textarea
      class="form__input form_input--aria"
      v-model="dataValue"
      type="text"
      name="name"
      :placeholder="placeholder"
    ></textarea>
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin'

export default {
    mixins: [formFieldMixin]
};
</script>
