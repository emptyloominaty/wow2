class SummonWaterElemental extends Ability {
    constructor() {
        let name = "Summon Water Elemental"
        let cost = 3
        let gcd = 1.5
        let castTime = 0
        let cd = 30
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "frost"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.petData = {
            name:"Water Elemental",
            abilities:{"Waterbolt":new Waterbolt()},
            color:"rgba(139,248,255,0.68)",
            size:6,
            do:[{name:"cast",ability:"Waterbolt"}],
        }
        this.petDuration = 999 //TODO:
        this.petId = false
    }

    getTooltip() {
        return "Summons a Water Elemental to follow and fight for you."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            if (caster.pets[this.petId]!==undefined) {
                if (caster.pets[this.petId] && caster.pets[this.petId].name==="Water Elemental") {
                    caster.pets[this.petId] = undefined
                }
            }
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

//----------------------------------------
class Waterbolt extends Ability {
    constructor() {
        let name = "Waterbolt"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 2.5 //TODO:CAST
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "frost"
        let range = 45
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.2925
    }

    getTooltip() {
        return "Deals (29.25% of Spell power) Frost damage to the target."
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
                doDamage(caster, caster.castTarget, this)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
                this.setGcd(caster)
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }

                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}

