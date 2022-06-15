class ArcaneBlast extends Ability {
    constructor() {
        let name = "Arcane Blast"
        let cost = 3 //% mana

        let gcd = 1.5
        let castTime = 2.25
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "arcane"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.457
        this.secCost = -1

        this.effect = ""
        this.effectValue = 0

    }

    getTooltip() {
        return "Blasts the target with energy, dealing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Arcane damage. Damage increased by 60% per Arcane Charge. Mana cost increased by 100% per Arcane Charge. Generates 1 Arcane Charge"
    }

    run(caster) {
    }

    startCast(caster) {
        let cost = this.cost * (1 + (caster.secondaryResource))
        if (this.checkStart(caster,cost)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
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
                caster.casting = {name:this.name, time:0, time2:(this.castTime/(1+(caster.secondaryResource*0.08)))/(1 + (caster.stats.haste / 100))}
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
        if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster)) {
            if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                let spellPower = this.spellPower
                for (let i = 0; i<caster.secondaryResource; i++) {
                    spellPower = spellPower * (1.6)
                }

                let cost = this.cost * (1 + (caster.secondaryResource))

                doDamage(caster,caster.castTarget,this,undefined,spellPower)
                caster.useEnergy(cost,this.secCost)
                this.cd = 0
            }
        }
    }
}
