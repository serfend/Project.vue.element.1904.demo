<template>
  <el-select
    v-model="result"
    clearable
    reserve-keyword
    :loading="loading"
    class="el-flex fill-width"
    @change="loadlist"
  >
    <el-option
      v-for="item in showoutlist"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      class="el-opt"
    />
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      showoutlist: [
        { label: '无单位', value: 'null' },
        { label: '获取单位列表', value: '' }
      ],
      loading: false,
      serverData: {},
      result: ''
    }
  },
  mounted() {
    this.result = 'null'
  },
  methods: {
    submit() {
      this.$emit('valueChange', this.result)
    },
    loadlist() {
      this.submit()
      var query = this.result
      if (query === 'null') return
      else if (query.length < 4) query = 'Root'
      else if (query.substring(0, 4) !== 'Root') query = 'Root/' + query

      this.loading = true
      this.$store
        .dispatch('company/getdic', query)
        .then(res => {
          this.serverData = res
          this.showoutlist = []
          this.serverData.child.forEach(item => {
            this.showoutlist.push({
              label: item.path.replace('Root/', ''),
              value: item.path
            })
          })

          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss">
.el-flex {
  align-items: flex-start;
  display: flex;
  flex: 1 1 auto;
}
.el-opt {
  color: #000000;
}
.fill-width {
  width: 100%;
}
</style>
