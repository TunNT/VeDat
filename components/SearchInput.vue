<template>
  <el-input
    v-model="input"
    :size="size"
    type="text"
    :placeholder="placeholder"
    :prefix-icon="prefixIcon"
    :suffix-icon="suffixIcon"
    :disabled="disabled"
    :label="label"
    :clearable="clearable"
    :id="idElement"
    @input="onInputHandler"
    @clear="clearable ? onClearHandler : () => {}"
    @change="$emit('onChangeHandler', $event)"
  >
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
</template>

<script>
export default {
  props: {
    search: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    idElement: {
      type: String,
      default: ""
    },
    prefixIcon: {
      type: String,
      default: ""
    },
    suffixIcon: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "Nhập để tìm kiếm"
    },
    size: {
      type: String,
      default: "small"
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    typeInput: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    input: ""
  }),
  watch: {
    search: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.input = newValue;
      }
    }
  },
  methods: {
    onClearHandler() {
      $emit("onChangeHandler", "");
    },
    onInputHandler(event) {
      if (!this.$props.typeInput) return;
      this.input = event.replace(/[^0-9]/g, "");
    }
  }
};
</script>
