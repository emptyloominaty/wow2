class FeralSpirit extends Ability {
    constructor() {
        let name = "Feral Spirit"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.petData = {
            name:"Feral Spirit",
            abilities:{},
            color:"rgba(181,251,255,0.63)",
            size:4,
            do:[{name:"goMelee"}],
            autoAttackDamage:0.85
        }
        this.petDuration = 15
        this.duration = 15
        this.timer1 = 0
        this.timer2 = 3
    }

    getTooltip() {
        return "Summons two Spirit Wolves that aid you in battle for 15 sec. They are immune to movement-impairing effects.<br>" +
            "<br>" +
            "Feral Spirit generates one stack of Maelstrom Weapon immediately, and one stack every 3 sec for 15 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            spawnPet(caster,"guardian",this.petData.name,caster.x+20,caster.y,this,true)
            spawnPet(caster,"guardian",this.petData.name,caster.x-20,caster.y,this,true)
            applyBuff(caster,caster,this)
            applyBuff(caster,caster,caster.abilities["Maelstrom Weapon"],1,true)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    runBuff(caster, buff, id = 0) {
        if (this.timer1<this.timer2) {
            this.timer1 += progressInSec
        } else {
            this.timer1 = 0
            applyBuff(caster,caster,caster.abilities["Maelstrom Weapon"],3,true)
        }
    }

}