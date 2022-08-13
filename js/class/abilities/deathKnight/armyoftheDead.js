class ArmyoftheDead extends Ability {
    constructor() {
        let name = "Army of the Dead"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 480
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 4
        this.petData = {
            name:"Army of the Dead",
            abilities:{"Claw":new Claw()},
            color:"#563e38",
            size:3,
            do:[{name:"goMelee"},{name:"cast",ability:"Claw"}],
            autoAttackDamage:1
        }
        this.petDuration = 30

        this.timer1 = 0.5
        this.timer2 = 0.5
        let i = 0
    }

    getTooltip() {
            return "Summons a legion of ghouls who swarms your enemies, fighting anything they can for 30 sec."
    }

    getBuffTooltip(caster, target, buff) {
        return "Summoning ghouls."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.i = 0
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

    runBuff(caster, buff, id ) {
        if (this.timer1<this.timer2) {
            this.timer1 += progressInSec
        } else {
            this.timer1 = 0
            spawnPet(caster,"guardian",this.petData.name,caster.x+20,caster.y+20,this,true)
            this.i++
        }
    }

}