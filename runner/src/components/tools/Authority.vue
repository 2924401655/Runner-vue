<script>
export default {
  name: "AuthorityPage",

  props:{
    permission:{
      type:[String,Array],

    }
  },
  data(){

    return {
      permissions: this.props.permission,
    }
  },
  methods:{
    showSlot(){
      if(!permissions) {
        return true;
      }

    }
  },
  computed(){
      this.showSlot()

    if(Array.isArray(this.permissions)){
      return this.props.permission.every(item=>{
        this.permissions.includes(item)
      })
    }else {
      return this.permissions.includes(props.permission)
    }
  }
}
</script>

<template>
  <div id="auth">
    <slot v-if="showSlot" :userPermission="permissions"></slot>

  </div>
</template>

<style scoped>

</style>