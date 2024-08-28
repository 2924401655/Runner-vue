<template>
    <div class="container">
        <div class="task">
            <!-- <img src="../assets/task.png" alt=""> -->
        </div>
        <h3>接单人</h3>
        <div class="runner">
            <!-- <img src="../assets/runner.png" alt=""> -->
            <a href=""></a>
            <a href=""></a>
        </div>
    </div>
</template>

<script >
export default {
    data(){
        return {
            param:0,
        }
    },
    methods:{
        setParam(){
            if(!this.$router.params.orderid) {
                history.go(-1)
            }
            this.param = this.$router.params.orderid
        },
        // getOrderInfoById(orderid) { 
        
        // }
    },
    computed:{
        
    },
    mounted:{
        
}
}
</script>

<style scoped>
.task {
    width: auto;
    height: auto;
    background-color: rgb(249,249,249);
}
.runner {
    display: flex;
    
}
</style>