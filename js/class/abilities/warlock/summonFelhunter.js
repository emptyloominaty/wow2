class SummonFelhunter extends Ability {
    constructor() {
        let name = "Summon Felhunter"
        let cost = 0
        let gcd = 1.5
        let castTime = 0 //TODO:6secCast
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.secCost = 1
        this.petData = {
            name:"Felhunter",
            abilities:{"Shadow Bite":new ShadowBite()},
            color:"rgba(110,29,17,0.84)",
            size:6,
            do:[{name:"goMelee"},{name:"cast",ability:"Shadow Bite"}],
            //TODO:Devour Magic, 15s cd, 30yd, 20 energy,  Purges 1 beneficial magic effect from an enemy. If an effect is devoured, the Felhunter will be healed for (80% of Spell power) and gain 60 Fel Energy.
        }
        this.petDuration = 999
        this.petId = false
        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return "Summons a Felhunter under your command, able to disrupt the spell casts of your enemies."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            if (caster.pets[this.petId]!==undefined) {
                if (caster.pets[this.petId] && caster.pets[this.petId].name==="Felhunter") {
                    caster.pets[this.petId] = undefined
                }
            }

            caster.abilities["Command Demon"].pet = "Felhunter"
            this.petId = spawnPet(caster,"guardian",this.petData.name,caster.x+20,caster.y+20,this)

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

//
class ShadowBite extends Ability {
    constructor() {
        let name = "Shadow Bite"
        let cost = 30
        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.3

    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    done = true
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster===player) {
                        document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        doDamage(caster, caster.targetObj, this)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setCd()
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
