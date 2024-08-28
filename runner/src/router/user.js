import User from "@/api/user"
import UserPage from "@/components/User/UserPage.vue"
import { component } from "vue/types/umd"

const UserRoute = {
    path:'/user',
    component:()=>import("@/components/User/UserPage.vue"),
    children:[
        {
            path:'/user/rank',
            component:()=>import("@/components/User/RankPage.vue")
        }
    ]
}