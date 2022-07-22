class RaiseDead extends Ability {
    constructor(unholy = false) {
        let name = "Raise Dead"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.petData = {
            name:"Ghoul",
            abilities:{"Claw":new Claw()},
            color:"#563e38",
            size:4,
            do:[{name:"goMelee"},{name:"cast",ability:"Claw"}],
            autoAttackDamage:1
        }
        this.petDuration = 60
        this.noGcd = true

        if (unholy) {
            this.cd = 30
            this.maxCd = 30
            this.petDuration = 999 //TODO:
        }
        this.petId = false

    }

    getTooltip() {
        if (player.spec==="unholy") {
            return "Raises a ghoul to fight by your side.  You can have a maximum of one ghoul at a time."
        } else {
            return "Raises a ghoul to fight by your side.  You can have a maximum of one ghoul at a time. Lasts 1 min."
        }

    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            if (caster.pets[this.petId]!==undefined) {
                if (caster.pets[this.petId] && caster.pets[this.petId].name==="Ghoul") {
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
class Claw extends Ability {
    constructor() {
        let name = "Claw"
        let cost = 40
        let gcd = 0
        let castTime = 0
        let cd = 3
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.3
    }

    getTooltip() {
        return "Instantly strike the target and 1 other nearby enemy, causing "+spellPowerToNumber(this.spellPower)+" Physical damage, and reducing enemies' movement speed by 20% for 8 sec."
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
