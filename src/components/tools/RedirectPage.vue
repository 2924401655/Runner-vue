<template>
  <h1> 你进入了一个未曾定义的页面 即将返回首页~</h1>
</template>

<script>

export default {
    
    methods:{
        Redirect(){
            setTimeout(() => {
                this.$router.push('/')
                
            }, 3000);
        }
    },
    mounted(){
        this.Redirect()
    }
}
</script>

<style>

</style>