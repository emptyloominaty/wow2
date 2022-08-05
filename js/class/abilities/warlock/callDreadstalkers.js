class CallDreadstalkers extends Ability {
    constructor() {
        let name = "Call Dreadstalkers"
        let cost = 0
        let gcd = 1.5
        let castTime = 1.5
        let cd = 20
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "shadow"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.petData = {
            name:"Dreadstalker",
            abilities:{}, //TODO:Dreadbite
            color:"#7c3123",
            size:5,
            do:[{name:"goMelee"}],
            autoAttackDamage:0.9
        }
        this.petDuration = 12
        this.secCost = 2
    }

    getTooltip() {
        return "Summons 2 ferocious Dreadstalkers to attack the target for 12 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        spawnPet(caster,"guardian",this.petData.name,caster.x+Math.random()*20,caster.y+Math.random()*20,this,true)
        spawnPet(caster,"guardian",this.petData.name,caster.x+Math.random()*20,caster.y+Math.random()*20,this,true)
        caster.useEnergy(this.cost,this.secCost)
        this.setCd()
    }

}

