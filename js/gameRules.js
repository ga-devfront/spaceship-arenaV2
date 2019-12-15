export default () => {
        return `<h2>What is SpaceShip Arena ?</h2>
        <p>Spaceship Arena is a turn-based board game for 2 players and is taking place in a futuristic spatial universe.</p>
        </br>
        <h2>Aim of the game :</h2>
        <p>The first player who achieve to lower his opponent’s points of life under 0 wins. </p>
        </br>
        <h2>Before playing :</h2>
        <p>ach players have to choose a ship. Be aware that each ship has different sizes and statistics.
        <ul>
        <li> The attack : is used to inflict more damages to the opponents’s ship.</li>
        <li>The defense : is used to reduce the damages done.</li>
        <li>  The speed : allows you to move to multiple boxes for each lap.</li>
        </ul>
        Once both players have chosen their ship, the game can begin.</p>
        </br>
        <h2>Stages of play :</h2>
        <p>The player’s lap has 2 different stages possible :
        <ul>
        <li><b>The stage of movement :</b> it allows the player to move on the map by selecting the chosen box and also, the ship’s orientation once arrived at that box (warning : all the orientations are not always possible).  The player can pass the phase of movement by clicking on the button ‘’skip move’’.</li>
        <img src="img/moveExemple.png">
        <li><b>The stage of attack :</b> this stage is activate only if an opponent is in front of you (on the box in front of your ship). it allows to attack the opponent’s ship. You can choose to pass the stage of attack by clicking on the button ‘’skip attack’’.
        <img src="img/attackExemple.png"></li>
        </ul>
        </p>
        </br>
        <h2>The equipment :</h2>
        <p>There are 4 types of equipment :
        <ul>
        <li><img src="img/miniShield.png"> The shield : increases your defense.</li>
        <li><img src="img/miniGun.png"> The ammunition : increases your attack.</li>
        <li><img src="img/miniSpeed.png"> The energy : increases your speed.</li>
        <li><img src="img/miniHealthpack.png">The healtpack : regenerates 25 points of life (it is destroyed once used).</li>
        It’s possible to use only one equipment at once on your ship. If you want to take an equipment, you need to move your ship on top of it. Warning : if you collect a new equipment but you already have one on your ship, the old equipement will stay on your box on your next move.
        </p>`;
}