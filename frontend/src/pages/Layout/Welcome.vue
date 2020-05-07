<template>
    <div>
        <h1>We Drive </h1>
        <img class="img" :src="weDriveLogo" />
        
    </div>
</template>

<script>
export default{
    props: {
        weDriveLogo: {
        type: String,
        default: require("@/assets/img/weDrive.png")
        }
    },
    watch : {
            $router(to,from){
                console.log("to",to);
                console.log("from", from);
            }
        }
};
</script>

<style></style>