<!--  -->
<template>
  <div class="editor">
    <!-- <editor id='tinymce'  v-model='tinymceHtml' :init='init'></editor> -->
    <textarea  style="width:600px;height:200px;background:green;" id="tinymce"></textarea>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
export default {
  data() {
    return {
      tinymceHtml: "请输入内容",
      init: {
        language_url: "/static/tinymce/zh_CN.js",
        language: "zh_CN",
        skin_url: "/static/tinymce/skins/lightgray/skin.min.css",
        height: 300,
        menubar:false,
        plugins:
          "link lists image code table colorpicker textcolor wordcount contextmenu",
        toolbar:
          "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
        branding: false,
        // GLOBAL
        // Image
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions'
      }
    };
  },
  mounted () {
    tinymce.init({
      baseURL : '/static/tinymce',
      selector: '#tinymce',
      language: 'zh_CN',
      skin_url: "/static/tinymce/skins/lightgray/content.min.css",
    });
  },
  components:{
    // Editor
  }
};
</script>
<style lang='stylus' scoped>
.editor{
  height 1200px
}
</style>