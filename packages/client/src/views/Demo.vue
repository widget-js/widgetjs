<template>
  <div ref="demo" class="demo"
       :style="{width:windowWidth+'px',height:windowHeight+'px',backgroundColor:backgroundColor}">
    <div class="container" id="container" :style="{
        width:width+32+'px',
    '--rx':'0deg',
    '--scale':scaleTransition,
    '--ry':rotateYTransition + 'deg',
    '--tx': xTransition+'px',
    '--ty': yTransition+'px',
    backgroundColor:focus? 'rgba(255, 255, 255, 0.05)':'transparent'
    }">
      <div :class="{title:true,hidden:!showContainerElements}">时间进度组件</div>

      <widget-frame @click="clicked" :key="showContainerElements" :style="{
        width:width+'px',
    '--rx':'0deg',
    '--ry':rotateYTransition + 'deg',
    }" :url="widgetUrl" :height="height" :width="width" :show-cover="true" id="1"/>
      <div :class="{subtitle:true,hidden:!showContainerElements}">源码</div>
      <div :class="{github:true,hidden:!showContainerElements}"><img src="@/assets/images/github-mark-white.png" alt=""> widget-js/widgets
      </div>
      <div :class="{logo:true,hidden:!showContainerElements}">
        <img src="@/assets/images/storybook.svg" alt=""/>
        <img src="@/assets/images/vue.png" alt=""/>
        <img src="@/assets/images/typescript.svg" alt=""/>
      </div>
    </div>
    <!--    <div class="origin" :style="{position:'fixed',width:'10px',height:'10px',backgroundColor:'red',-->
    <!--top:(yTransition + height/2)+'px',-->
    <!-- left:(xTransition + width/2)+'px'-->
    <!--    }"></div>-->
    <div>

    </div>
  </div>

</template>

<script lang="ts">

import WidgetFrame from "@/components/WidgetFrame.vue";
import {nextTick, ref} from "vue";
import {TransitionPresets, useTransition, useWindowSize} from "@vueuse/core";

export default {
  name: "Demo",
  components: { WidgetFrame},
  setup() {
    const scale = ref(1);
    const rotateY = ref(0);
    const transitionOption = {duration: 1500, transition: TransitionPresets.easeOutCubic};
    const rotateYTransition = useTransition(rotateY, transitionOption);
    const scaleTransition = useTransition(scale, transitionOption);
    const width = 388;
    const height = 182;
    const widgetUrl = ref("http://127.0.0.1:8088/#/widget/time_progress?w_x=4&w_y=4&w_width=4&w_height=2&w_width_px=388&w_height_px=182&w_id=1670545906274&w_name=fun.zujian.widgets.time_progress&w_title=%E6%97%B6%E9%97%B4%E8%BF%9B%E5%BA%A6&win_browser=true")
    const marginTop = ref(1000);
    const focus = ref(false);

    const startX = 1650 - 12;
    const startY = 450;
    const x = ref(startX);
    const y = ref(startY);
    const z = ref(-30);
    const {width: windowWidth, height: windowHeight} = useWindowSize();

    const showContainerElements = ref(false);
    const xTransition = useTransition(x, {
      ...transitionOption, onFinished: () => {
        showContainerElements.value = focus.value;
        widgetUrl.value = widgetUrl.value + "1";
      }
    });
    const yTransition = useTransition(y, transitionOption);
    const zTransition = useTransition(z, transitionOption);

    const demo = ref(null)
    return {
      marginTop,
      showContainerElements,
      startX,
      startY,
      x,
      windowWidth,
      windowHeight,
      y,
      z,
      xTransition,
      yTransition,
      rotateY,
      rotateYTransition,
      zTransition,
      widgetUrl,
      width,
      scaleTransition,
      scale,
      focus,
      height
    }
  },
  watch: {
    focus(newValue, oldValue) {
      if (newValue) {
        this.rotateY += 360;
        this.scale = 2.5;
        this.x = this.windowWidth / 2 - this.width / 2
        this.y = this.windowHeight / 2 - this.height
      } else {
        this.rotateY -= 360;
        this.scale = 1;
        this.x = this.startX;
        this.y = this.startY;
      }
    }
  },
  computed: {
    backgroundColor() {
      return this.focus ? "#27282c" : "transparent";
    }
  },
  methods: {
    clicked() {
      this.focus = !this.focus;
    }
  },
  async mounted() {
    await nextTick();
  }
}


</script>

<style scoped lang="scss">
body {
  margin: 0;
  font-size: 14px;
  font-family: "Microsoft YaHei","OPPOSans R",serif;
}

* {
  color: white;
  transition-property: opacity;
  transition-duration: 500ms;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

.demo {

  transition-property: background-color;
  transition-duration: 1.5s;

  .container {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    perspective: 1000px;
    padding-top: 16px;
    padding-bottom: 16px;
    transition-property: background-color;
    transform: translate3d(var(--tx), var(--ty), 0) scale(var(--scale));
    .hidden {
      opacity: 0;
    }

    .title {
      font-size: 1.5rem;
    }

    .subtitle {
      font-size: 18px;
      margin-bottom: 8px;
    }

    .github {
      margin-bottom: 24px;
      font-size: 0.9rem;
      display: flex;
      justify-items: center;
      justify-content: center;
      img{
        margin-right: 8px;
        width: 16px;
        height: 16px;
      }
    }

    .logo {
      * {
        height: 32px;
        margin-left: 1rem;
        margin-right: 1rem;
      }
    }


  }
}

.widget-frame {
  //margin-top: 300px;
  transition-duration: 1s;
  will-change: transform;
  margin: 1rem;
  transform: rotateY(var(--ry)) rotateX(var(--rx));
  outline: none;
  transition: box-shadow 0.4s ease, outline 0.2s ease;
}
</style>
