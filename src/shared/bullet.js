'use strict'

const Line = require('./line');

module.exports = class Bullet{
    fireFrom(owner){
      this.owner = owner;
      this.trajectory = new Line();

      let gun_point = owner.getGunpoint();
      let orientation = owner.orientation + 2.5 - Math.random() * 5;
      if (orientation >= 360) orientation -= 360;
      if (orientation < 0) orientation += 360
      this.trajectory.makeByOrientation(gun_point.x ,gun_point.y, orientation, 500);
    }

    startFade(){
      this.last_update = Date.now();
      this.color = "#f4d742";
      this.fade_rate = .2; //fades 20% every 100 ms
      this.transparency = 1;
    }

    fade(){
      let delta_time = Date.now() - this.last_update;
      this.transparency -= this.fade_rate * delta_time/100; //

      if(this.isFinished())
        this.transparency = 0;
    }

    isFinished(){
      return this.transparency <= 0;
    }

}
