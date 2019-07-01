<template lang="pug">
    .container

        .tool-submit-box
            h1 Submit a tool

            form
                label(for="title") Name of the tool
                input(name="title")
                label(for="title") Description
                textarea(name="description")
                .links
                    h3 links
                    p Fill in all applicable (minimum one)
                    .group
                        label(for="link") Website:
                        input(name="link")
                    .group
                        label(for="github") Github:
                        input(name="github")
                    .group
                        label(for="npm") npm:
                        input(name="npm")
                label(for="tags") Tags
                input(name="tags")
                label(for="image") Image 
                input(name="image" type="file" accept=".jpg, .png")
</template>

<script>
export default {

}
</script>

<style lang="scss">

.tool-submit-box{
    background: rgba(91, 91, 94, 0.192);
    padding: 15px;
    overflow: hidden;
    margin: 5px auto;
    box-shadow: 0px 2px 5px 0px rgba(14, 25, 41, 0.603);
    max-width: 1080px;
    h1{
        margin: 50px auto;
    }
    label, input, textarea{
            display: block;
            width: 100%;
            max-width: 600px;
            margin: 0px auto;
        }

        label{
            color: rgb(238, 196, 81);
            text-align: left;
            margin-top: 20px;
            margin-bottom: 5px;
        }

        input, textarea{
            border: none;
            border-radius: none;
            font-size: 16px;
            background: rgb(81, 91, 100);
            padding: 7px;
            color: rgb(170, 224, 255);
        }
        ::placeholder{
            color: rgb(102, 129, 146);
        }
        
    
    button{
            border: none;
            border-radius: none;
            padding: 5px 15px;
            background: rgb(135, 177, 201);
            font-size: 16px;
        }

        .links{
            padding: 10px;
            
            h3{
                color: rgb(170, 224, 255);
                text-align: left;
                max-width: 600px;
                margin: 5px auto;
            }
            p{
                color: rgb(238, 196, 81);
                text-align: left;
                max-width: 600px;
                margin: 5px auto;
            }
            .group{
                max-width: 600px;
                display: flex;
                margin: 20px auto;
                margin-bottom: 0px;
            }
            input{
                flex-grow:1;
            }
            label{
                flex-grow:0;
                flex-basis: 125px;
                margin: 0px;
                display: flex;
                align-items: center;
                background: rgb(238, 196, 81);
                color: rgb(47, 53, 58);
                padding: 10px;
                
            }
        }
    
}

</style>
