import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jQuery';
import { Warlord } from './warlord';
import mage from './img/mage.png';
import warrior from './img/warrior.png';
$(document).ready(function() {
  $("img#selectWarrior").attr("src",warrior);
  $("img#selectMage").attr("src",mage);
// select class and create character
  $("img#selectWarrior").click(function(){
    let fighter="Warrior";
    let name=$("textarea").val();
    var player = new Warlord(fighter, name);
    player.buildWarrior();
    start(player);
  });
  $("img#selectMage").click(function(){
    let fighter="Mage";
    let name=$("textarea").val();
    var player = new Warlord(fighter, name);
    player.buildMage();
    start(player);
  });
});
function start(player){
  // start game and select whether to skip levels
  $(".intro").hide();
  $(".move").show();
$("img#player").attr("src", (player.image));
  let stage=1;
  $(".move").show();
  $(".move").append(`<img src="${player.image}" id="player">`);
  // generate enemy based on selected level
  let enemy=new Warlord("Fighter","Enemy");
  $("button#nextLevel").click(function(){
    stage++;
    enemy.buildRandomEnemy(stage);
    battle(player,enemy);
  });
  $("button#currentLevel").click(function(){
    enemy.buildRandomEnemy(stage);
    battle(player,enemy);
  });
}
// start battle with enemy
function battle(player,enemy){
  $(".move").hide();
  $(".battle").show();
  $(".battle").prepend(`<img src="${enemy.image}" id="enemy"><br>`);
  $(".battle").append(`<img src="${player.image}" id="player">`);
  $(".battle").prepend(`<p>Enemy Health: <span id = "enemyHP">${enemy.currentHP}</span> </p>`);
  $(".battle").append(`<p>Player Health: <span id = "playerHP">${player.currentHP}</span></p>`);
  $(".battle").prepend(`<p>Enemy Mana: <span id = "enemyMP">${enemy.currentMP}</span> </p>`);
  $(".battle").append(`<p>Player Mana: <span id = "playerMP">${player.currentMP}</span></p>`);

  attack(player,enemy);

}
function attack(player,enemy){
  $("button#hit").click(function(){
    player.hit(enemy);
    $("span#enemyHP").text(enemy.currentHP);
    $("span#enemyMP").text(enemy.currentMP);
    if (enemy.currentHP>0 && player.currentHP>0) {
      enemy.enemyHit(player);
      $("span#playerHP").text(player.currentHP);
      $("span#playerMP").text(player.currentMP);
      $("button#hit").off("click");
      attack(player,enemy);
    } else {
      enemy.battleEnd(player);
      $("button#hit").off("click");
    }

  });
  $("button#specialHit").click(function(){
    player.specialHit(enemy);
    $("span#enemyHP").text(enemy.currentHP);
    $("span#enemyMP").text(enemy.currentMP);
    if (enemy.currentHP>0 && player.currentHP>0) {
      enemy.enemyHit(player);
      $("span#playerHP").text(player.currentHP);
      $("span#playerMP").text(player.currentMP);
      $("button#specialHit").off("click");
      attack(player,enemy);
    } else {
      enemy.battleEnd(player);
      $("button#specialHit").off("click");
    }
  })
}
