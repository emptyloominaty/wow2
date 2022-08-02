class Shadowfiend extends Ability {
    constructor() {
        let name = "Shadowfiend"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 180
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.petData = {
            name:"Shadowfiend",
            abilities:{},
            color:"#555256",
            size:6,
            do:[{name:"goMelee"}],
            autoAttackDamage:0.85
        }
        this.petDuration = 15
        this.duration = 15
        this.effect = [{name:"restoreMana",val:5}]
    }

    getTooltip() {
        if (player.spec==="discipline") {
            return "Summons a shadowy fiend to attack the target for 15 sec.<br>" +
                "Generates 1% Mana each time the Shadowfiend attacks."
        } else {
            return "Summons a shadowy fiend to attack the target for 15 sec.<br>" +
                "Generates 3 Insanity each time the Shadowfiend attacks."
        }

    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (caster.spec==="shadow") {
                this.effect[0].val = 15
            }
            spawnPet(caster,"guardian",this.petData.name,caster.x+20,caster.y+20,this)
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}