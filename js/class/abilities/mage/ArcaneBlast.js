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


    }

    getTooltip() {
        return "Blasts the target with energy, dealing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Arcane damage. Damage increased by 60% per Arcane Charge. Mana cost increased by 100% per Arcane Charge. Generates 1 Arcane Charge"
    }

    startCast(caster) {
        let cost = this.cost * (1 + (caster.secondaryResource))
        if (caster.abilities["Rule of Threes"]) {
            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].name==="Rule of Threes") {
                    cost = 0
                }
            }
        }
        if (this.checkStart(caster,cost)) {
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
                let castTime = this.castTime
                for (let i = 0; i<caster.buffs.length; i++) {
                    if (caster.buffs[i].name==="Presence of Mind") {
                        castTime = 0
                        if (caster.buffs[i].stacks>1) {
                            caster.buffs[i].stacks--
                        } else {
                            caster.buffs[i].duration = -1
                        }
                    }
                }

                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:(castTime/(1+(caster.secondaryResource*0.08)))/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
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
                let spellPower = this.spellPower

                spellPower += spellPower * (0.6*caster.secondaryResource)
                spellPower += spellPower * ((((caster.stats.mastery / 100))/2)*caster.secondaryResource)


                let cost = this.cost * (1 + (caster.secondaryResource))
                for (let i = 0; i<caster.buffs.length; i++) {
                    if (caster.buffs[i].name === "Rule of Threes") {
                        caster.buffs[i].duration = -1
                        cost = 0
                    }
                }

                doDamage(caster,target,this,undefined,spellPower)
                caster.useEnergy(cost,this.secCost)
                this.setCd()
            }
        }
    }
}
