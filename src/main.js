import Phaser from "phaser";

import MainMenu from "./menuScene/MainMenu";
import SettingsMenu from "./menuScene/SettingsMenu";
import ControlMenu from "./menuScene/ControlMenu";
import LevelFirst from "./levelScene/levelFirst";
import LevelSecond from "./levelScene/levelSecond";
import DialogIntro from "./levelScene/dialog/DialogIntro";
import DialogLevel1 from "./levelScene/dialog/DialogLevel1";

const config = {
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  type: Phaser.AUTO,
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [
    MainMenu,
    SettingsMenu,
    ControlMenu,
    LevelFirst,
    LevelSecond,
    DialogIntro,
    DialogLevel1,
  ],
  callbacks: {
    postBoot: function (game) {
      game.scene.dump();
    },
  },
};

const game = new Phaser.Game(config);
