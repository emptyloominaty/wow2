class SummonImp extends Ability {
    constructor() {
        let name = "Summon Imp"
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
            name:"Imp",
            abilities:{"Firebolt":new FireboltImp()},
            color:"rgba(48,152,0,0.84)",
            size:4,
            do:[{name:"cast",ability:"Firebolt"}],
        }
        this.petDuration = 999
        this.petId = false
        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return "Summons an Imp under your command that casts ranged Firebolts."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            if (caster.pets[this.petId]!==undefined) {
                if (caster.pets[this.petId] && caster.pets[this.petId].name==="Imp") {
                    caster.pets[this.petId] = undefined
                }
            }

            caster.abilities["Command Demon"].pet = "Imp"
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
class FireboltImp extends Ability {
    constructor() {
        let name = "Firebolt"
        let cost = 20
        let gcd = 1.5
        let castTime = 1.75
        let cd =0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "fire"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.4

    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster === player) {
                        document.getElementById("raidFrame" + targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.castTarget = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }
            if (done) {
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:(this.castTime/(1+(caster.secondaryResource*0.08)))/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
            }
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                doDamage(caster,target,this)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }

}
