<template>
  <el-row>
    <el-col :sm="12" :lg="6">
    <el-result icon="error" title="错误提示" subTitle="请根据提示进行操作">
      <template slot="extra">
        <el-button type="primary" size="medium">返回</el-button>
      </template>
    </el-result>
  </el-col>
  </el-row>
</template>

<script>
export default {

}
</script>

<style>

</style>