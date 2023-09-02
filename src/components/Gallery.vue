<script setup lang="ts">
import type { Keyswitch } from '../types';
import { getImgUrl, getTravelText, getPreTravelText, getTriggerForceText } from '../util';

interface Props {
    switchesData: Keyswitch[],
}

const props = defineProps<Props>();

const onItemClicked = (name: string) => {
    console.log('Clicked', name);
};

const getColorClass = (idx: number) => ({
    'gallery__item__color': true,
    ['color' + idx]: true,
});

const getColorStyle = (color: string) => {
    return color === 'transparent' ? {} : {
        'background-color': color,
    };
};
</script>

<template>
    <div class="gallery">
        <div v-for="(item, index) in props.switchesData" :key="index"  @click="onItemClicked(item.name)" class="gallery__item">
            <div class="gallery__item__inner">
                <div class="gallery__item__type">{{  item.type }}</div>
                <div class="gallery__item__img"><img :src="getImgUrl(item.img_src)" /></div>
                <div class="gallery__item__name fit-to-width"><p>{{ item.name }}</p></div>
                
                <div class="gallery__item__flags">
                    <font-awesome-icon v-if="item.is_silent" class="icon" icon="fa-solid fa-moon" />
                    <font-awesome-icon v-if="item.lighting_support" class="icon" icon="fa-solid fa-circle-half-stroke" />
                </div>

                <div class="gallery__item__detail">
                    <div class="gallery__item__detail__inner">
                        <span>Trigger: {{ getTriggerForceText(item) }}</span><br/>
                        <span>Travel dist.: {{ getTravelText(item) }}</span><br/>
                        <span>Pre-travel dist.: {{ getPreTravelText(item) }}</span>
                    </div>
                </div>

                <div
                     v-for="(color, colorIdx) in item.colors ?? []" 
                     :key="colorIdx"
                     :class="getColorClass(colorIdx)"
                     :style="getColorStyle(color)"
                ></div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.gallery {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;

    &__item {
        // border: 1px solid rgb(237, 227, 227);
        aspect-ratio: 1 / 1;
        position: relative;
        
        &__inner {
            border: 1px dashed gray;
            transform: rotateZ(-45deg);
            transform-origin: center;
            position: absolute;
            width: 70%;
            height: 70%;
            left: 15%;
            top: 15%;
            box-sizing: border-box;
            pointer-events: none;
            user-select: none;
        }

        &:hover &__detail {
            width: 100%;
        }

        &__detail {
            display: none;

            &__inner {
                transform: rotateZ(45deg);
                position: absolute;
                transform-origin: center;
                left: 10%;
                top: 10%;
                width: 80%;
                height: 80%;
                color: #444;
                font-size: 1rem;
                white-space: nowrap;
            }
        }

        @media (min-width: 769px) {
            &__detail {
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                transition: 0.2s ease-in-out;
                width: 0%;
                height: 100%;
                background-color: #aaaaaaee;
                overflow: hidden;
            }
        }
        
        &__type {
            position: absolute;
            bottom: 100%;
            text-transform: capitalize;
        }

        &__name {
            position: absolute;
            bottom: 5%;
            font-size: 1em;
            font-weight: bold;
            text-transform: uppercase;
            color: #ffffff;
            text-shadow: 1px 1px 3px #000000c2;
            background: #11111185;
            width: 100%;
            height: 30%;
            padding: 2px;
            box-sizing: border-box;

            p {
                margin-left: 5px;
            }
        }

        &__img {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            padding: 10px;
            box-sizing: border-box;

            img {
                transform: rotateZ(45deg);
                max-width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        &__flags {
            position: absolute;
            top: 2%;
            bottom: 50%;
            right: 2%;

            .icon {
                display: block;
                transform: rotateZ(45deg);
                margin-bottom: 7px;
            }
        }

        &__color {
            position: absolute;
            top: 0;
            width: 6%;
            height: 15px;
            border: 1px solid #888;
        }

        .color0 {
            left: 0;
        }

        .color1 {
            left: 10%;
        }

        .color2 {
            left: 20%;
        }

        .color3 {
            left: 30%;
        }
    }
}

// TODO: construct in for-loop
.gallery .gallery__item:nth-child(5n+1) {
    grid-column: 1 / span 2;
}

.gallery .gallery__item:nth-child(5n+2) {
    grid-column: 3 / span 2;
}

.gallery .gallery__item:nth-child(5n+3) {
    grid-column: 5 / span 2;
}

.gallery .gallery__item:nth-child(5n+4) {
    grid-column: 2 / span 2;
}

.gallery .gallery__item:nth-child(5n) {
    grid-column: 4 / span 2;
}


/* 
 * ref: https://kizu.dev/fit-to-width-text/
 */
@supports (animation-range: entry-crossing) {
  .fit-to-width {
    font-size: 3rem;
    overflow: hidden;

    scroll-snap-type: both mandatory;

    & > * {
      inline-size: max-content;
      line-height: 1;
      transform-origin: 0 0;

      animation: apply-text-ratio linear;
      animation-timeline: view(inline);
      animation-range: entry-crossing;

      display: block;
      scroll-snap-align: start;
      contain: layout;
    }
  }
}

@keyframes apply-text-ratio {
  from {
    transform: scale(0);
    margin-block-end: -1lh;
  }
}
</style>
