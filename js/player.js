export {Player as default};

class Player  {
    constructor() {
        this.name = "";
        this.uuid = this.uuidRandom();
        this.ship = undefined;
		this.speed = undefined;
		this.offensif = undefined;
        this.defensif = undefined;
        this.orientation = undefined;
        this.pv = 100;
        this.weapon = undefined;
    }

    uuidRandom() {
        let carac = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        let randomUuid = "";
        for (let x = 0; x < 32; x++) {
            let randomCarac = carac[Math.floor(Math.random()*carac.length)];
            if (x == 8 || x == 12 || x == 16 || x == 20) {randomUuid = randomUuid + "-" + randomCarac} else {randomUuid = randomUuid + randomCarac}
        }
        return randomUuid;
        /*fonction pour généré un joueur random*/
    }
}