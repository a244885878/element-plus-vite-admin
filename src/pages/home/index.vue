<template>
  <div id="main_box">
    <h2>你好，亲爱的管理员，勤奋工作的人最优秀</h2>
    <div id="animation">
      <a href="#" title="咻咻咻~">
        <div class="spaceship">
          <div class="antenna"></div>
          <div class="body"></div>
          <div class="window"></div>
          <div class="fins"></div>
          <div class="rocket"></div>
          <div class="fireWrapper">
            <div class="fire">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#main_box {
  width: 100%;
  height: calc(80vh);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
h2 {
  width: 100%;
  text-align: center;
  margin-top: 30px;
  opacity: 0.7;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
#animation {
  animation: flight 3s ease-in-out 0s infinite alternate none;
  -webkit-animation: flight 3s ease-in-out 0s infinite alternate none;
  width: 100%;
  // float: right;
  // height: 50vh;
  // z-index: 100;
  margin-top: -200px;
  margin-right: 300px;
}
.spaceship {
  position: absolute;
  -webkit-transform: scale(0.76) rotate(45deg);
  -moz-transform: scale(0.76) rotate(45deg);
  -ms-transform: scale(0.76) rotate(45deg);
  -o-transform: scale(0.76) rotate(45deg);
  transform: scale(0.76) rotate(45deg);
  top: 20%;
  left: 65%;
}
.spaceship .body {
  width: 300px;
  height: 300px;
  margin-top: -150px;
  margin-left: -150px;
  border-radius: 300px;
  position: absolute;
  box-shadow: -33px -33px 0 rgba(228, 230, 234, 0.6) inset;
  background-color: rgba(235, 236, 240, 1);
  -webkit-transform: scale(0.46, 1);
  -moz-transform: scale(0.46, 1);
  -ms-transform: scale(0.46, 1);
  -o-transform: scale(0.46, 1);
  transform: scale(0.46, 1);
  overflow: hidden;
}
.spaceship .body:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 285px;
  background-color: rgba(255, 153, 145, 1);
  border-radius: 300px;
  -webkit-transform: scale(0.9, 0.46);
  -moz-transform: scale(0.9, 0.46);
  -ms-transform: scale(0.9, 0.46);
  -o-transform: scale(0.9, 0.46);
  transform: scale(0.9, 0.46);
  margin-top: -180px;
}
.spaceship .window {
  width: 40px;
  height: 40px;
  margin-top: -40px;
  margin-left: -26px;
  border: 6px solid rgba(215, 216, 220, 1);
  background-color: rgba(245, 246, 255, 1);
  overflow: hidden;
  position: absolute;
  border-radius: 40px;
}
.spaceship .window:before,
.spaceship .window:after {
  width: 5px;
  height: 60px;
  position: absolute;
  content: "";
  margin-left: 16px;
  margin-top: -5px;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  background-color: #fff;
  opacity: 0.5;
}
.spaceship .window:before {
  margin-top: 10px;
}
.spaceship .fins {
  position: absolute;
  margin-top: -60px;
  z-index: -1;
}
.spaceship .fins:before,
.spaceship .fins:after {
  content: "";
  position: absolute;
  border-color: rgba(255, 153, 145, 1);
  height: 30px;
  border-top: 140px solid transparent;
  border-bottom: 20px solid transparent;
}
.spaceship .fins:before {
  border-right: 100px solid rgba(255, 153, 145, 1);
  margin-left: -100px;
}
.spaceship .fins:after {
  border-left: 100px solid rgba(255, 153, 145, 1);
}
.spaceship .antenna {
  position: absolute;
  background-color: rgba(235, 236, 240, 1);
  margin-top: -200px;
  margin-left: -2px;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 60px;
}
.spaceship .antenna:before {
  width: 16px;
  height: 16px;
  content: "";
  background-color: rgba(235, 236, 240, 1);
  box-shadow: -3px -3px 0 rgba(225, 226, 230, 1) inset;
  position: absolute;
  border-radius: 16px;
  margin-top: -8px;
  margin-left: -6px;
}
.spaceship .rocket {
  width: 60px;
  height: 10px;
  position: absolute;
  border-top: 30px solid rgba(130, 134, 138, 1);
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  margin-top: 120px;
  margin-left: -40px;
}
.spaceship .rocket:before {
  background-color: rgba(130, 134, 138, 1);
  margin-top: -70px;
  margin-left: -10px;
  position: absolute;
  content: "";
  border-radius: 80px;
  -webkit-transform: scale(1, 0.25);
  -moz-transform: scale(1, 0.25);
  -ms-transform: scale(1, 0.25);
  -o-transform: scale(1, 0.25);
  transform: scale(1, 0.25);
  width: 80px;
  height: 80px;
}
.spaceship .rocket:after {
  background-color: rgba(120, 124, 128, 1);
  margin-top: -30px;
  position: absolute;
  content: "";
  border-radius: 80px;
  -webkit-transform: scale(1, 0.15);
  -moz-transform: scale(1, 0.15);
  -ms-transform: scale(1, 0.15);
  -o-transform: scale(1, 0.15);
  transform: scale(1, 0.15);
  width: 60px;
  height: 60px;
}
.spaceship .fireWrapper {
  position: absolute;
  overflow: hidden;
  border-radius: 60px;
  width: 60px;
  height: 500px;
  margin-top: -66px;
  margin-left: -30px;
  z-index: 100;
  -webkit-transform: scale(1, 0.15);
  -moz-transform: scale(1, 0.15);
  -ms-transform: scale(1, 0.15);
  -o-transform: scale(1, 0.15);
  transform: scale(1, 0.15);
}
.fire {
  position: absolute;
  margin-top: 140px;
  width: 60px;
  height: 60px;
  opacity: 0.9;
  -webkit-transform: scale(1, 6.67);
  -moz-transform: scale(1, 6.67);
  -ms-transform: scale(1, 6.67);
  -o-transform: scale(1, 6.67);
  transform: scale(1, 6.67);
}
.fire div {
  position: absolute;
  -webkit-transform-origin: top center;
  transform-origin: top center;
  border-top: 30px solid rgba(255, 0, 0, 1);
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  opacity: 0;
}
.fire div:nth-of-type(1) {
  animation: fire 0.35s linear 0s infinite alternate none;
  -webkit-animation: fire 0.35s linear 0s infinite alternate none;
  opacity: 0.8;
  margin-left: 5px;
  border-top-color: rgba(255, 190, 100, 1);
  border-top-width: 50px;
  z-index: -1;
}
.fire div:nth-of-type(2) {
  animation: fire 0.38s linear -0.5s infinite alternate none;
  -webkit-animation: fire 0.38s linear -0.5s infinite alternate none;
  opacity: 0.8;
  margin-left: 16px;
  border-top-color: rgba(255, 140, 100, 1);
  border-top-width: 40px;
  z-index: 0;
}
.fire div:nth-of-type(3) {
  animation: fire 0.4s linear -1s infinite alternate none;
  -webkit-animation: fire 0.4s linear -1s infinite alternate none;
  opacity: 0.8;
  margin-left: -6px;
  border-top-color: rgba(255, 160, 100, 1);
  border-top-width: 30px;
  z-index: 1;
}
.fire div:nth-of-type(4) {
  animation: fire 0.55s linear -1.2s infinite alternate none;
  -webkit-animation: fire 0.55s linear -1.2s infinite alternate none;
  opacity: 0.8;
  margin-left: 9px;
  border-left-width: 20px;
  border-right-width: 20px;
  border-top-color: rgba(255, 200, 100, 1);
  border-top-width: 50px;
  z-index: -1;
}
.fire div:nth-of-type(5) {
  animation: fire 0.25s linear -1.2s infinite alternate none;
  -webkit-animation: fire 0.25s linear -1.2s infinite alternate none;
  opacity: 0.8;
  margin-left: 14px;
  border-left-width: 25px;
  border-right-width: 25px;
  border-top-color: rgba(255, 220, 100, 1);
  border-top-width: 35px;
  z-index: 2;
}
.fire div:nth-of-type(6) {
  animation: fire 0.25s linear -1.2s infinite alternate none;
  -webkit-animation: fire 0.25s linear -1.2s infinite alternate none;
  opacity: 0.8;
  margin-left: -6px;
  border-left-width: 25px;
  border-right-width: 25px;
  border-top-color: rgba(255, 230, 110, 1);
  border-top-width: 35px;
  z-index: 2;
}
@keyframes fire {
  100% {
    -webkit-transform: skew(30deg);
    -moz-transform: skew(30deg);
    -ms-transform: skew(30deg);
    -o-transform: skew(30deg);
  }
  74% {
    -webkit-transform: skew(-15deg);
    -moz-transform: skew(-15deg);
    -ms-transform: skew(-15deg);
    -o-transform: skew(-15deg);
    transform: skew(-15deg);
  }
  58% {
    -webkit-transform: skew(10deg);
    -moz-transform: skew(10deg);
    -ms-transform: skew(10deg);
    -o-transform: skew(10deg);
    transform: skew(10deg);
  }
  30% {
    -webkit-transform: skew(-35deg);
    -moz-transform: skew(-35deg);
    -ms-transform: skew(-35deg);
    -o-transform: skew(-35deg);
    transform: skew(-35deg);
  }
  0% {
    -webkit-transform: skew(25deg);
    -moz-transform: skew(25deg);
    -ms-transform: skew(25deg);
    -o-transform: skew(25deg);
    transform: skew(25deg);
  }
}
@-webkit-keyframes fire {
  100% {
    -webkit-transform: skew(30deg);
    -moz-transform: skew(30deg);
    -ms-transform: skew(30deg);
    -o-transform: skew(30deg);
  }
  74% {
    -webkit-transform: skew(-15deg);
    -moz-transform: skew(-15deg);
    -ms-transform: skew(-15deg);
    -o-transform: skew(-15deg);
    transform: skew(-15deg);
  }
  58% {
    -webkit-transform: skew(10deg);
    -moz-transform: skew(10deg);
    -ms-transform: skew(10deg);
    -o-transform: skew(10deg);
    transform: skew(10deg);
  }
  30% {
    -webkit-transform: skew(-35deg);
    -moz-transform: skew(-35deg);
    -ms-transform: skew(-35deg);
    -o-transform: skew(-35deg);
    transform: skew(-35deg);
  }
  0% {
    -webkit-transform: skew(25deg);
    -moz-transform: skew(25deg);
    -ms-transform: skew(25deg);
    -o-transform: skew(25deg);
    transform: skew(25deg);
  }
}
@keyframes flight {
  100% {
    -webkit-transform: translate(40px, 60px) rotate(-4deg);
    -moz-transform: translate(40px, 60px);
    -ms-transform: translate(40px, 60px);
    -o-transform: translate(40px, 60px);
    transform: translate(40px, 60px);
  }
  66% {
    -webkit-transform: translate(-30px, -50px) rotate(5deg);
    -moz-transform: translate(-30px, -50px) rotate(5deg);
    -ms-transform: translate(-30px, -50px) rotate(5deg);
    -o-transform: translate(-30px, -50px) rotate(5deg);
    transform: translate(-30px, -50px) rotate(5deg);
  }
  36% {
    -webkit-transform: translate(50px, 40px) rotate(-6deg);
    -moz-transform: translate(50px, 40px) rotate(-6deg);
    -ms-transform: translate(50px, 40px) rotate(-6deg);
    -o-transform: translate(50px, 40px) rotate(-6deg);
    transform: translate(50px, 40px) rotate(-6deg);
  }
  0% {
    -webkit-transform: translate(-40px, -30px) rotate(5deg);
    -moz-transform: translate(-40px, -30px) rotate(5deg);
    -ms-transform: translate(-40px, -30px) rotate(5deg);
    -o-transform: translate(-40px, -30px) rotate(5deg);
    transform: translate(-40px, -30px) rotate(5deg);
  }
}
@-webkit-keyframes flight {
  100% {
    -webkit-transform: translate(40px, 60px) rotate(-4deg);
    -moz-transform: translate(40px, 60px);
    -ms-transform: translate(40px, 60px);
    -o-transform: translate(40px, 60px);
    transform: translate(40px, 60px);
  }
  66% {
    -webkit-transform: translate(-30px, -50px) rotate(5deg);
    -moz-transform: translate(-30px, -50px) rotate(5deg);
    -ms-transform: translate(-30px, -50px) rotate(5deg);
    -o-transform: translate(-30px, -50px) rotate(5deg);
    transform: translate(-30px, -50px) rotate(5deg);
  }
  36% {
    -webkit-transform: translate(50px, 40px) rotate(-6deg);
    -moz-transform: translate(50px, 40px) rotate(-6deg);
    -ms-transform: translate(50px, 40px) rotate(-6deg);
    -o-transform: translate(50px, 40px) rotate(-6deg);
    transform: translate(50px, 40px) rotate(-6deg);
  }
  0% {
    -webkit-transform: translate(-40px, -30px) rotate(5deg);
    -moz-transform: translate(-40px, -30px) rotate(5deg);
    -ms-transform: translate(-40px, -30px) rotate(5deg);
    -o-transform: translate(-40px, -30px) rotate(5deg);
    transform: translate(-40px, -30px) rotate(5deg);
  }
}
</style>
